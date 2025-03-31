// src/components/Translator.tsx
import React, { useEffect, useState } from 'react';

// Definir tipo para la ventana global con propiedades de Google Translate
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

interface TranslatorProps {
  onChange?: (language: string) => void;
}

const Translator: React.FC<TranslatorProps> = ({ onChange }) => {
  const [initialized, setInitialized] = useState(false);
  
  // Función para inicializar el widget de Google Translate
  useEffect(() => {
    // Evitar inicializar múltiples veces
    if (initialized) return;
    
    // Crear el elemento contenedor si no existe
    if (!document.getElementById('google_translate_element')) {
      const translateElement = document.createElement('div');
      translateElement.id = 'google_translate_element';
      translateElement.style.position = 'absolute';
      translateElement.style.top = '-9999px';
      translateElement.style.left = '-9999px';
      document.body.appendChild(translateElement);
    }
    
    // Definir la función de inicialización global de Google
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'es',
            includedLanguages: 'en,es,pt',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
        setInitialized(true);
        console.log('Google Translate initialized successfully');
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    };
    
    // Cargar el script de Google Translate
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => console.error('Failed to load Google Translate script');
    document.body.appendChild(script);
    
    // Función para monitorear cambios en la URL de traducción
    const checkForTranslation = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const translationParam = urlParams.get('googtrans');
      
      if (translationParam) {
        const lang = translationParam.split('/').pop();
        if (lang && onChange) {
          onChange(lang);
        }
      }
    };
    
    // Verificar la URL cuando cambia
    window.addEventListener('popstate', checkForTranslation);
    
    return () => {
      window.removeEventListener('popstate', checkForTranslation);
    };
  }, [initialized, onChange]);
  
  return null; // Este componente no renderiza nada visible
};

export default Translator;