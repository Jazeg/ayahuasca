import React, { useState } from 'react';
import { Menu, X, Facebook, Instagram, Youtube, Globe, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('es');

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TuMarca</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
              <Link to="/sobre-nosotros" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Sobre Nosotros</Link>
              <Link to="/resenas" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Reseñas</Link>
              <Link to="/galeria" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Galería</Link>
              <Link to="/servicios" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Servicios</Link>
              <Link to="/contacto" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Contáctanos</Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="appearance-none bg-transparent border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Reservar Button */}
            <Link
              to="/reservar"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reservar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Inicio</Link>
            <Link to="/sobre-nosotros" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Sobre Nosotros</Link>
            <Link to="/resenas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Reseñas</Link>
            <Link to="/galeria" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Galería</Link>
            <Link to="/servicios" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Servicios</Link>
            <Link to="/contacto" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">Contáctanos</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-indigo-600">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}