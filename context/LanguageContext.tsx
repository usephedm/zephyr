import React, { createContext, useState, useCallback, useMemo } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  }, []);

  // FIX: Explicitly type `dir` to ensure it conforms to the 'ltr' | 'rtl' union type defined in LanguageContextType.
  const dir: 'ltr' | 'rtl' = useMemo(() => (language === 'ar' ? 'rtl' : 'ltr'), [language]);

  const value = useMemo(() => ({ language, toggleLanguage, dir }), [language, toggleLanguage, dir]);
  
  // Set the dir attribute on the html element for global styling
  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    {/* FIX: Corrected typo in the closing tag from Language-Context.Provider to LanguageContext.Provider. */}
    </LanguageContext.Provider>
  );
};
