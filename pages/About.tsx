import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';
import type { TeamMember } from '../types';

const teamMembers: (TeamMember & { artUrl: string })[] = [
    { 
        name: "Yousef Al-Malkawi", 
        role: "Co-Founder & CEO", 
        imageUrl: "",
        artUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
        name: "Khaled Sallam", 
        role: "Co-Founder & COO", 
        imageUrl: "",
        artUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
];

const AbstractArt: React.FC<{ artUrl: string }> = ({ artUrl }) => {
    return (
        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-secondary/50 relative">
            <div 
                className="w-full h-full bg-cover bg-center animate-slow-pan"
                style={{ 
                    backgroundImage: `url(${artUrl})`,
                    animation: 'slow-pan 20s ease-in-out infinite alternate',
                }}
            ></div>
            <style>
                {`
                    @keyframes slow-pan {
                        0% { transform: scale(1) translate(0, 0); }
                        100% { transform: scale(1.2) translate(5%, -5%); }
                    }
                `}
            </style>
        </div>
    );
}

const About: React.FC = () => {
    const t = useTranslations();
    return (
        <div className="py-12 space-y-20">
            <section className="text-center max-w-4xl mx-auto">
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold text-foreground sm:text-5xl">{t('aboutTitle')}</motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 text-lg text-muted">
                    {t('aboutDesc')}
                </motion.p>
            </section>
            
            <section>
                <h2 className="text-3xl font-bold text-center text-foreground sm:text-4xl">Meet the Leadership</h2>
                <div className="mt-12 grid gap-12 md:grid-cols-2 max-w-2xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div 
                            key={member.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="text-center"
                        >
                            <AbstractArt artUrl={member.artUrl} />
                            <h3 className="mt-6 text-xl font-bold text-foreground">{member.name}</h3>
                            <p className="text-secondary">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;