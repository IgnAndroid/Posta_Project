/**
 * Utilidades generales del proyecto
 * Contiene validaciones y utilidades de UI usadas por las vistas
 * Exporta dos objetos con funciones nombradas: ValidationUtils y UIUtils
 */

/**
 * Funciones de validación simples y reutilizables
 */
export const ValidationUtils = {
    /**
     * Valida formato básico de correo electrónico
     * @param {string} email
     * @returns {boolean}
     */
    isEmail(email) {
        return typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
    },

    /**
     * Verifica que un valor no sea nulo/indefinido y contenga algún carácter visible
     * @param {*} value
     * @returns {boolean}
     */
    isNotEmpty(value) {
        return value !== null && value !== undefined && String(value).trim().length > 0;
    },

    /**
     * Valida datos de login mínimos (email y password)
     * Lanza Error con mensaje en caso de fallo
     * @param {{email:string,password:string}} data
     * @returns {boolean}
     */
    validateLoginData(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Datos inválidos');
        }
        if (!this.isEmail(data.email)) {
            throw new Error('Correo electrónico inválido');
        }
        if (!this.isNotEmpty(data.password)) {
            throw new Error('Contraseña requerida');
        }
        return true;
    }
};

/**
 * Utilidades para la interfaz de usuario (pequeños helpers DOM)
 */
export const UIUtils = {
    /**
     * Muestra un estado de carga en un botón y lo deshabilita.
     * Devuelve el texto/HTML original del botón para restaurarlo luego.
     * @param {HTMLElement} button
     * @returns {string|null} texto original
     */
    showLoading(button) {
        if (!button) return null;
        const original = button.innerHTML;
        try {
            button.disabled = true;
            // Usamos HTML simple para spinner; el proyecto puede tener clases CSS propias
            button.innerHTML = '<span class="ui-spinner" aria-hidden="true"></span> Cargando...';
        } catch (e) {
            // Si falla DOM manipulation, devolvemos el original
            console.warn('UIUtils.showLoading error:', e);
        }
        return original;
    },

    /**
     * Restaura el texto/HTML original del botón y lo habilita
     * @param {HTMLElement} button
     * @param {string|null} originalText
     */
    hideLoading(button, originalText) {
        if (!button) return;
        try {
            button.disabled = false;
            if (originalText !== undefined && originalText !== null) {
                button.innerHTML = originalText;
            }
        } catch (e) {
            console.warn('UIUtils.hideLoading error:', e);
        }
    }
};

// Export nombrado adicional por compatibilidad si alguna parte importa todo
export default { ValidationUtils, UIUtils };
