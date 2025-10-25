import { Entity } from '../core/Entity.js';

// Clase que representa una Cita Médica
// Siguiendo el principio de responsabilidad única
export class Appointment extends Entity {
    // Constructor 
    constructor(id, patientId, doctorId, date, status) {
        super(id);
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = new Date(date);
        this.status = status;
    }

    // Validar los datos de la cita
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

    // Convertir la cita a formato JSON
    toJSON() {
        return {
            ...super.toJSON(),
            patientId: this.patientId,
            doctorId: this.doctorId,
            date: this.date.toISOString(),
            status: this.status
        };
    }

    // Verificar si la cita puede ser cancelada
    canCancel() {
        return ['pendiente', 'confirmada'].includes(this.status) && 
               this.date > new Date();
    }
}

// Fábrica para crear instancias de Cita Médica
// Siguiendo el patron factory 
export class AppointmentFactory {
    // Crea una nueva instancia de Cita Médica
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