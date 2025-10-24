/**
 * Interfaz de Repositorio
 * Define el contrato para las operaciones CRUD en el almacenamiento de datos
 * Sigue el Principio de Inversión de Dependencias (DIP) de SOLID
 */
export class Repository {
    /**
     * Constructor de la interfaz Repository
     * @throws {TypeError} Si se intenta instanciar directamente
     */
    constructor() {
        if (new.target === Repository) {
            throw new TypeError("No se pueden construir instancias de Repository directamente");
        }
    }

    /**
     * Busca una entidad por su identificador
     * @param {number|string} id - Identificador de la entidad
     * @returns {Promise<Object>} La entidad encontrada
     * @throws {Error} Si el método no está implementado
     */
    async find(id) {
        throw new Error("El método 'find()' debe ser implementado");
    }

    /**
     * Obtiene todas las entidades
     * @returns {Promise<Array>} Lista de entidades
     * @throws {Error} Si el método no está implementado
     */
    async findAll() {
        throw new Error("El método 'findAll()' debe ser implementado");
    }

    /**
     * Guarda una entidad
     * @param {Object} entity - Entidad a guardar
     * @returns {Promise<Object>} La entidad guardada
     * @throws {Error} Si el método no está implementado
     */
    async save(entity) {
        throw new Error("El método 'save()' debe ser implementado");
    }

    /**
     * Elimina una entidad por su identificador
     * @param {number|string} id - Identificador de la entidad a eliminar
     * @returns {Promise<void>}
     * @throws {Error} Si el método no está implementado
     */
    async delete(id) {
        throw new Error("El método 'delete()' debe ser implementado");
    }
}