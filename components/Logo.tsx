import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LogoProps {
    isScrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <motion.svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            className="transition-all duration-300"
            style={{ width: isScrolled ? 32 : 40, height: isScrolled ? 32 : 40 }}
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgb(var(--secondary))' }} />
                    <stop offset="100%" style={{ stopColor: 'rgb(var(--accent))' }} />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g filter="url(#glow)">
                {/* Circuit paths */}
                <path d="M50 0 V 15" stroke="url(#logoGradient)" strokeWidth="2" />
                <path d="M50 100 V 85" stroke="url(#logoGradient)" strokeWidth="2" />
                <path d="M0 50 H 15" stroke="url(#logoGradient)" strokeWidth="2" />
                <path d="M100 50 H 85" stroke="url(#logoGradient)" strokeWidth="2" />

                <path d="M20 20 L 35 35" stroke="url(#logoGradient)" strokeWidth="2" />
                <path d="M80 80 L 65 65" stroke="url(#logoGradient)" strokeWidth="2" />
                <path d="M20 80 L 35 65" stroke="url(#logoGradient)" strokeWidth="2" />
                <path d="M80 20 L 65 35" stroke="url(#logoGradient)" strokeWidth="2" />
                
                {/* Outer circle */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="rgb(var(--primary))" strokeWidth="3" />
                
                {/* Inner spiral - this will rotate */}
                <motion.g style={{ rotate, transformOrigin: '50% 50%' }}>
                    <path
                        d="M50,50 C 50,38.95 59.04,30.08 70,30 C 70,46.56 53.43,60 35,60 C 44.47,60 50,54.47 50,45 C 50,47.76 47.76,50 45,50"
                        stroke="rgb(var(--secondary))"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                    />
                </motion.g>
            </g>
        </motion.svg>
    );
};

export default Logo;
