import { Controller } from './Controller.js';
import { AuthService } from '../services/AuthService.js';

// Controlador de autenticación: valida datos de login y maneja la navegación posterior.
// Por defecto crea un `AuthService`, pero podría recibir una instancia inyectada si se refactoriza.
export class AuthController extends Controller {
    // Constructor que inicializa (por defecto) el servicio de autenticación
    constructor() {
        super(new AuthService());
    }

    // Validación de formulario de login
    validateForm(formData) {
        if (!formData.email || !formData.email.includes('@')) {
            throw new Error('Email inválido');
        }
        if (!formData.password || formData.password.length < 6) {
            throw new Error('Contraseña debe tener al menos 6 caracteres');
        }
        if (!formData.role) {
            throw new Error('Debe seleccionar un rol');
        }
        return true;
    }

    // Controlador de inicio de sesión
    async login(formData) {
        try {
            this.validateForm(formData);
            const user = await this.service.login(formData.email, formData.password, formData.role);
            
            // Redirección basada en rol
            switch (user.role) {
                case 'admin':
                    window.location.href = '../admin/admin-dashboard.html';
                    break;
                case 'medico':
                    window.location.href = '../medico/medico-dashboard.html';
                    break;
                default:
                    throw new Error('Rol no soportado');
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    // Controlador de cierre de sesión
    logout() {
        this.service.logout();
        window.location.href = '../public/index.html';
    }

    // Controlador de verificación de autenticación
    checkAuth() {
        const user = this.service.getCurrentUser();
        if (!user) {
            window.location.href = '../auth/login.html';
            return false;
        }
        return true;
    }

    // Controlador de verificación de rol
    checkRole(allowedRoles) {
        const user = this.service.getCurrentUser();
        if (!user || !allowedRoles.includes(user.role)) {
            window.location.href = '../public/index.html';
            return false;
        }
        return true;
    }
}