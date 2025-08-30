import pino from 'pino';

// Logger configuration
const loggerConfig = {
  level: process.env['LOG_LEVEL'] || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
};

// Create base logger instance
export const logger = pino(loggerConfig);

// Specialized loggers for different domains
export const loggers = {
  app: logger.child({ module: 'app' }),
  api: logger.child({ module: 'api' }),
  auth: logger.child({ module: 'auth' }),
  database: logger.child({ module: 'database' }),
  ai: logger.child({ module: 'ai' }),
  performance: logger.child({ module: 'performance' }),
} as const;

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, { start: number; duration?: number }> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(label: string): void {
    this.metrics.set(label, { start: performance.now() });
    loggers.performance.debug({ label }, 'Timer started');
  }

  endTimer(label: string): number | null {
    const metric = this.metrics.get(label);
    if (!metric) {
      loggers.performance.warn({ label }, 'Timer not found');
      return null;
    }

    const duration = performance.now() - metric.start;
    metric.duration = duration;
    
    loggers.performance.info({ label, duration }, 'Timer completed');
    return duration;
  }

  getMetric(label: string): { start: number; duration?: number } | undefined {
    return this.metrics.get(label);
  }

  getAllMetrics(): Record<string, { start: number; duration?: number }> {
    return Object.fromEntries(this.metrics);
  }

  clearMetrics(): void {
    this.metrics.clear();
    loggers.performance.debug('All metrics cleared');
  }
}

// Utility function for measuring function execution time
export function measureAsync<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  const monitor = PerformanceMonitor.getInstance();
  
  monitor.startTimer(label);
  
  return fn()
    .then((result) => {
      monitor.endTimer(label);
      return result;
    })
    .catch((error) => {
      monitor.endTimer(label);
      loggers.performance.error({ label, error }, 'Measured function failed');
      throw error;
    });
}

export function measureSync<T>(
  label: string,
  fn: () => T
): T {
  const monitor = PerformanceMonitor.getInstance();
  
  monitor.startTimer(label);
  
  try {
    const result = fn();
    monitor.endTimer(label);
    return result;
  } catch (error) {
    monitor.endTimer(label);
    loggers.performance.error({ label, error }, 'Measured function failed');
    throw error;
  }
}

// Error reporting utilities
export function reportError(error: Error, context?: Record<string, unknown>): void {
  loggers.app.error({
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context,
  }, 'Application error reported');
}

// Future: OpenTelemetry integration placeholder
export interface TelemetryConfig {
  serviceName: string;
  serviceVersion: string;
  environment: string;
  otelEndpoint?: string;
  enableTracing: boolean;
  enableMetrics: boolean;
}

export class TelemetryService {
  private _config: TelemetryConfig;

  constructor(config: TelemetryConfig) {
    this._config = config;
    logger.info({ config }, 'Telemetry service initialized');
  }

  get config(): TelemetryConfig {
    return this._config;
  }

  // Placeholder for future OTEL integration
  async initialize(): Promise<void> {
    logger.info('Telemetry service ready (OTEL integration pending)');
  }

  async shutdown(): Promise<void> {
    logger.info('Telemetry service shutdown');
  }
}