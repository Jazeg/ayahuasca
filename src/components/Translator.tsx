import React, { useEffect } from 'react';
import { getCurrentLanguage } from '../services/translationService';

interface TranslatorProps {
  onChange?: (language: string) => void;
}

const Translator: React.FC<TranslatorProps> = ({ onChange }) => {
  useEffect(() => {
    // El componente solo verificará periódicamente el idioma actual
    // y notificará si cambia. La inicialización se hace en index.html
    
    // Verificar el idioma actual al cargar
    const currentLang = getCurrentLanguage();
    if (onChange) {
      onChange(currentLang);
    }
    
    // Verificar periódicamente si el idioma cambia manualmente en el selector
    const interval = setInterval(() => {
      const newLang = getCurrentLanguage();
      if (newLang !== currentLang && onChange) {
        onChange(newLang);
      }
    }, 2000); // Verificar cada 2 segundos
    
    return () => clearInterval(interval);
  }, [onChange]);
  
  // No renderizar nada visible
  return null;
};

export default Translator;