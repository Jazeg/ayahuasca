// src/pages/ServicesPage.tsx
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

// Datos simulados para servicios
const services = [
  {
    id: 1,
    title: 'Consultoría Estratégica',
    description: 'Asesoramiento especializado para optimizar tus procesos de negocio y alcanzar tus objetivos.',
    features: [
      'Análisis de mercado',
      'Planificación estratégica',
      'Optimización de procesos',
      'Gestión del cambio',
      'Implementación de soluciones'
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    popular: false
  },
  {
    id: 2,
    title: 'Desarrollo Personalizado',
    description: 'Soluciones a medida diseñadas específicamente para satisfacer las necesidades únicas de tu empresa.',
    features: [
      'Análisis de requerimientos',
      'Diseño UX/UI personalizado',
      'Desarrollo a medida',
      'Testing y control de calidad',
      'Soporte continuo',
      'Actualizaciones regulares'
    ],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 3,
    title: 'Gestión de Proyectos',
    description: 'Coordinación integral de proyectos para garantizar la entrega a tiempo y dentro del presupuesto.',
    features: [
      'Planificación detallada',
      'Gestión de recursos',
      'Control de costes',
      'Seguimiento de progreso',
      'Gestión de riesgos',
      'Informes periódicos'
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    popular: false
  },
  {
    id: 4,
    title: 'Mantenimiento y Soporte',
    description: 'Servicio continuo para mantener tus sistemas funcionando de manera óptima.',
    features: [
      'Soporte 24/7',
      'Mantenimiento preventivo',
      'Resolución rápida de problemas',
      'Actualizaciones de seguridad',
      'Copias de seguridad regulares'
    ],
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    popular: false
  }
];

// Datos para planes de precios
const pricingPlans = [
  {
    name: 'Básico',
    price: '99',
    period: 'mes',
    description: 'Ideal para pequeñas empresas y startups',
    features: [
      'Acceso a herramientas básicas',
      'Soporte por email',
      'Actualizaciones mensuales',
      'Hasta 3 usuarios',
      'Almacenamiento 10GB'
    ],
    buttonText: 'Comenzar ahora',
    popular: false
  },
  {
    name: 'Profesional',
    price: '199',
    period: 'mes',
    description: 'Perfecto para empresas en crecimiento',
    features: [
      'Todas las características del plan Básico',
      'Soporte prioritario',
      'Actualizaciones semanales',
      'Hasta 10 usuarios',
      'Almacenamiento 50GB',
      'Funciones avanzadas',
      'API Access'
    ],
    buttonText: 'Comenzar prueba gratis',
    popular: true
  },
  {
    name: 'Empresarial',
    price: '399',
    period: 'mes',
    description: 'Solución completa para grandes empresas',
    features: [
      'Todas las características del plan Profesional',
      'Soporte 24/7',
      'Actualizaciones diarias',
      'Usuarios ilimitados',
      'Almacenamiento 200GB',
      'Personalización completa',
      'Manager dedicado'
    ],
    buttonText: 'Contactar ventas',
    popular: false
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Encabezado de página */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ofrecemos soluciones integrales adaptadas a las necesidades de tu empresa
          </p>
        </div>
      </div>

      {/* Servicios detallados */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8`}
            >
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mt-1 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="#pricing"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Ver planes y precios
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Planes de precios */}
      <div id="pricing" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Planes y Precios
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name} 
                className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-indigo-600 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 bg-indigo-600 text-white text-center py-2 text-sm font-semibold">
                    Más popular
                  </div>
                )}
                <div className={`px-6 py-8 ${plan.popular ? 'pt-12' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 text-center">{plan.name}</h3>
                  <div className="mt-4 flex justify-center">
                    <span className="text-5xl font-extrabold">${plan.price}</span>
                    <span className="text-xl font-medium text-gray-500 self-end mb-1">/{plan.period}</span>
                  </div>
                  <p className="mt-4 text-gray-500 text-center">{plan.description}</p>
                </div>
                <div className="border-t border-gray-200 px-6 py-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-indigo-600 mt-1 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button
                      type="button"
                      className={`w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        plan.popular 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
            ¿Necesitas una solución personalizada?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contáctanos para discutir tus necesidades específicas y cómo podemos ayudarte
          </p>
          <div className="flex justify-center">
            <a
              href="/contacto"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              Hablar con un asesor
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;