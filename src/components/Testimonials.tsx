import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Cliente Frecuente",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1470&q=80",
    content: "Increíble servicio y atención al cliente. Definitivamente volveré a confiar en ellos.",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Cliente Verificado",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1470&q=80",
    content: "La mejor experiencia que he tenido. El equipo es profesional y muy atento.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Cliente Premium",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1470&q=80",
    content: "Superó todas mis expectativas. Recomiendo totalmente sus servicios.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Testimonios de clientes satisfechos que confían en nosotros
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-8 transform transition duration-500 hover:scale-105"
            >
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}