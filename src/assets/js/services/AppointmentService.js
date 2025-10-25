import { Repository } from '../core/Repository.js';
import { AppointmentFactory } from '../models/Appointment.js';

// Servicio encargado de la persistencia y recuperación de citas médicas.
// Implementa la interfaz CRUD definida por `Repository` y usa un `storage` inyectable.
export class AppointmentService extends Repository {

    // Constructor: storage inyectable (por defecto `localStorage`) y clave para persistencia
    constructor(storage = localStorage) {
        super();
        this.storage = storage;
        this.key = 'appointments';
    }
    
    // Buscar una cita por ID
    async find(id) {
        const appointments = this._getAll();
        const appointment = appointments.find(a => a.id === id);
        return appointment ? AppointmentFactory.createAppointment(appointment) : null;
    }

    // Buscar todas las citas
    async findAll() {
        return this._getAll().map(a => AppointmentFactory.createAppointment(a));
    }

    // Buscar citas por paciente
    async findByPatient(patientId) {
        return this._getAll()
            .filter(a => a.patientId === patientId)
            .map(a => AppointmentFactory.createAppointment(a));
    }

    // Buscar citas por médico
    async findByDoctor(doctorId) {
        return this._getAll()
            .filter(a => a.doctorId === doctorId)
            .map(a => AppointmentFactory.createAppointment(a));
    }

    // Guardar una cita
    async save(appointment) {
        appointment.validate();
        const appointments = this._getAll();
        const index = appointments.findIndex(a => a.id === appointment.id);
        
        if (index >= 0) {
            appointments[index] = appointment.toJSON();
        } else {
            appointments.push(appointment.toJSON());
        }

        this._saveAll(appointments);
        return appointment;
    }

    // Eliminar una cita por ID
    async delete(id) {
        const appointments = this._getAll();
        const index = appointments.findIndex(a => a.id === id);
        if (index >= 0) {
            appointments.splice(index, 1);
            this._saveAll(appointments);
            return true;
        }
        return false;
    }

    // Obtener todas las citas
    _getAll() {
        const stored = this.storage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    }
    // Guardar todas las citas
    _saveAll(appointments) {
        this.storage.setItem(this.key, JSON.stringify(appointments));
    }
}