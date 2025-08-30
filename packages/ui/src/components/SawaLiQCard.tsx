import React from 'react';
import { motion, HTMLMotionProps, Easing } from 'framer-motion';
import { clsx } from 'clsx';

interface SawaLiQCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

export const SawaLiQCard: React.FC<SawaLiQCardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  interactive = false,
  className,
  ...motionProps
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-[rgb(23,31,45)] border border-[rgba(64,224,208,0.2)] rounded-xl',
    glass: [
      'backdrop-blur-md bg-[rgba(248,255,254,0.1)]',
      'border border-[rgba(248,255,254,0.2)]',
      'rounded-xl',
      'shadow-[0_8px_32px_rgba(10,16,26,0.3)]',
    ].join(' '),
    elevated: [
      'bg-[rgb(23,31,45)]',
      'border border-[rgba(64,224,208,0.3)]',
      'rounded-xl',
      'shadow-[0_10px_30px_rgba(0,0,0,0.3)]',
      'shadow-[0_0_20px_rgba(64,224,208,0.1)]',
    ].join(' '),
  };
  
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const interactiveClasses = interactive
    ? [
        'cursor-pointer',
        'hover:border-[rgba(64,224,208,0.4)]',
        'hover:shadow-[0_0_30px_rgba(64,224,208,0.2)]',
        'hover:scale-[1.02]',
        'active:scale-[0.98]',
      ].join(' ')
    : '';

  const defaultMotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as Easing },
    ...(interactive && {
      whileHover: { 
        scale: 1.02,
        transition: { duration: 0.2 } 
      },
      whileTap: { 
        scale: 0.98,
        transition: { duration: 0.1 } 
      },
    }),
  };

  return (
    <motion.div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        interactiveClasses,
        className
      )}
      {...defaultMotionProps}
      {...motionProps}
    >
      {/* Animated border glow effect */}
      {variant === 'glass' && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, rgba(64,224,208,0.3), rgba(255,127,127,0.3), rgba(0,123,154,0.3))',
            backgroundSize: '300% 300%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            opacity: interactive ? [0, 0.1, 0] : 0,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle inner glow for elevated variant */}
      {variant === 'elevated' && (
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(64,224,208,0.1) 0%, transparent 50%)',
          }}
        />
      )}
    </motion.div>
  );
};

// Motion presets for common UI animations
export const motionPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as Easing },
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as Easing },
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as Easing },
  },
} as const;

export type MotionPreset = keyof typeof motionPresets;