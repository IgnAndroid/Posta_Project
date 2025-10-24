/**
 * Clase base Entity
 * Define la estructura básica para todas las entidades del dominio
 * Sigue el Principio de Segregación de Interfaces (ISP) de SOLID
 */
export class Entity {
    /**
     * Constructor de la clase Entity
     * @param {number|string} id - Identificador único de la entidad
     * @throws {TypeError} Si se intenta instanciar directamente
     */
    constructor(id) {
        if (new.target === Entity) {
            throw new TypeError("No se pueden construir instancias de Entity directamente");
        }
        this.id = id;
    }

    /**
     * Valida la entidad
     * @returns {boolean} true si la entidad es válida
     * @throws {Error} Si el método no está implementado
     */
    validate() {
        throw new Error("El método 'validate()' debe ser implementado");
    }

    /**
     * Convierte la entidad a formato JSON
     * @returns {Object} Representación JSON de la entidad
     */
    toJSON() {
        return {
            id: this.id
        };
    }
}