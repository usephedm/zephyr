
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../constants/translations';

export const useTranslations = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  
  const { language } = context;
  
  return (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key];
  };
};
