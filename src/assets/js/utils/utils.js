// Utilidades generales para la aplicación
// Te enfoca en el manejo de validaciones y pequeñas ayudas para la UI
// Funciones reutilizables para validación de datos

export const ValidationUtils = {
    // Verifica si una cadena es un email válido
    isEmail(email) {
        return typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
    },

    // Verifica si un valor no es nulo, indefinido o vacío
    isNotEmpty(value) {
        return value !== null && value !== undefined && String(value).trim().length > 0;
    },

    // Valida un objeto de datos de login
    validateLoginData(data) {
        if (!data || typeof data !== 'object') { // Verifica si data es un objeto
            throw new Error('Datos inválidos');
        }
        if (!this.isEmail(data.email)) { // Verifica si el email es válido
            throw new Error('Correo electrónico inválido');
        }
        if (!this.isNotEmpty(data.password)) { // Verifica si la contraseña no está vacía
            throw new Error('Contraseña requerida');
        }
        return true;
    }
};

// Utilidades para la interfaz de usuario (UI)
export const UIUtils = {
    // Muestra un indicador de carga en un botón y lo deshabilita
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

    // Restaura el botón a su estado original y lo habilita
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
