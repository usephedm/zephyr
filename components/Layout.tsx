
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A101A] font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;
