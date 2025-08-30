// Design tokens following the SawaLiQ brand
export const tokens = {
  colors: {
    // Primary brand colors (CSS variables for runtime theming)
    background: 'rgb(10, 16, 26)', // #0A101A - Deep ocean
    foreground: 'rgb(248, 255, 254)', // #F8FFFE - Breeze white
    primary: 'rgb(0, 123, 154)', // #007B9A - Aqaba azure
    secondary: 'rgb(64, 224, 208)', // #40E0D0 - SawaLiQ teal
    accent: 'rgb(255, 127, 127)', // #FF7F7F - Coral accent
    muted: 'rgb(192, 192, 192)', // #C0C0C0 - Wind silver
    card: 'rgb(23, 31, 45)', // Slightly lighter dark for cards
    border: 'rgb(64, 224, 208)', // SawaLiQ teal for borders
    
    // Semantic colors
    success: 'rgb(34, 197, 94)',
    warning: 'rgb(251, 191, 36)',
    error: 'rgb(239, 68, 68)',
    info: 'rgb(59, 130, 246)',
    
    // Glass effect overlays
    glass: {
      light: 'rgba(248, 255, 254, 0.1)',
      medium: 'rgba(248, 255, 254, 0.15)',
      dark: 'rgba(10, 16, 26, 0.8)',
    },
  },
  
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Monaco', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(64, 224, 208, 0.3)',
    glowStrong: '0 0 40px rgba(64, 224, 208, 0.5)',
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

export type Tokens = typeof tokens;