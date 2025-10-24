import { Repository } from '../core/Repository.js';
import { AppointmentFactory } from '../models/Appointment.js';

// AppointmentService following Repository pattern and Single Responsibility
export class AppointmentService extends Repository {
    constructor(storage = localStorage) {
        super();
        this.storage = storage;
        this.key = 'appointments';
    }

    async find(id) {
        const appointments = this._getAll();
        const appointment = appointments.find(a => a.id === id);
        return appointment ? AppointmentFactory.createAppointment(appointment) : null;
    }

    async findAll() {
        return this._getAll().map(a => AppointmentFactory.createAppointment(a));
    }

    async findByPatient(patientId) {
        return this._getAll()
            .filter(a => a.patientId === patientId)
            .map(a => AppointmentFactory.createAppointment(a));
    }

    async findByDoctor(doctorId) {
        return this._getAll()
            .filter(a => a.doctorId === doctorId)
            .map(a => AppointmentFactory.createAppointment(a));
    }

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

    _getAll() {
        const stored = this.storage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    }

    _saveAll(appointments) {
        this.storage.setItem(this.key, JSON.stringify(appointments));
    }
}