// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, Twitter, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('es');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Efecto para detectar el scroll y cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Verificar scroll inicial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determinar si estamos en la página de inicio
  const isHomePage = location.pathname === '/';

  return (
    <nav 
      className={`w-full z-50 transition-all duration-300 absolute top-0 ${
        scrolled ? 'bg-white py-2 shadow-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Calendar className={`h-6 w-6 ${scrolled ? 'text-indigo-600' : 'text-indigo-500'}`} />
              <span className={`ml-2 text-lg font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                TuMarca
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-1 text-sm font-medium ${
                  scrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
                }`}
              >
                Inicio
              </Link>
              <Link 
                to="/sobre-nosotros" 
                className={`px-3 py-1 text-sm font-medium ${
                  scrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
                }`}
              >
                Sobre Nosotros
              </Link>
              <Link 
                to="/resenas" 
                className={`px-3 py-1 text-sm font-medium ${
                  scrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
                }`}
              >
                Reseñas
              </Link>
              <Link 
                to="/galeria" 
                className={`px-3 py-1 text-sm font-medium ${
                  scrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
                }`}
              >
                Galería
              </Link>
              <Link 
                to="/servicios" 
                className={`px-3 py-1 text-sm font-medium ${
                  scrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
                }`}
              >
                Servicios
              </Link>
              <Link 
                to="/contacto" 
                className={`px-3 py-1 text-sm font-medium ${
                  scrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
                }`}
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a href="#" className={scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className={scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className={scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}>
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className={`appearance-none bg-transparent rounded-full px-3 py-1 text-sm font-medium focus:outline-none ${
                  scrolled 
                    ? 'text-gray-700 border border-gray-300 hover:text-indigo-600' 
                    : 'text-white border border-white/20 hover:bg-white/10'
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-gray-900">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reservar Button */}
            <Link
              to="/reservar"
              className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Reservar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                scrolled 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 mx-4 rounded-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Inicio</Link>
            <Link to="/sobre-nosotros" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Sobre Nosotros</Link>
            <Link to="/resenas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Reseñas</Link>
            <Link to="/galeria" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Galería</Link>
            <Link to="/servicios" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Servicios</Link>
            <Link to="/contacto" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Contáctanos</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-5">
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-indigo-600">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="block w-auto px-3 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/reservar"
                className="block px-3 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white text-center hover:bg-indigo-700"
              >
                Reservar
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}