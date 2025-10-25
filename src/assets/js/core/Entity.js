// Clase base para entidades del dominio.
// Provee un identificador y contratos mínimos como `validate()` y `toJSON()`.
export class Entity {
    // Constructor que inicializa la entidad con un ID
    constructor(id) {
        if (new.target === Entity) {
            throw new TypeError("No se pueden construir instancias de Entity directamente");
        }
        this.id = id;
    }

    // Método para validar la entidad
    validate() {
        throw new Error("El método 'validate()' debe ser implementado");
    }

    // Aqui solo se incluye el metodo toJSON como ejemplo de otro posible metodo
    toJSON() {
        return {
            id: this.id
        };
    }
}