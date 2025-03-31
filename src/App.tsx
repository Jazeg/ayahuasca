// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componente de traducción
import Translator from './components/Translator';

// Layouts
import MainLayout from './layouts/MainLayout';

// Páginas
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import GalleryPage from './pages/GalleryPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      {/* Componente de traducción (invisible) */}
      <Translator />

      <Routes>
        <Route path="/" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
        <Route path="/sobre-nosotros" element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        } />
        <Route path="/resenas" element={
          <MainLayout>
            <ReviewsPage />
          </MainLayout>
        } />
        <Route path="/galeria" element={
          <MainLayout>
            <GalleryPage />
          </MainLayout>
        } />
        <Route path="/servicios" element={
          <MainLayout>
            <ServicesPage />
          </MainLayout>
        } />
        <Route path="/contacto" element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        } />
        <Route path="/reservar" element={
          <MainLayout>
            <BookingPage />
          </MainLayout>
        } />
        {/* Rutas adicionales para el footer */}
        <Route path="/freebies" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Recursos Gratuitos</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/premium" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Herramientas Premium</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/blog" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Blog</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/illustrations" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Ilustraciones</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/bits" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Bits & Snippets</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/affiliate" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Programa de Afiliados</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/knowledge" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Centro de Conocimiento</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/custom" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Desarrollo Personalizado</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/sponsorships" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Patrocinios</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/terms" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/privacy" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        <Route path="/licenses" element={
          <MainLayout>
            <div className="py-16 px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Licencias (EULA)</h1>
              <p>Esta página está en construcción.</p>
            </div>
          </MainLayout>
        } />
        {/* Página 404 */}
        <Route path="*" element={
          <MainLayout>
            <div className="flex flex-col items-center justify-center py-20">
              <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
              <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
              <p className="text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
              <a href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Volver al inicio
              </a>
            </div>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;