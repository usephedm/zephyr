'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ZephyrShaderBackground } from '../components/ZephyrShaderBackground'
import { ZephyrCard } from '@zephyr/ui'
import { UserService } from '@zephyr/core'
import { loggers } from '@zephyr/telemetry'

// Initialize services
const userService = new UserService()

export default function HomePage() {
  const [userCount, setUserCount] = React.useState(0)

  React.useEffect(() => {
    // Demo: Load user data and log performance
    const loadData = async () => {
      try {
        const users = await userService.getAllUsers()
        setUserCount(users.length)
        loggers.app.info({ userCount: users.length }, 'Users loaded successfully')
      } catch (error) {
        loggers.app.error({ error }, 'Failed to load users')
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cinematic shader background */}
      <ZephyrShaderBackground />
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-full px-6 py-3 max-w-fit mx-auto"
          >
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-secondary to-accent"></div>
                <span className="font-bold text-lg gradient-text">Zephyr</span>
              </div>
              <div className="hidden md:flex space-x-6 text-sm">
                <a href="#" className="hover:text-secondary transition-colors">Platform</a>
                <a href="#" className="hover:text-secondary transition-colors">Solutions</a>
                <a href="#" className="hover:text-secondary transition-colors">AI</a>
                <a href="#" className="hover:text-secondary transition-colors">About</a>
              </div>
            </div>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold leading-tight"
            >
              <span className="gradient-text">AI-Ready</span>
              <br />
              <span className="text-foreground">Cinematic Platform</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted max-w-2xl mx-auto"
            >
              Experience the future of AI-powered applications with cutting-edge design,
              performance, and scalability built into every pixel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:glow-secondary transition-all duration-300 transform hover:scale-105">
                Explore Platform
              </button>
              <button className="px-8 py-4 glass rounded-full font-semibold hover:bg-foreground/10 transition-all duration-300">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </main>

        {/* Feature Cards Section */}
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <ZephyrCard variant="glass" interactive className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted text-sm">
                  Built with performance-first architecture using modern frameworks and optimization techniques.
                </p>
              </ZephyrCard>

              <ZephyrCard variant="glass" interactive className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
                <p className="text-muted text-sm">
                  Intelligent features and automation powered by cutting-edge AI models and machine learning.
                </p>
              </ZephyrCard>

              <ZephyrCard variant="glass" interactive className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Crafted with Care</h3>
                <p className="text-muted text-sm">
                  Every component designed with attention to detail, accessibility, and user experience.
                </p>
              </ZephyrCard>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-12 text-center"
            >
              <ZephyrCard variant="elevated" className="inline-block">
                <div className="flex items-center space-x-8">
                  <div>
                    <div className="text-2xl font-bold gradient-text">{userCount}</div>
                    <div className="text-sm text-muted">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">99.9%</div>
                    <div className="text-sm text-muted">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">{'< 100ms'}</div>
                    <div className="text-sm text-muted">Response Time</div>
                  </div>
                </div>
              </ZephyrCard>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}