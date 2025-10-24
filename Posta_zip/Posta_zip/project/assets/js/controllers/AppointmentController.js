import { Controller } from './Controller.js';
import { AppointmentService } from '../services/AppointmentService.js';
import { AppointmentFactory } from '../models/Appointment.js';

// Appointment Controller following Single Responsibility
export class AppointmentController extends Controller {
    constructor() {
        super(new AppointmentService());
    }

    validateForm(formData) {
        if (!formData.patientId) {
            throw new Error('Paciente es requerido');
        }
        if (!formData.doctorId) {
            throw new Error('Doctor es requerido');
        }
        if (!formData.date) {
            throw new Error('Fecha es requerida');
        }
        return true;
    }

    async createAppointment(formData) {
        try {
            this.validateForm(formData);
            const appointment = AppointmentFactory.createAppointment({
                patientId: formData.patientId,
                doctorId: formData.doctorId,
                date: new Date(formData.date),
                status: 'pending'
            });

            await this.service.save(appointment);
            return appointment;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getPatientAppointments(patientId) {
        try {
            return await this.service.findByPatient(patientId);
        } catch (error) {
            this.handleError(error);
            return [];
        }
    }

    async getDoctorAppointments(doctorId) {
        try {
            return await this.service.findByDoctor(doctorId);
        } catch (error) {
            this.handleError(error);
            return [];
        }
    }

    async updateStatus(appointmentId, newStatus) {
        try {
            const appointment = await this.service.find(appointmentId);
            if (!appointment) {
                throw new Error('Cita no encontrada');
            }

            appointment.status = newStatus;
            await this.service.save(appointment);
            return appointment;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async cancelAppointment(appointmentId) {
        try {
            const appointment = await this.service.find(appointmentId);
            if (!appointment) {
                throw new Error('Cita no encontrada');
            }

            if (!appointment.canCancel()) {
                throw new Error('Esta cita no puede ser cancelada');
            }

            appointment.status = 'cancelled';
            await this.service.save(appointment);
            return appointment;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }
}