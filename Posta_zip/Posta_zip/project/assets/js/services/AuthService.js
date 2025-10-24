/**
 * Servicio de Autenticación
 * Maneja la autenticación y gestión de sesiones de usuarios
 * Sigue los principios SOLID de Responsabilidad Única y Abierto/Cerrado
 */
export class AuthService {
    /**
     * Constructor del servicio de autenticación
     * @param {Storage} storage - Almacenamiento para persistir la sesión (por defecto localStorage)
     */
    constructor(storage = localStorage) {
        this.storage = storage;
        this.currentUser = null;
    }

    /**
     * Inicia sesión con las credenciales proporcionadas
     * @param {string} email - Correo electrónico del usuario
     * @param {string} password - Contraseña del usuario
     * @param {string} role - Rol del usuario ('admin' o 'medico')
     * @returns {Promise<Object>} - Datos del usuario autenticado
     * @throws {Error} - Si las credenciales son inválidas
     */
    async login(email, password, role) {
        // Simulación de autenticación
        if (role === 'admin' && email === 'admin@miposta.com' && password === 'admin123') {
            const user = { id: 1, email, role: 'admin', name: 'Administrador' };
            this.storage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
            return user;
        }
        
        if (role === 'medico' && email === 'medico@miposta.com' && password === 'medico123') {
            const user = { id: 2, email, role: 'medico', name: 'Dr. Juan Pérez' };
            this.storage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
            return user;
        }

        throw new Error('Credenciales inválidas');
    }

    /**
     * Cierra la sesión del usuario actual
     */
    logout() {
        this.storage.removeItem('currentUser');
        this.currentUser = null;
    }

    /**
     * Obtiene el usuario actualmente autenticado
     * @returns {Object|null} - Datos del usuario o null si no hay sesión
     */
    getCurrentUser() {
        if (!this.currentUser) {
            const stored = this.storage.getItem('currentUser');
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }
        }
        return this.currentUser;
    }

    /**
     * Verifica si hay un usuario autenticado
     * @returns {boolean} - true si hay un usuario autenticado, false en caso contrario
     */
    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    /**
     * Verifica si el usuario actual tiene un rol específico
     * @param {string} role - Rol a verificar
     * @returns {boolean} - true si el usuario tiene el rol especificado, false en caso contrario
     */
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }
}