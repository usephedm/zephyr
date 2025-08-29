import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';
import type { PortfolioItem } from '../types';

const portfolioItems: PortfolioItem[] = [
    { 
        title: "Global Logistics Optimization", 
        category: "Predictive Analytics", 
        imageUrl: "https://svgl.app/library/ups.svg", 
        description: "Deployed a predictive logistics model for UPS, reducing vessel turnaround time by 18% and optimizing global supply chain routes.",
        bgImageUrl: "https://images.unsplash.com/photo-1568208447699-2428135a571c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
        title: "E-commerce AI Integration", 
        category: "Machine Learning", 
        imageUrl: "https://svgl.app/library/amazon.svg", 
        description: "Engineered a recommendation system for Amazon's marketplace, increasing user engagement and personalizing the shopping experience.",
        bgImageUrl: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
        title: "Retail Demand Forecasting", 
        category: "Predictive Analytics", 
        imageUrl: "https://svgl.app/library/target.svg", 
        description: "Created a demand forecasting engine for Target, reducing stockouts by 30% and optimizing nationwide inventory management.",
        bgImageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
        title: "FinTech AI Solutions", 
        category: "NLP & Automation", 
        imageUrl: "https://www.vectorlogo.zone/logos/jpmorganchase/jpmorganchase-icon.svg", 
        description: "Developed an NLP-driven sentiment analysis tool for JPMorgan Chase to monitor market trends and automate financial reporting.",
        bgImageUrl: "https://images.unsplash.com/photo-1639755249826-512aa0a79f53?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
];

const PortfolioCard: React.FC<{ item: PortfolioItem & { bgImageUrl: string } }> = ({ item }) => {
    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden rounded-lg shadow-lg bg-card border border-border/20 h-96 transition-all duration-300 hover:border-border/60 hover:shadow-secondary/20 flex flex-col"
        >
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.bgImageUrl})` }}
            />
            <div className="absolute inset-0 bg-background/80 group-hover:bg-background/70 transition-colors duration-300"></div>
            <div className="relative p-8 flex flex-col justify-between h-full z-10">
                <div className="flex-grow flex items-center justify-center">
                    <img
                        src={item.imageUrl}
                        alt={`${item.title} logo`}
                        className="h-20 w-auto object-contain filter grayscale brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:filter-none transition-all duration-300"
                    />
                </div>
                <div className="mt-6 text-center">
                    <span className="text-sm font-semibold text-secondary">{item.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-white/80 mt-2 text-sm">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
};


const Portfolio: React.FC = () => {
    const t = useTranslations();
    return (
        <div className="py-12">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">{t('portfolioTitle')}</h1>
                <p className="mt-4 text-lg text-muted">{t('portfolioDesc')}</p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
                {portfolioItems.map((item) => (
                    <PortfolioCard key={item.title} item={{...item, bgImageUrl: item.bgImageUrl || ''}} />
                ))}
            </div>
        </div>
    );
};

export default Portfolio;