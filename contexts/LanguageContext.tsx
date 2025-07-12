'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import frTranslations from '../translations/fr.json';
import enTranslations from '../translations/en.json';

// Define the available translations
const translations = {
  en: enTranslations,
  fr: frTranslations
};

// Types for our context
type Locale = 'en' | 'fr';
type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  locale: 'fr',
  setLocale: () => {},
  t: () => ''
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to French
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [messages, setMessages] = useState(translations.fr);

  // On mount, check for stored preference
  useEffect(() => {
    const detectLocale = (): Locale => {
      // Check localStorage first
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'fr')) {
        return savedLocale;
      }
      
      // Check cookies
      const cookieLocale = document.cookie
        .split('; ')
        .find(row => row.startsWith('locale='))
        ?.split('=')[1] as Locale;
        
      if (cookieLocale && (cookieLocale === 'en' || cookieLocale === 'fr')) {
        return cookieLocale;
      }
      
      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' || browserLang === 'fr') {
        return browserLang as Locale;
      }
      
      // Default to French
      return 'fr';
    };
    
    const detectedLocale = detectLocale();
    setLocaleState(detectedLocale);
    setMessages(translations[detectedLocale]);
  }, []);

  // Method to set locale and save preference
  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    setLocaleState(newLocale);
    setMessages(translations[newLocale]);
    
    // Save preference to localStorage and cookie
    localStorage.setItem('locale', newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
  };

  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Split the key by dots to navigate through the nested objects
    const keys = key.split('.');
    let value: any = messages;
    
    // Traverse the nested objects
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    if (value === undefined) return key;
    
    // Replace parameters if they exist
    if (params && typeof value === 'string') {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      }, value);
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}