const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BaseService = require('./BaseService');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');

/**
 * Servicio de autenticación mejorado con soporte para JWT y base de datos
 */
class AuthService extends BaseService {
  constructor() {
    super('users');
    this.storage = localStorage; // Para mantener la sesión del lado del cliente
  }

  /**
   * Inicia sesión con email y contraseña
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object>} - Token JWT y datos del usuario
   */
  async login(email, password) {
    try {
      // Buscar usuario por email
      const user = await this.db(this.tableName)
        .where('email', email)
        .where('is_active', true)
        .first();

      if (!user) {
        throw new Error('Usuario no encontrado o inactivo');
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
      }

      // Generar token JWT
      const token = this.generateToken(user);
      
      // Actualizar último inicio de sesión
      await this.update(user.id, { last_login: new Date() });
      
      // Guardar en localStorage para persistencia en el cliente
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };
      
      this.storage.setItem('authToken', token);
      this.storage.setItem('user', JSON.stringify(userData));
      
      return {
        token,
        user: userData
      };
      
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout() {
    this.storage.removeItem('authToken');
    this.storage.removeItem('user');
  }

  /**
   * Obtiene el usuario actualmente autenticado
   * @returns {Object|null} - Datos del usuario o null si no hay sesión
   */
  getCurrentUser() {
    const userData = this.storage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Verifica si hay un usuario autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.storage.getItem('authToken');
  }

  /**
   * Verifica si el usuario actual tiene un rol específico
   * @param {string} role - Rol a verificar
   * @returns {boolean}
   */
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }

  /**
   * Verifica si el usuario actual tiene cualquiera de los roles especificados
   * @param {string[]} roles - Roles a verificar
   * @returns {boolean}
   */
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return user && roles.includes(user.role);
  }

  /**
   * Genera un token JWT para el usuario
   * @private
   */
  generateToken(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };
    
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN || '24h'
    });
  }

  /**
   * Verifica un token JWT
   * @param {string} token - Token a verificar
   * @returns {Object} - Payload decodificado
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Error al verificar token:', error);
      return null;
    }
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} - Usuario creado
   */
  async register(userData) {
    try {
      // Verificar si el email ya está en uso
      const existingUser = await this.db(this.tableName)
        .where('email', userData.email)
        .first();
      
      if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
      }

      // Hashear contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Crear usuario
      const [userId] = await this.db(this.tableName).insert({
        name: userData.name,
        email: userData.email,
        password_hash: hashedPassword,
        role: userData.role || 'user',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      });

      return this.findById(userId);
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }
}
