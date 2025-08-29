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
      {/* Hero Section */}
      <section ref={heroRef} className="text-center relative min-h-[80vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
        <motion.div
            className="absolute inset-0 -z-20"
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1634992274296-5a8a7f7b3b3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                y: backgroundY
            }}
        />
        <div className="absolute inset-0 -z-10 bg-background/70"></div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted">{t('heroTitle')}</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondary to-accent">{t('heroSubtitle')}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-muted"
        >
          {t('heroDescription')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
            <Link to="/contact">
                <motion.button 
                    className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-4 rounded-full text-lg hover:shadow-xl hover:shadow-secondary/40 transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t('heroButton')}
                </motion.button>
            </Link>
        </motion.div>
      </section>

      {/* Client Logos */}
      <section className="py-12">
        <h2 className="text-center text-sm font-semibold text-muted uppercase tracking-wider">
          Powering Transformation for Global Industry Leaders
        </h2>
        <div className="mt-8">
            <ClientMarquee />
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