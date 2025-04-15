// src/services/translationService.ts

/**
 * Este servicio proporciona funciones mejoradas para manejar la traducción con Google Translate
 */

interface GoogleTranslateConfig {
  pageLanguage: string;
  includedLanguages: string;
  layout: any;
  autoDisplay: boolean;
}

// Add type declaration for window object
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

/**
 * Inicializa Google Translate con una configuración personalizada
 */
export const initializeTranslate = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Si ya existe el elemento del script, no lo volvemos a cargar
    if (document.getElementById('google-translate-script')) {
      return resolve(true);
    }

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
        // Configuración para Google Translate
        const config: GoogleTranslateConfig = {
          pageLanguage: 'es',
          includedLanguages: 'en,es,pt',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        };

        new window.google.translate.TranslateElement(
          config,
          'google_translate_element'
        );

        console.log('Google Translate initialized successfully');
        
        // Recuperar preferencia del usuario
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && savedLang !== 'es') {
          setTimeout(() => {
            changeLanguage(savedLang);
          }, 1000);
        }
        
        resolve(true);
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
        resolve(false);
      }
    };

    // Cargar el script de Google Translate
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load Google Translate script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Cambia el idioma de la página usando Google Translate
 * @param langCode Código del idioma (es, en, pt)
 */
export const changeLanguage = (langCode: string): void => {
    // Salir si no existe el selector de Google Translate
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (!selectElement) {
      console.warn('Google Translate no está inicializado aún');
      return;
    }
  
    // Si ya está en el idioma correcto, no hacer nada
    if (selectElement.value === langCode) return;
  
    // Cambiar el valor del selector
    selectElement.value = langCode;
  
    // Disparar los eventos necesarios
    selectElement.dispatchEvent(new Event('change'));
    selectElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    
    // Guardar preferencia
    localStorage.setItem('preferredLanguage', langCode);
    
    console.log(`Idioma cambiado a: ${langCode}`);
  };
  
  /**
   * Cambia el idioma de la página usando Google Translate (método de cookies)
   * @param langCode Código del idioma (es, en, pt)
   */
  export const changeLanguageWithCookie = (langCode: string): void => {
    try {
      // Guardar preferencia en localStorage
      localStorage.setItem('preferredLanguage', langCode);
      
      // Limpiar cookies existentes primero
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Obtener el dominio base
      const domain = window.location.hostname;
      const isLocalhost = domain === 'localhost' || domain === '127.0.0.1';
      
      // Establecer la nueva cookie en el formato correcto
      if (isLocalhost) {
        document.cookie = `googtrans=/es/${langCode}; path=/`;
      } else {
        // Para dominios de producción
        document.cookie = `googtrans=/es/${langCode}; path=/`;
        // Para asegurar compatibilidad con subdominios
        document.cookie = `googtrans=/es/${langCode}; path=/; domain=.${domain}`;
      }
      
      // Recargar la página para aplicar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error al cambiar el idioma:', error);
    }
  };
  
  /**
   * Obtiene el idioma actualmente seleccionado
   * @returns Código del idioma (es, en, pt) o 'es' si no se puede determinar
   */
  export const getCurrentLanguage = (): string => {
    // Verificar la cookie primero
    const match = document.cookie.match(/googtrans=\/[^\/]+\/([^;]+)/);
    if (match && match[1]) return match[1];
    
    // Luego verificar localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) return savedLang;
    
    // Por defecto, español
    return 'es';
  };
  
  /**
   * Restaura la página al idioma original (español)
   */
  export const resetToOriginalLanguage = (): void => {
    localStorage.setItem('preferredLanguage', 'es');
    
    // Limpiar todas las cookies posibles
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    const domain = window.location.hostname;
    if (domain !== 'localhost' && domain !== '127.0.0.1') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
    }
    
    // Recargar la página
    window.location.reload();
  };

  /**
   * Función de diagnóstico para Google Translate
   * Útil para depurar en producción desde la consola
   */
  export const diagnoseTranslate = (): void => {
    console.group('Diagnóstico de Google Translate');
    
    // Comprobar si el script está cargado
    const scriptLoaded = !!document.getElementById('google-translate-script') || 
                        !!document.querySelector('script[src*="translate_a/element.js"]');
    console.log('Script cargado:', scriptLoaded);
    
    // Comprobar si existe el elemento contenedor
    const containerExists = !!document.getElementById('google_translate_element');
    console.log('Contenedor existe:', containerExists);
    
    // Comprobar si el widget está inicializado
    const widgetInitialized = !!document.querySelector('.goog-te-combo');
    console.log('Widget inicializado:', widgetInitialized);
    
    // Comprobar cookies
    console.log('Cookies actuales:', document.cookie);
    
    // Comprobar localStorage
    console.log('Preferencia en localStorage:', localStorage.getItem('preferredLanguage'));
    
    // Comprobar idioma actual
    console.log('Idioma detectado:', getCurrentLanguage());
    
    console.groupEnd();
  };

  // Exponer la función a window para poder llamarla desde la consola
  (window as any).diagnoseTranslate = diagnoseTranslate;