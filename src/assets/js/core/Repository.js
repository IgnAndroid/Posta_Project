// Repositorio base que otros repositorios deben extender
// Siguiendo el principio de Inversión de Dependencias (Dependency Inversion Principle)
export class Repository {
    // Constructor
    constructor() {
        if (new.target === Repository) {
            throw new TypeError("No se pueden construir instancias de Repository directamente");
        }
    }

    // Buscar una entidad por su identificador
    async find(id) {
        throw new Error("El método 'find()' debe ser implementado");
    }

    // Buscar todas las entidades
    async findAll() {
        throw new Error("El método 'findAll()' debe ser implementado");
    }

    // Guardar una entidad
    async save(entity) {
        throw new Error("El método 'save()' debe ser implementado");
    }

    // Eliminar una entidad por su identificador
    async delete(id) {
        throw new Error("El método 'delete()' debe ser implementado");
    }
}