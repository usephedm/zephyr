import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    const steps = [1, 2, 3];
    return (
        <div className="flex justify-center items-center space-x-4 mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                        <motion.div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                            animate={currentStep >= step ? "active" : "inactive"}
                            variants={{
                                active: { backgroundColor: 'rgb(var(--secondary))', color: 'rgb(var(--background))' },
                                inactive: { backgroundColor: 'rgb(var(--card))', color: 'rgb(var(--muted))' }
                            }}
                        >
                            {step}
                        </motion.div>
                    </div>
                    {index < steps.length - 1 && (
                        <motion.div className="flex-1 h-1 bg-card"
                            initial={false}
                            animate={{
                                background: currentStep > step ? 'linear-gradient(90deg, rgb(var(--secondary)), rgb(var(--secondary)))' : 'linear-gradient(90deg, rgb(var(--card)), rgb(var(--card)))',
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const Contact: React.FC = () => {
    const t = useTranslations();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        needs: '',
        name: '',
        email: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');
        setTimeout(() => {
            setStatus('Message sent successfully! We will get back to you soon.');
            setStep(4);
        }, 1500);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        nextStep();
    }
    const handlePrev = () => {
        setDirection(-1);
        prevStep();
    }


    return (
        <div className="py-12">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">{t('contactTitle')}</h1>
                <p className="mt-4 text-lg text-muted">{t('contactDesc')}</p>
            </div>

            <div className="mt-16 max-w-xl mx-auto bg-card p-8 rounded-lg border border-border/20">
                {step < 4 && <StepIndicator currentStep={step} />}
                 <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    >
                    {step === 1 && (
                        <form className="space-y-6">
                            <h3 className="font-bold text-lg text-center text-secondary">{t('contactStep1')}</h3>
                             <div>
                                <label htmlFor="companyName" className="sr-only">{t('contactCompanyName')}</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder={t('contactCompanyName')} required className="w-full bg-background border border-border/30 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition" />
                            </div>
                             <div>
                                <label htmlFor="industry" className="sr-only">{t('contactIndustry')}</label>
                                <input type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder={t('contactIndustry')} required className="w-full bg-background border border-border/30 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition" />
                            </div>
                            <div className="text-center">
                                <motion.button type="button" onClick={handleNext} className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3 rounded-full text-lg hover:shadow-xl hover:shadow-secondary/40 transition-shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t('contactNext')}</motion.button>
                            </div>
                        </form>
                    )}
                     {step === 2 && (
                        <form className="space-y-6">
                             <h3 className="font-bold text-lg text-center text-secondary">{t('contactStep2')}</h3>
                            <div>
                                <label htmlFor="needs" className="sr-only">{t('contactNeeds')}</label>
                                <textarea name="needs" rows={5} value={formData.needs} onChange={handleChange} placeholder={t('contactNeeds')} required className="w-full bg-background border border-border/30 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition"></textarea>
                            </div>
                            <div className="flex justify-between">
                                <motion.button type="button" onClick={handlePrev} className="bg-muted/20 text-foreground font-semibold px-6 py-2 rounded-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t('contactPrev')}</motion.button>
                                <motion.button type="button" onClick={handleNext} className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3 rounded-full text-lg hover:shadow-xl hover:shadow-secondary/40 transition-shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t('contactNext')}</motion.button>
                            </div>
                        </form>
                    )}
                     {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="font-bold text-lg text-center text-secondary">{t('contactStep3')}</h3>
                            <div>
                                <label htmlFor="name" className="sr-only">{t('contactName')}</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contactName')} required className="w-full bg-background border border-border/30 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">{t('contactEmail')}</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('contactEmail')} required className="w-full bg-background border border-border/30 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition" />
                            </div>
                            <div className="flex justify-between">
                                <motion.button type="button" onClick={handlePrev} className="bg-muted/20 text-foreground font-semibold px-6 py-2 rounded-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t('contactPrev')}</motion.button>
                                <motion.button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3 rounded-full text-lg hover:shadow-xl hover:shadow-secondary/40 transition-shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t('contactSend')}</motion.button>
                            </div>
                        </form>
                    )}
                     {step === 4 && (
                        <div className="text-center py-8">
                             <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                <svg className="w-16 h-16 mx-auto text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="mt-4 text-lg font-semibold text-foreground">{status}</p>
                             </motion.div>
                        </div>
                    )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Contact;
