// src/services/translationService.ts

/**
 * Este servicio proporciona funciones para manejar la traducción con Google Translate
 */

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
   * Método alternativo para cambiar el idioma usando cookies (más confiable en algunos casos)
   * @param langCode Código del idioma (es, en, pt)
   */
  export const changeLanguageWithCookie = (langCode: string): void => {
    // Guardar preferencia
    localStorage.setItem('preferredLanguage', langCode);
    
    // Establecer la cookie de Google Translate
    document.cookie = `googtrans=/es/${langCode}; path=/; domain=${window.location.hostname}`;
    
    // Recargar la página para aplicar la cookie
    window.location.reload();
  };
  
  /**
   * Obtiene el idioma actualmente seleccionado
   * @returns Código del idioma (es, en, pt) o 'es' si no se puede determinar
   */
  export const getCurrentLanguage = (): string => {
    // Verificar el selector de Google Translate
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) return selectElement.value;
    
    // Verificar la cookie
    const match = document.cookie.match(/googtrans=\/[^\/]+\/([^;]+)/);
    if (match && match[1]) return match[1];
    
    // Verificar localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) return savedLang;
    
    // Por defecto, español
    return 'es';
  };
  
  /**
   * Restaura la página al idioma original (español)
   */
  export const resetToOriginalLanguage = (): void => {
    // Limpiar cookie de Google Translate
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    
    // Actualizar localStorage
    localStorage.setItem('preferredLanguage', 'es');
    
    // Encontrar el iframe de Google Translate
    const iframe = document.getElementsByClassName('goog-te-banner-frame')[0] as HTMLIFrameElement;
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (innerDoc) {
        // Intentar encontrar y hacer clic en el botón de "X" para cerrar la traducción
        const closeButtons = innerDoc.getElementsByTagName('button');
        for (let i = 0; i < closeButtons.length; i++) {
          const closeButton = closeButtons[i];
          if (closeButton.title === 'Close' || closeButton.title === 'Cancel Translation') {
            closeButton.click();
            return;
          }
        }
      }
    }
    
    // Si no se puede encontrar el botón, recargar la página
    window.location.reload();
  };