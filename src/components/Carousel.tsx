// src/components/Carousel.tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2070&q=80",
    title: "Innovación y Calidad",
    description: "Descubre nuestra excelencia en cada detalle"
  },
  {
    url: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=2070&q=80",
    title: "Experiencia Única",
    description: "Creando momentos inolvidables para ti"
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2070&q=80",
    title: "Compromiso Total",
    description: "Tu satisfacción es nuestra prioridad"
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-screen w-full group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500 relative"
      >
        {/* Overlay con gradiente para mejorar la visibilidad del Navbar transparente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/50"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">{slides[currentIndex].title}</h2>
          <p className="text-xl md:text-2xl">{slides[currentIndex].description}</p>
          <div className="mt-8">
            <a
              href="/contacto"
              className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}