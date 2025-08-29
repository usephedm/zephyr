import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Technology from './pages/Technology';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/solutions" element={<PageWrapper><Solutions /></PageWrapper>} />
              <Route path="/technology" element={<PageWrapper><Technology /></PageWrapper>} />
              <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

interface PageWrapperProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

// FIX: Use 'as const' to provide a more specific type for the transition object, satisfying framer-motion's Transition type.
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export default App;
