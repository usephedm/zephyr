import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';

const DataPipeline: React.FC = () => {
    const t = useTranslations();
    const stages = [
        { name: t('techIngestion'), description: t('techIngestionDesc'), x: 100, y: 200 },
        { name: t('techModeling'), description: t('techModelingDesc'), x: 400, y: 200 },
        { name: t('techOutcomes'), description: t('techOutcomesDesc'), x: 700, y: 200 },
    ];
    const path = "M 100 200 C 250 100, 250 300, 400 200 S 550 100, 700 200";

    return (
        <div className="mt-16 p-8 bg-card rounded-lg border border-border/20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">{t('techPipelineTitle')}</h2>
            <svg viewBox="0 0 800 400" className="w-full h-auto">
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(var(--primary))" />
                        <stop offset="100%" stopColor="rgb(var(--secondary))" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={path}
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Animated particles */}
                {/* FIX: Removed invalid `offsetDistance` prop from `motion.circle` and used the standard SVG `animateMotion` element with a `begin` attribute to achieve the staggered animation. Framer Motion's `motion.circle` does not support the `offsetDistance` property for path animation. */}
                {[...Array(5)].map((_, i) => (
                    <motion.circle
                        key={i}
                        r="5"
                        fill="rgb(var(--secondary))"
                    >
                         <animateMotion dur="4s" repeatCount="indefinite" path={path} begin={`${i * 0.8}s`} />
                    </motion.circle>
                ))}

                {/* Pipeline stages */}
                {stages.map((stage, index) => (
                    <g key={stage.name}>
                        <motion.circle
                            cx={stage.x}
                            cy={stage.y}
                            r="40"
                            fill="rgb(var(--background))"
                            stroke="rgb(var(--secondary))"
                            strokeWidth="3"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.5 }}
                        />
                        <foreignObject x={stage.x - 75} y={stage.y + 50} width="150" height="150">
                             <motion.div 
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.5 + 0.5 }}
                            >
                                <h3 className="font-bold text-secondary">{stage.name}</h3>
                                <p className="text-xs text-muted mt-1">{stage.description}</p>
                             </motion.div>
                        </foreignObject>
                    </g>
                ))}
            </svg>
        </div>
    );
};

const Technology: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="py-12">
            <div className="text-center max-w-3xl mx-auto">
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-extrabold text-foreground sm:text-5xl">
                    {t('techTitle')}
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-lg text-muted">
                    {t('techDesc')}
                </motion.p>
            </div>

            <DataPipeline />
            
        </div>
    );
};

export default Technology;