/**
 * Servicio de Autenticación
 * Maneja la autenticación y gestión de sesiones de usuarios
 * Sigue los principios SOLID de Responsabilidad Única y Abierto/Cerrado
 */
export class AuthService {
    // Constructor que inicializa el almacenamiento y el usuario actual
    constructor(storage = localStorage) {
        this.storage = storage;
        this.currentUser = null;
    }

    // Inicia sesión con las credenciales proporcionadas
    async login(email, password, role) {
        // Autenticación 
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

    // Cierra la sesión del usuario actual
    logout() {
        this.storage.removeItem('currentUser');
        this.currentUser = null;
    }

    // Obtiene el usuario actualmente autenticado
    getCurrentUser() {
        if (!this.currentUser) {
            const stored = this.storage.getItem('currentUser');
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }
        }
        return this.currentUser;
    }

    // Verifica si hay un usuario autenticado
    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    // Verifica si el usuario tiene un rol específico
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }
}