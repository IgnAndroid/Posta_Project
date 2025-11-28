const BaseService = require('./BaseService');
const { DateTime } = require('luxon');

/**
 * Servicio para gestionar las citas médicas
 * Extiende de BaseService para operaciones CRUD básicas
 */
class AppointmentService extends BaseService {
  constructor() {
    super('appointments');
  }

  /**
   * Crea una nueva cita con validaciones
   * @param {Object} appointmentData - Datos de la cita
   * @returns {Promise<Object>} - Cita creada
   */
  async createAppointment(appointmentData) {
    // Validar datos de la cita
    this.validateAppointmentData(appointmentData);
    
    // Verificar disponibilidad del médico
    const isAvailable = await this.checkDoctorAvailability(
      appointmentData.doctor_id || appointmentData.doctorId,
      appointmentData.start_time || appointmentData.startTime,
      appointmentData.end_time || appointmentData.endTime
    );
    
    if (!isAvailable) {
      throw new Error('El médico no está disponible en el horario seleccionado');
    }

    // Crear la cita
    const [appointmentId] = await this.db(this.tableName).insert({
      patient_id: appointmentData.patient_id || appointmentData.patientId,
      doctor_id: appointmentData.doctor_id || appointmentData.doctorId,
      start_time: appointmentData.start_time || appointmentData.startTime,
      end_time: appointmentData.end_time || appointmentData.endTime,
      status: appointmentData.status || 'scheduled',
      notes: appointmentData.notes || '',
      created_at: new Date(),
      updated_at: new Date()
    });

    return this.findById(appointmentId);
  }

  /**
   * Actualiza una cita existente
   * @param {number} id - ID de la cita
   * @param {Object} updateData - Datos a actualizar
   * @returns {Promise<Object>} - Cita actualizada
   */
  async updateAppointment(id, updateData) {
    // Validar datos de la cita
    this.validateAppointmentData(updateData, true);
    
    // Verificar disponibilidad del médico (excluyendo la cita actual)
    if (updateData.doctor_id || updateData.start_time || updateData.end_time) {
      const currentAppointment = await this.findById(id);
      
      const isAvailable = await this.checkDoctorAvailability(
        updateData.doctor_id || currentAppointment.doctor_id,
        updateData.start_time || currentAppointment.start_time,
        updateData.end_time || currentAppointment.end_time,
        id // Excluir la cita actual de la verificación
      );
      
      if (!isAvailable) {
        throw new Error('El médico no está disponible en el horario seleccionado');
      }
    }

    // Actualizar la cita
    await this.update(id, {
      ...updateData,
      updated_at: new Date()
    });

    return this.findById(id);
  }

  /**
   * Valida los datos de una cita
   * @private
   */
  validateAppointmentData(data, isUpdate = false) {
    const requiredFields = ['patient_id', 'doctor_id', 'start_time', 'end_time'];
    const errors = [];

    // Validar campos requeridos para creación
    if (!isUpdate) {
      for (const field of requiredFields) {
        if (!(field in data) && !(field.replace('_', '') in data)) {
          errors.push(`El campo ${field} es requerido`);
        }
      }
    }

    // Validar fechas
    const startTime = data.start_time || data.startTime;
    const endTime = data.end_time || data.endTime;

    if (startTime) {
      const start = new Date(startTime);
      if (isNaN(start.getTime())) {
        errors.push('La fecha de inicio no es válida');
      } else if (start < new Date()) {
        errors.push('La cita no puede ser en una fecha pasada');
      }
    }

    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      if (end <= start) {
        errors.push('La fecha de fin debe ser posterior a la de inicio');
      }
    }

    // Validar estado
    const validStatuses = ['scheduled', 'completed', 'cancelled', 'no_show'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push(`Estado no válido. Los valores permitidos son: ${validStatuses.join(', ')}`);
    }

    if (errors.length > 0) {
      throw new Error(`Error de validación: ${errors.join('; ')}`);
    }
  }

  /**
   * Verifica la disponibilidad de un médico en un rango de fechas
   * @param {number} doctorId - ID del médico
   * @param {string|Date} startTime - Fecha/hora de inicio
   * @param {string|Date} endTime - Fecha/hora de fin
   * @param {number} [excludeAppointmentId] - ID de cita a excluir (para actualizaciones)
   * @returns {Promise<boolean>} - true si está disponible, false en caso contrario
   */
  async checkDoctorAvailability(doctorId, startTime, endTime, excludeAppointmentId = null) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Verificar que las fechas sean válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Fechas de inicio o fin no válidas');
    }

    // Construir consulta para verificar superposición de citas
    const query = this.db(this.tableName)
      .where('doctor_id', doctorId)
      .where('status', '!=', 'cancelled') // Ignorar citas canceladas
      .where(function() {
        this.whereBetween('start_time', [start, end])
          .orWhereBetween('end_time', [start, end])
          .orWhere(function() {
            this.where('start_time', '<=', start)
              .andWhere('end_time', '>=', end);
          });
      });

    // Excluir la cita actual en caso de actualización
    if (excludeAppointmentId) {
      query.whereNot('id', excludeAppointmentId);
    }

    const overlappingAppointments = await query;
    return overlappingAppointments.length === 0;
  }

  /**
   * Obtiene las citas de un médico en un rango de fechas
   * @param {number} doctorId - ID del médico
   * @param {string|Date} startDate - Fecha de inicio
   * @param {string|Date} endDate - Fecha de fin
   * @returns {Promise<Array>} - Lista de citas
   */
  async getDoctorSchedule(doctorId, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return this.db(this.tableName)
      .where('doctor_id', doctorId)
      .where('status', '!=', 'cancelled')
      .whereBetween('start_time', [start, end])
      .orderBy('start_time', 'asc');
  }

  /**
   * Obtiene las citas de un paciente
   * @param {number} patientId - ID del paciente
   * @param {Object} [options] - Opciones de filtrado
   * @param {string} [options.status] - Filtrar por estado
   * @param {string|Date} [options.startDate] - Fecha de inicio
   * @param {string|Date} [options.endDate] - Fecha de fin
   * @returns {Promise<Array>} - Lista de citas del paciente
   */
  async getPatientAppointments(patientId, options = {}) {
    const { status, startDate, endDate } = options;
    
    let query = this.db(this.tableName)
      .where('patient_id', patientId)
      .orderBy('start_time', 'desc');
    
    if (status) {
      query = query.where('status', status);
    }
    
    if (startDate && endDate) {
      query = query.whereBetween('start_time', [new Date(startDate), new Date(endDate)]);
    }
    
    return query;
  }

  /**
   * Cancela una cita
   * @param {number} id - ID de la cita
   * @param {string} [reason] - Razón de la cancelación
   * @returns {Promise<Object>} - Cita actualizada
   */
  async cancelAppointment(id, reason = '') {
    const appointment = await this.findById(id);
    
    if (!appointment) {
      throw new Error('Cita no encontrada');
    }
    
    // Verificar si la cita ya está cancelada
    if (appointment.status === 'cancelled') {
      throw new Error('La cita ya está cancelada');
    }
    
    // Verificar si la cita ya ha pasado
    const now = new Date();
    const appointmentTime = new Date(appointment.start_time || appointment.startTime);
    
    if (appointmentTime < now) {
      throw new Error('No se puede cancelar una cita que ya ha pasado');
    }
    
    // Actualizar el estado de la cita
    return this.update(id, {
      status: 'cancelled',
      cancellation_reason: reason,
      cancelled_at: new Date(),
      updated_at: new Date()
    });
  }

  /**
   * Obtiene las estadísticas de citas
   * @param {Object} [options] - Opciones de filtrado
   * @param {string|Date} [options.startDate] - Fecha de inicio
   * @param {string|Date} [options.endDate] - Fecha de fin
   * @param {number} [options.doctorId] - ID del médico
   * @returns {Promise<Object>} - Estadísticas de citas
   */
  async getAppointmentStats(options = {}) {
    const { startDate, endDate, doctorId } = options;
    
    let query = this.db(this.tableName);
    
    // Aplicar filtros
    if (startDate && endDate) {
      query = query.whereBetween('start_time', [new Date(startDate), new Date(endDate)]);
    }
    
    if (doctorId) {
      query = query.where('doctor_id', doctorId);
    }
    
    // Obtener todas las citas que coincidan con los filtros
    const appointments = await query;
    
    // Calcular estadísticas
    const stats = {
      total: appointments.length,
      byStatus: {},
      byDay: {},
      byDoctor: {},
      averageDuration: 0
    };
    
    // Inicializar contadores
    const statusCount = {};
    const dayCount = {};
    const doctorCount = {};
    let totalDuration = 0;
    
    // Procesar cada cita
    appointments.forEach(appointment => {
      // Contar por estado
      statusCount[appointment.status] = (statusCount[appointment.status] || 0) + 1;
      
      // Contar por día de la semana
      const day = new Date(appointment.start_time).toLocaleDateString('es-ES', { weekday: 'long' });
      dayCount[day] = (dayCount[day] || 0) + 1;
      
      // Contar por médico
      if (appointment.doctor_id) {
        doctorCount[appointment.doctor_id] = (doctorCount[appointment.doctor_id] || 0) + 1;
      }
      
      // Calcular duración
      const start = new Date(appointment.start_time);
      const end = new Date(appointment.end_time);
      if (start && end) {
        totalDuration += (end - start) / (1000 * 60); // Duración en minutos
      }
    });
    
    // Asignar resultados
    stats.byStatus = statusCount;
    stats.byDay = dayCount;
    stats.byDoctor = doctorCount;
    stats.averageDuration = stats.total > 0 ? Math.round(totalDuration / stats.total) : 0;
    
    return stats;
  }
}
