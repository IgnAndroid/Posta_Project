import { AuthController } from '../../assets/js/controllers/AuthController.js';
import { ValidationUtils, UIUtils } from '../../assets/js/utils/utils.js';

// Lógica de la página de login: enlaza el formulario con el controlador de autenticación
// y maneja la interacción básica (autocompletado de credenciales demo y envío).
class LoginPage {
    constructor() {
        this.authController = new AuthController();
        this.form = document.getElementById('loginForm');
        this.setupEventListeners();
    }

    // Manejo de eventos
    setupEventListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = UIUtils.showLoading(submitBtn);
            
            try {
                const formData = {
                    email: this.form.email.value,
                    password: this.form.password.value,
                    role: this.form.role.value
                };

                // La validación y login se maneja en el controller
                await this.authController.login(formData);
            } catch (error) {
                console.error('Error during login:', error);
            } finally {
                UIUtils.hideLoading(submitBtn, originalText);
            }
        });

        // Autocompletado de credenciales basado en el rol seleccionado
        const roleSelect = this.form.role;
        roleSelect.addEventListener('change', this.handleRoleChange.bind(this));
    }

    // Manejo del cambio de rol
    handleRoleChange(event) {
        const role = event.target.value;
        const emailInput = this.form.email;
        const passwordInput = this.form.password;
        
        if (role === 'admin') {
            emailInput.value = 'admin@miposta.com';
            passwordInput.value = 'admin123';
        } else if (role === 'medico') {
            emailInput.value = 'medico@miposta.com';
            passwordInput.value = 'medico123';
        } else {
            emailInput.value = '';
            passwordInput.value = '';
        }
    }
}

// Inicialización de la página de login (cuando el DOM esté listo)
document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});