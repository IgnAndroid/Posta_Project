import { Entity } from '../core/Entity.js';

/**
 * Modelo de Usuario
 * Representa un usuario del sistema con sus datos básicos y rol
 * Sigue el Principio de Responsabilidad Única (SRP) de SOLID
 */
export class User extends Entity {
    /**
     * Constructor de Usuario
     * @param {string} id - Identificador único del usuario
     * @param {string} gmail - Correo electrónico del usuario
     * @param {string} nombre - Nombre completo del usuario
     * @param {string} role - Rol del usuario ('admin', 'medico', 'paciente')
     */
    constructor(id, gmail, nombre, role){
        super(id);
        this.gmail = gmail;
        this.nombre = nombre;
        this.role = role;
    }

    /**
     * Valida los datos del usuario
     * @returns {boolean} true si los datos son válidos
     * @throws {Error} Si algún campo es inválido
     */
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

    /**
     * Convierte el usuario a formato JSON
     * @returns {Object} Representación JSON del usuario
     */
    toJSON() {
        return {
            ...super.toJSON(),
            gmail: this.gmail,
            nombre: this.nombre,
            role: this.role
        };
    }
}

/**
 * Fábrica de Usuarios
 * Implementa el patrón Factory para la creación de usuarios
 */
export class UserFactory {
    /**
     * Crea una nueva instancia de Usuario
     * @param {Object} data - Datos del usuario
     * @param {string} [data.id] - ID del usuario (opcional)
     * @param {string} data.gmail - Correo electrónico
     * @param {string} data.nombre - Nombre del usuario
     * @param {string} [data.role='paciente'] - Rol del usuario
     * @returns {User} Nueva instancia de Usuario
     */
    static createUser(data) {
        return new User(
            data.id || crypto.randomUUID(),
            data.gmail,
            data.nombre, 
            data.role || 'paciente'
        );
    }
}