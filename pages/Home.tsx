import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslations } from '../hooks/useTranslations';
import type { Testimonial } from '../types';

const TestimonialCarousel: React.FC = () => {
    const t = useTranslations();
    const testimonials: Testimonial[] = [
        { quote: t('testimonial1Quote'), author: t('testimonial1Author'), company: t('testimonial1Company') },
        { quote: t('testimonial2Quote'), author: t('testimonial2Author'), company: t('testimonial2Company') },
        { quote: t('testimonial3Quote'), author: t('testimonial3Author'), company: t('testimonial3Company') }
    ];
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="relative w-full max-w-2xl mx-auto h-48">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
                >
                    <p className="text-lg italic text-foreground">"{testimonials[currentIndex].quote}"</p>
                    <p className="mt-4 font-semibold text-secondary">{testimonials[currentIndex].author}, <span className="text-muted font-normal">{testimonials[currentIndex].company}</span></p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const ClientMarquee: React.FC = () => {
    const clients = [
        { name: 'Amazon', logo: 'https://svgl.app/library/amazon.svg' },
        { name: 'Apple', logo: 'https://svgl.app/library/apple.svg' },
        { name: 'JPMorgan Chase', logo: 'https://www.vectorlogo.zone/logos/jpmorganchase/jpmorganchase-icon.svg' },
        { name: 'IKEA', logo: 'https://svgl.app/library/ikea.svg' },
        { name: 'UPS', logo: 'https://svgl.app/library/ups.svg' },
        { name: 'Target', logo: 'https://svgl.app/library/target.svg' },
        { name: 'Home Depot', logo: 'https://svgl.app/library/the_home_depot.svg' },
        { name: 'AT&T', logo: 'https://svgl.app/library/att.svg' },
        { name: 'Verizon', logo: 'https://svgl.app/library/verizon.svg' },
        { name: 'Dollar General', logo: 'https://www.vectorlogo.zone/logos/dollargeneral/dollargeneral-icon.svg' },
        { name: 'XPO Logistics', logo: 'https://www.vectorlogo.zone/logos/xpo/xpo-icon.svg' },
        { name: 'Old Navy', logo: 'https://www.vectorlogo.zone/logos/oldnavy/oldnavy-icon.svg' },
        { name: 'GAP', logo: 'https://svgl.app/library/gap.svg' },
        { name: 'Bath & Body Works', logo: 'https://www.vectorlogo.zone/logos/bathandbodyworks/bathandbodyworks-icon.svg' },
        { name: 'Victoria\'s Secret', logo: 'https://www.vectorlogo.zone/logos/victoriassecret/victoriassecret-icon.svg' },
        { name: 'Rite Aid', logo: 'https://www.vectorlogo.zone/logos/riteaid/riteaid-icon.svg' },
    ];
    const duplicatedClients = [...clients, ...clients];

    return (
        <div className="relative w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"></div>
            <div className="flex animate-marquee">
                {duplicatedClients.map((client, index) => (
                    <div key={index} className="flex-shrink-0 mx-12 flex items-center justify-center" style={{ width: '160px' }}>
                        <img 
                            src={client.logo} 
                            alt={`${client.name} logo`}
                            className="h-12 w-auto object-contain filter grayscale brightness-0 invert opacity-60 hover:opacity-100 hover:filter-none transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Home: React.FC = () => {
  const t = useTranslations();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
      target: heroRef,
      offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Enhanced Hero Section with CEO Profile */}
      <section ref={heroRef} className="text-center relative min-h-[95vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
        <motion.div
            className="absolute inset-0 -z-20"
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1634992274296-5a8a7f7b3b3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                y: backgroundY
            }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/70 to-background/90"></div>
        
        {/* CEO Profile Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-4 bg-glass-dark backdrop-blur-xl border border-secondary/30 rounded-full px-6 py-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
              YM
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-secondary">CEO & Founder</div>
              <div className="text-xs text-muted">Yousof Ahmed Al-Malkawi</div>
            </div>
            <a 
              href="https://www.linkedin.com/in/yousof-almalkawi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#005885] transition-colors px-4 py-2 rounded-full text-white text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect
            </a>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted">{t('heroTitle')}</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondary via-accent to-primary">{t('heroSubtitle')}</span>
        </motion.h1>
        
        {/* Enhanced Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <p className="text-xl text-muted leading-relaxed mb-4">
            {t('heroDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-secondary">
            <span className="bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">🚀 AI Innovation Leader</span>
            <span className="bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">🌍 Global Technology Pioneer</span>
            <span className="bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">🇯🇴 Jordan's Tech Visionary</span>
          </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center"
        >
            <Link to="/contact">
                <motion.button 
                    className="bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold px-10 py-5 rounded-full text-lg hover:shadow-2xl hover:shadow-secondary/50 transition-all group relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="relative z-10">{t('heroButton')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
            </Link>
            <motion.a
              href="https://www.linkedin.com/in/yousof-almalkawi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border-2 border-secondary/50 rounded-full text-secondary hover:bg-secondary/10 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </motion.a>
        </motion.div>

        {/* Floating Elements for Visual Enhancement */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-10 w-2 h-2 bg-secondary rounded-full opacity-60"
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-16 w-1 h-1 bg-accent rounded-full opacity-80"
            animate={{ y: [-15, 15, -15], x: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-primary rounded-full opacity-40"
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
      </section>

      {/* Premium Client Logos */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent"></div>
        <div className="relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-lg font-bold text-secondary uppercase tracking-wider mb-4"
          >
            Powering Digital Transformation for Global Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-muted mb-12 max-w-2xl mx-auto"
          >
            Trusted by Fortune 500 companies and innovative startups worldwide under the visionary leadership of CEO Yousof Ahmed Al-Malkawi
          </motion.p>
          <div className="mt-8">
              <ClientMarquee />
          </div>
        </div>
      </section>

      {/* Testimonials */}
       <section className="py-12">
         <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">What Our Partners Say</h2>
        </div>
         <TestimonialCarousel />
      </section>
    </div>
  );
};

export default Home;