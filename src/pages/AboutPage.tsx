//pages/aboutpage.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Sobre Nosotros</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Conoce más sobre nuestra empresa, valores y misión
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
          <p className="text-gray-600">
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <span className="text-gray-500">Imagen de la empresa</span>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Calidad</h3>
            <p className="text-gray-600">
              Nos comprometemos a ofrecer productos y servicios de la más alta calidad para satisfacer las necesidades de nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovación</h3>
            <p className="text-gray-600">
              Buscamos constantemente nuevas y mejores formas de hacer las cosas, adaptándonos a los cambios y anticipándonos a las tendencias.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Integridad</h3>
            <p className="text-gray-600">
              Actuamos con honestidad, transparencia y ética en todas nuestras relaciones comerciales y personales.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900">Nombre Apellido</h3>
              <p className="text-gray-500">Cargo en la empresa</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;