import { Entity } from '../core/Entity.js';

// Clase que representa un Usuario del dominio.
// Incluye validación y serialización a JSON.
export class User extends Entity {
    // Constructor que inicializa el usuario
    // Nota: la propiedad usada aquí es `gmail` (mantener coherencia con el resto del proyecto)
    constructor(id, gmail, nombre, role){
        super(id);
        this.gmail = gmail;
        this.nombre = nombre;
        this.role = role;
    }

    // Validar los datos del usuario
    validate() {
        if (!this.gmail || !this.gmail.includes('@')) {
            throw new Error('Correo electrónico inválido');
        }
        if (!this.nombre || this.nombre.length < 2) {
            throw new Error('Nombre inválido (mínimo 2 caracteres)');
        }
        if (!['admin', 'medico', 'paciente'].includes(this.role)) {
            throw new Error('Rol inválido (debe ser admin, medico o paciente)');
        }
        return true;
    }

    // Convertir el usuario a formato JSON
    toJSON() {
        return {
            ...super.toJSON(),
            gmail: this.gmail,
            nombre: this.nombre,
            role: this.role
        };
    }
}

// Fábrica para crear instancias de Usuario (Factory pattern)
export class UserFactory {
    // Crea una nueva instancia de Usuario
    static createUser(data) {
        return new User(
            data.id || crypto.randomUUID(),
            data.gmail,
            data.nombre, 
            data.role || 'paciente'
        );
    }
}