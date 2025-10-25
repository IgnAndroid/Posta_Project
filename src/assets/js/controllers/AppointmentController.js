import { Controller } from './Controller.js';
import { AppointmentService } from '../services/AppointmentService.js';
import { AppointmentFactory } from '../models/Appointment.js';

// Controlador para manejar la lógica de citas médicas
// Siguiendo el principio de responsabilidad única
export class AppointmentController extends Controller {
    // Constructor que inicializa el servicio de citas
    constructor() {
        super(new AppointmentService());
    }

    // Validación de datos de la cita
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

    // Creación de una cita
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

    // Obtención de citas de un paciente y un médico
    async getPatientAppointments(patientId) {
        try {
            return await this.service.findByPatient(patientId);
        } catch (error) {
            this.handleError(error);
            return [];
        }
    }

    // Obtención de citas de un médico
    async getDoctorAppointments(doctorId) {
        try {
            return await this.service.findByDoctor(doctorId);
        } catch (error) {
            this.handleError(error);
            return [];
        }
    }

    // Actualización del estado de una cita
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

    // Cancelación de una cita
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