import { z } from 'zod';

// Environment schema for validation
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_URL: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

// Application configuration
export const appConfig = {
  app: {
    name: 'SawaLiQ AI',
    version: '1.0.0',
    description: 'AI-ready cinematic platform by Yousof Ahmed Al-Malkawi',
  },
  api: {
    baseUrl: process.env['API_URL'] ?? 'http://localhost:3000',
    timeout: 10000,
  },
  features: {
    enableTelemetry: true,
    enableAuth: false, // Placeholder for future
    enableAI: true,
  },
  ui: {
    theme: 'dark',
    animations: {
      duration: 300,
      easing: 'ease-in-out',
    },
  },
} as const;

export type AppConfig = typeof appConfig;

// Validate environment variables
export function validateEnv(env: Record<string, string | undefined>): Env {
  try {
    return envSchema.parse(env);
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Invalid environment configuration');
  }
}