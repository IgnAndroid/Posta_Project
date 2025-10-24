import { Entity } from '../core/Entity.js';

/**
 * Modelo de Cita Médica
 * Representa una cita entre un paciente y un médico
 * Sigue el Principio de Responsabilidad Única (SRP) de SOLID
 */
export class Appointment extends Entity {
    /**
     * Constructor de Cita Médica
     * @param {string} id - Identificador único de la cita
     * @param {string} patientId - ID del paciente
     * @param {string} doctorId - ID del médico
     * @param {string|Date} date - Fecha y hora de la cita
     * @param {string} status - Estado de la cita ('pendiente', 'confirmada', 'cancelada', 'completada')
     */
    constructor(id, patientId, doctorId, date, status) {
        super(id);
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = new Date(date);
        this.status = status;
    }

    /**
     * Valida los datos de la cita
     * @returns {boolean} true si los datos son válidos
     * @throws {Error} Si algún campo es inválido
     */
    validate() {
        if (!this.patientId || !this.doctorId) {
            throw new Error('Se requiere ID del paciente y del médico');
        }
        if (isNaN(this.date.getTime())) {
            throw new Error('Fecha inválida');
        }
        if (!['pendiente', 'confirmada', 'cancelada', 'completada'].includes(this.status)) {
            throw new Error('Estado inválido (debe ser pendiente, confirmada, cancelada o completada)');
        }
        return true;
    }

    /**
     * Convierte la cita a formato JSON
     * @returns {Object} Representación JSON de la cita
     */
    toJSON() {
        return {
            ...super.toJSON(),
            patientId: this.patientId,
            doctorId: this.doctorId,
            date: this.date.toISOString(),
            status: this.status
        };
    }

    /**
     * Verifica si la cita puede ser cancelada
     * @returns {boolean} true si la cita puede ser cancelada
     */
    canCancel() {
        return ['pendiente', 'confirmada'].includes(this.status) && 
               this.date > new Date();
    }
}

/**
 * Fábrica de Citas Médicas
 * Implementa el patrón Factory para la creación de citas
 */
export class AppointmentFactory {
    /**
     * Crea una nueva instancia de Cita Médica
     * @param {Object} data - Datos de la cita
     * @param {string} [data.id] - ID de la cita (opcional)
     * @param {string} data.patientId - ID del paciente
     * @param {string} data.doctorId - ID del médico
     * @param {string|Date} data.date - Fecha y hora de la cita
     * @param {string} [data.status='pendiente'] - Estado de la cita
     * @returns {Appointment} Nueva instancia de Cita Médica
     */
    static createAppointment(data) {
        return new Appointment(
            data.id || crypto.randomUUID(),
            data.patientId,
            data.doctorId,
            data.date,
            data.status || 'pendiente'
        );
    }
}