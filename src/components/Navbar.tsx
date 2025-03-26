// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
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

  // Definir enlaces de navegación para facilitar el mantenimiento
  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/sobre-nosotros", label: "Sobre Nosotros" },
    { to: "/resenas", label: "Reseñas" },
    { to: "/galeria", label: "Galería" },
    { to: "/servicios", label: "Servicios" },
    { to: "/contacto", label: "Contáctanos" }
  ];

  // Verificar si un enlace está activo
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`w-full z-50 transition-all duration-300 fixed top-0 ${
        scrolled 
          ? 'bg-white py-4 shadow-md' // Aumentado de py-2 a py-4
          : 'bg-white/80 backdrop-blur-md py-5' // Aumentado de py-3 a py-5
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <span className="ml-2 text-base font-bold text-gray-800">
                TuMarca
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`px-2 py-1 text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="flex space-x-2">
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Twitter className="h-4 w-4" />
              </a>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="appearance-none rounded text-xs px-2 py-1 text-gray-700 border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 transition-colors"
            >
              Reservar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mt-1 mx-4 rounded">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`block px-3 py-2 rounded text-sm font-medium ${
                  isActive(link.to)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-5">
              <div className="flex space-x-2">
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="block w-auto px-2 py-1 text-xs border border-gray-200 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                className="block px-3 py-2 rounded text-xs font-medium bg-green-600 text-white text-center hover:bg-green-700"
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