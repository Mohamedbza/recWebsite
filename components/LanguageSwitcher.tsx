'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle language change
  const handleLanguageChange = (newLocale: 'fr' | 'en') => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          isOpen
            ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
            : "hover:bg-white/10 hover:text-primary hover:shadow-md"
        }`}
        aria-label={t('language.change')}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">{locale.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 rounded-xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
          <div className="p-2">
            <button
              className={`w-full text-left p-2 rounded-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer ${locale === 'fr' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => handleLanguageChange('fr')}
            >
              {t('language.fr')}
            </button>
            <button
              className={`w-full text-left p-2 rounded-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer ${locale === 'en' ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              {t('language.en')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}