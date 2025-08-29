import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, dir } = useContext(LanguageContext)!;
  const t = useTranslations();
  
  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navSolutions'), path: '/solutions' },
    { name: t('navTechnology'), path: '/technology' },
    { name: t('navPortfolio'), path: '/portfolio' },
    { name: t('navAbout'), path: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLinkStyle = {
    color: 'rgb(var(--secondary))',
    textShadow: '0 0 5px rgb(var(--secondary))',
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-background/50 backdrop-blur-lg border-b border-border/20' : 'py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
            <Logo isScrolled={isScrolled} />
            <span className={`text-xl font-bold transition-all duration-300 text-foreground hover:text-secondary`}>
              Zephyr AI
            </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className="text-muted hover:text-secondary transition-colors duration-300 font-medium"
              style={({ isActive }) => (isActive ? activeLinkStyle : {})}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
            <Link to="/contact">
                <motion.button 
                    className="hidden md:block bg-gradient-to-r from-primary to-secondary text-white font-semibold px-5 py-2 rounded-full hover:shadow-lg hover:shadow-secondary/40 transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t('navContact')}
                </motion.button>
            </Link>
             <div className="flex items-center cursor-pointer" onClick={toggleLanguage}>
                <span className={`text-sm font-medium ${language === 'en' ? 'text-secondary' : 'text-muted'}`}>EN</span>
                <div className="w-8 h-4 bg-gray-600 rounded-full mx-2 flex items-center transition-all duration-300" style={{ justifyContent: language === 'en' ? 'flex-start' : 'flex-end' }}>
                    <motion.div layout className="w-3 h-3 bg-white rounded-full m-0.5" />
                </div>
                <span className={`text-sm font-medium ${language === 'ar' ? 'text-secondary' : 'text-muted'}`}>AR</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
