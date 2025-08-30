'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Simplified cinematic background using CSS gradients and animation
export function ZephyrShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(64, 224, 208, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 127, 127, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 123, 154, 0.4) 0%, transparent 50%),
            linear-gradient(135deg, rgb(10, 16, 26) 0%, rgb(23, 31, 45) 100%)
          `,
        }}
        animate={{
          backgroundPosition: [
            '20% 80%, 80% 20%, 40% 40%',
            '30% 70%, 70% 30%, 60% 60%',
            '20% 80%, 80% 20%, 40% 40%',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-secondary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle wave overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(64, 224, 208, 0.1) 100px,
              rgba(64, 224, 208, 0.1) 102px
            )
          `,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '200px 200px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}