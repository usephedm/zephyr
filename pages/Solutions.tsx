import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';
import type { Service } from '../types';

const aiServiceImages = {
    predictive: "https://images.unsplash.com/photo-1681262109598-edaa3c6567f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    nlp: "https://images.unsplash.com/photo-1698305389025-b4455848528c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    computerVision: "https://images.unsplash.com/photo-1698305388313-05f32b7d0658?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AnimatedNumber = ({ value }: { value: number }) => {
    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, latest => Math.round(latest));

    React.useEffect(() => {
        const controls = animate(motionValue, value, { duration: 1 });
        return controls.stop;
    }, [value]);

    return <motion.span>{rounded}</motion.span>;
};

const RevenueUpliftCalculator: React.FC = () => {
    const t = useTranslations();
    const [revenue, setRevenue] = useState(10_000_000);
    const [uplift, setUplift] = useState(0.15);
    const upliftAmount = revenue * uplift;
    const newRevenue = revenue + upliftAmount;

    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 p-8 bg-card rounded-lg border border-border/20 shadow-lg"
        >
            <h2 className="text-3xl font-bold text-center text-foreground">{t('solutionsDemoTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-8 items-center">
                {/* Controls */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="revenue" className="block text-sm font-medium text-muted">{t('solutionsCurrentRevenue')}</label>
                        <input id="revenue" type="range" min="1000000" max="100000000" step="1000000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondary" />
                        <div className="text-center text-lg font-semibold text-foreground mt-2">{currencyFormatter.format(revenue)}</div>
                    </div>
                     <div>
                        <span className="block text-sm font-medium text-muted text-center">{t('solutionsPotentialUplift')}</span>
                        <div className="flex justify-center gap-2 mt-2">
                            {[0.05, 0.10, 0.15, 0.20].map(val => (
                                <button key={val} onClick={() => setUplift(val)} className={`px-4 py-2 text-sm font-semibold rounded-full transition ${uplift === val ? 'bg-secondary text-background' : 'bg-gray-700 text-foreground'}`}>
                                    {(val * 100).toFixed(0)}%
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="text-center bg-background p-6 rounded-lg">
                    <div className="mb-4">
                        <p className="text-sm text-muted">{t('solutionsUpliftAmount')}</p>
                        <p className="text-3xl font-bold text-secondary">
                            + {currencyFormatter.format(0).slice(0,1)}<AnimatedNumber value={upliftAmount} />
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted">{t('solutionsNewRevenue')}</p>
                        <p className="text-4xl font-extrabold text-foreground">
                            {currencyFormatter.format(0).slice(0,1)}<AnimatedNumber value={newRevenue} />
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Solutions: React.FC = () => {
    const t = useTranslations();

    const services = [
        { image: aiServiceImages.predictive, title: "Predictive Analytics", description: "Leverage historical data to forecast future trends, optimize operations, and make proactive, data-driven decisions." },
        { image: aiServiceImages.nlp, title: "Natural Language Processing (NLP)", description: "Unlock insights from unstructured text data, power intelligent chatbots, and automate content analysis." },
        { image: aiServiceImages.computerVision, title: "Computer Vision", description: "Enable systems to interpret and understand visual information from the world, automating tasks like quality control and security." }
    ];

    return (
        <div className="py-12">
            <div className="text-center max-w-3xl mx-auto">
                <motion.h1 variants={fadeIn} initial="hidden" animate="visible" className="text-4xl font-extrabold text-foreground sm:text-5xl">
                    {t('solutionsTitle')}
                </motion.h1>
                <motion.p variants={fadeIn} initial="hidden" animate="visible" transition={{delay: 0.2}} className="mt-4 text-lg text-muted">
                    {t('solutionsDesc')}
                </motion.p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 * index + 0.4 }}
                        className="group p-8 bg-card rounded-lg border border-border/20 shadow-lg hover:border-border/60 hover:shadow-secondary/20 transition-all duration-300 flex flex-col"
                    >
                        <div className="h-48 rounded-md overflow-hidden mb-6">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                        <p className="mt-2 text-muted flex-grow">{service.description}</p>
                    </motion.div>
                ))}
            </div>
            
            <RevenueUpliftCalculator />
        </div>
    );
};

export default Solutions;