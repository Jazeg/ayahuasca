//components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Empresa
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sobre-nosotros" className="text-base text-gray-600 hover:text-indigo-600">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/freebies" className="text-base text-gray-600 hover:text-indigo-600">
                  Recursos gratuitos
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-base text-gray-600 hover:text-indigo-600">
                  Herramientas premium
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-600 hover:text-indigo-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Recursos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/illustrations" className="text-base text-gray-600 hover:text-indigo-600">
                  Ilustraciones
                </Link>
              </li>
              <li>
                <Link to="/bits" className="text-base text-gray-600 hover:text-indigo-600">
                  Bits & snippets
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="text-base text-gray-600 hover:text-indigo-600">
                  Programa de afiliados
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Ayuda & Soporte
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contacto" className="text-base text-gray-600 hover:text-indigo-600">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="text-base text-gray-600 hover:text-indigo-600">
                  Centro de conocimiento
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-base text-gray-600 hover:text-indigo-600">
                  Desarrollo personalizado
                </Link>
              </li>
              <li>
                <Link to="/sponsorships" className="text-base text-gray-600 hover:text-indigo-600">
                  Patrocinios
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-base text-gray-600 hover:text-indigo-600">
                  Términos & condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-600 hover:text-indigo-600">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/licenses" className="text-base text-gray-600 hover:text-indigo-600">
                  Licencias (EULA)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with logo and copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">TuMarca</span>
          </div>
          <div className="text-sm text-gray-500">
            Todos los derechos reservados. Copyright © {new Date().getFullYear()} TuMarca.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;