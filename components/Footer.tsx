import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    // A simple SVG icon component
    const SocialIcon = ({ children }: { children: React.ReactNode }) => (
      <a href="#" className="text-muted hover:text-secondary transition-colors duration-300">
        {children}
      </a>
    );

  return (
    <footer className="bg-background border-t border-border/20 text-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-foreground">SawaLiQ AI</h3>
            <p className="mt-2 text-sm">Visionary AI Leadership by Yousof Ahmed Al-Malkawi.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-2 space-y-1">
              <li><Link to="/solutions" className="hover:text-secondary">Solutions</Link></li>
              <li><Link to="/portfolio" className="hover:text-secondary">Portfolio</Link></li>
              <li><Link to="/about" className="hover:text-secondary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Contact</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Aqaba, Jordan</li>
              <li>contact@sawaliq.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
                <SocialIcon>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.02 6.13,17.26 8.1,17.29C6.63,18.45 4.81,19.12 2.83,19.12C2.47,19.12 2.12,19.1 1.77,19.05C3.78,20.36 6.15,21.11 8.71,21.11C16,21.11 20.24,14.71 20.24,9.25C20.24,9.05 20.24,8.85 20.23,8.65C21.03,8.06 21.8,7.34 22.46,6Z"></path></svg>
                </SocialIcon>
                <SocialIcon>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.5,10.43 13,11.1V10.13H10.13V18.5H13V13.57C13,12.37 13.64,11.74 14.5,11.74C15.36,11.74 15.74,12.37 15.74,13.57V18.5H18.5Z"></path></svg>
                </SocialIcon>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          &copy; {new Date().getFullYear()} SawaLiQ AI - CEO Yousof Ahmed Al-Malkawi. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
