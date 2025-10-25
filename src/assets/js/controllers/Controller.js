// Controlador base que deben extender los controladores específicos.
// Provee manejo básico de errores y declaración de contrato para validación de formularios.
export class Controller {
    constructor(service) {
        if (new.target === Controller) {
            throw new TypeError("Cannot construct Controller instances directly");
        }
        this.service = service;
    }

    async handleError(error) {
        console.error('Error:', error);
        alert(error.message);
    }

    validateForm(formData) {
        // Método a implementar por cada controlador concreto para validar datos de entrada.
        throw new Error("Method 'validateForm()' must be implemented.");
    }
}