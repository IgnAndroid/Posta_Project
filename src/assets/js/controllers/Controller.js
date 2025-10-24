// Base Controller following Template Method pattern
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
        throw new Error("Method 'validateForm()' must be implemented.");
    }
}