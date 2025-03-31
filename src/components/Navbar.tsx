// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, Twitter, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  changeLanguage, 
  changeLanguageWithCookie,
  getCurrentLanguage
} from '../services/translationService';

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('preferredLanguage') || 'es');
  const [scrolled, setScrolled] = useState(false);
  const [translateInitialized, setTranslateInitialized] = useState(false);
  const location = useLocation();
  
  // Verificar si Google Translate está inicializado
  useEffect(() => {
    const checkTranslateInitialized = () => {
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        setTranslateInitialized(true);
        
        // Actualizar el idioma actual en función del selector
        const selected = getCurrentLanguage();
        if (selected !== currentLang) {
          setCurrentLang(selected);
        }
        
        return true;
      }
      return false;
    };
    
    // Si ya está inicializado, salir
    if (translateInitialized || checkTranslateInitialized()) return;
    
    // Verificar periódicamente si el selector de Google Translate existe
    const interval = setInterval(() => {
      if (checkTranslateInitialized()) {
        clearInterval(interval);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [translateInitialized, currentLang]);

  // Manejar cambios de idioma
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = e.target.value;
    setCurrentLang(langCode);
    
    // Intentar cambiar idioma con el método principal
    if (translateInitialized) {
      changeLanguage(langCode);
    } else {
      // Si no está inicializado, usar el método de cookies
      changeLanguageWithCookie(langCode);
    }
  };

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
    <>
      <nav 
        className={`fixed w-full max-w-6xl mx-auto left-0 right-0 z-50 transition-all duration-300 rounded-lg mt-4 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
            : 'bg-white/80 backdrop-blur-md py-4'
        }`}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Calendar className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-lg font-bold text-gray-800">
                  TuMarca
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(link.to)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-5">
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={currentLang}
                  onChange={handleLanguageChange}
                  className="appearance-none rounded-md text-xs px-2 py-1 text-gray-700 border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Reservar
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg mt-1 mx-4 rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.to)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
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
                  onChange={handleLanguageChange}
                  className="block w-auto px-2 py-1 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                  className="block px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white text-center hover:bg-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  Reservar
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Google Translate Element (invisible) */}
      <div id="google_translate_element" style={{ display: 'none', position: 'absolute', left: '-9999px', top: '-9999px' }}></div>
    </>
  );
}