// src/layouts/MainLayout.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
      
      {/* Añadir estilos personalizados para ocultar elementos de Google Translate */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Ocultar la barra superior de Google Translate */
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .skiptranslate {
          display: none !important;
        }
        `
      }} />
    </div>
  );
};

export default MainLayout;