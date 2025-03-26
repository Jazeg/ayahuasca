// src/pages/BookingPage.tsx
import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const BookingPage: React.FC = () => {
  // Estado para la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // Estado para la hora seleccionada
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Estado para el paso actual del proceso de reserva
  const [currentStep, setCurrentStep] = useState(1);
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    servicio: 'consultoria'
  });

  // Generar días del mes actual para el calendario
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);
    
    // Día de la semana en que comienza el mes (0 = Domingo, 1 = Lunes, etc.)
    const startingDayOfWeek = firstDay.getDay();
    // Total de días en el mes
    const totalDays = lastDay.getDate();
    
    // Matriz para almacenar información de los días
    const days = [];
    
    // Días del mes anterior para rellenar la primera semana
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        date: new Date(year, month, -startingDayOfWeek + i + 1),
        isCurrentMonth: false,
        isToday: false,
        isSelectable: false
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < new Date(today.setHours(0, 0, 0, 0));
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelectable: !isPast
      });
    }
    
    // Completar la última semana con días del mes siguiente si es necesario
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false,
          isToday: false,
          isSelectable: false
        });
      }
    }
    
    return days;
  };

  // Horas disponibles (simuladas)
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  // Opciones de servicios
  const serviceOptions = [
    { value: 'consultoria', label: 'Consultoría Estratégica' },
    { value: 'desarrollo', label: 'Desarrollo Personalizado' },
    { value: 'gestion', label: 'Gestión de Proyectos' },
    { value: 'soporte', label: 'Mantenimiento y Soporte' }
  ];

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar selección de fecha
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Resetear la hora seleccionada
  };

  // Manejar selección de hora
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Continuar al siguiente paso
  const handleNextStep = () => {
    if (currentStep === 1 && !selectedDate) {
      alert('Por favor, selecciona una fecha para continuar.');
      return;
    }
    
    if (currentStep === 2 && !selectedTime) {
      alert('Por favor, selecciona una hora para continuar.');
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Volver al paso anterior
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar los datos de la reserva
    console.log('Datos de la reserva:', {
      ...formData,
      fecha: selectedDate,
      hora: selectedTime
    });
    
    // Simular envío exitoso
    setCurrentStep(4);
  };

  // Formatear fecha para mostrar
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Reserva una Cita</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Selecciona la fecha y hora que mejor te convenga para una consulta personalizada
        </p>
      </div>

      {/* Indicador de pasos */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          {['Fecha', 'Hora', 'Datos', 'Confirmación'].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep > index + 1 
                  ? 'bg-indigo-600 border-indigo-600' 
                  : currentStep === index + 1 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-gray-300 text-gray-300'
              }`}>
                {currentStep > index + 1 ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-sm ${
                currentStep >= index + 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 hidden sm:block">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className={`flex-1 h-1 ${
                currentStep > index + 1 ? 'bg-indigo-600' : 'bg-gray-200'
              }`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido según el paso actual */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Paso 1: Seleccionar fecha */}
        {currentStep === 1 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Selecciona una fecha</h2>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {/* Días de la semana */}
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                
                {/* Días del mes */}
                {generateCalendarDays().map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day.isSelectable ? handleDateSelect(day.date) : null}
                    className={`py-2 rounded-md text-center ${
                      day.isCurrentMonth ? '' : 'text-gray-400'
                    } ${
                      day.isToday ? 'bg-gray-100 font-bold' : ''
                    } ${
                      selectedDate && day.date.toDateString() === selectedDate.toDateString()
                        ? 'bg-indigo-600 text-white'
                        : day.isSelectable ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!day.isSelectable}
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedDate && (
              <div className="flex items-center text-indigo-600 mb-4">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Fecha seleccionada: {formatDate(selectedDate)}</span>
              </div>
            )}
          </div>
        )}

        {/* Paso 2: Seleccionar hora */}
        {currentStep === 2 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Selecciona una hora</h2>
            
            <div className="flex items-center text-indigo-600 mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Fecha seleccionada: {formatDate(selectedDate)}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`py-3 px-4 rounded-md border ${
                    selectedTime === time
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{time}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {selectedTime && (
              <div className="flex items-center text-indigo-600 mb-4">
                <Clock className="h-5 w-5 mr-2" />
                <span>Hora seleccionada: {selectedTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Paso 3: Completar formulario */}
        {currentStep === 3 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Completa tus datos</h2>
            
            <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center text-indigo-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Fecha: {formatDate(selectedDate)}</span>
              </div>
              <div className="flex items-center text-indigo-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Hora: {selectedTime}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo*
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono*
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="123456789"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-1">
                    Servicio de interés*
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                ></textarea>
              </div>
            </form>
          </div>
        )}

        {/* Paso 4: Confirmación */}
        {currentStep === 4 && (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h2>
            <p className="text-gray-600 mb-8">
              Hemos recibido tu solicitud de reserva. Te hemos enviado un correo electrónico con los detalles de tu cita.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de la Reserva</h3>
              <div className="space-y-2 text-left">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-medium">{formData.nombre}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-medium">{formatDate(selectedDate)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600">Hora:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600">Servicio:</span>
                  <span className="font-medium">
                    {serviceOptions.find(option => option.value === formData.servicio)?.label}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-x-4">
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Volver al inicio
              </a>
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => window.print()}
              >
                Imprimir detalles
              </button>
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        {currentStep < 4 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className={`px-4 py-2 rounded-md font-medium ${
                currentStep > 1
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              disabled={currentStep === 1}
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={currentStep === 3 ? handleSubmit : handleNextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
            >
              {currentStep === 3 ? 'Confirmar Reserva' : 'Siguiente'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;