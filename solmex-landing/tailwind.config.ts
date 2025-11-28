import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand System v2.0 - Primary Spectrum
        solmex: {
          orange: '#FF9C37',      // Primary Brand Orange
          yellow: '#FFD81C',      // Primary Brand Yellow
          base: '#12292E',        // Deep petroleum black-green
          
          // Extended palette
          'orange-alt': '#FF9C37', // Logo gradient start
          amber: '#FFAD5C',       // Mid-gradient
          gold: '#FFC67D',        // Light gradient
          sunrise: '#FFD91C',     // Logo gradient end
          
          // Legacy colors (for backward compatibility)
          gray: '#344044',
          charcoal: '#1B2729',
          slate: '#CED4D4',
        },
        // Industrial Neutrals
        carbon: {
          black: '#0A0A0A',
          DEFAULT: '#0A0A0A',
        },
        graphite: '#1A1A1A',
        steel: {
          gray: '#2C3E44',
          DEFAULT: '#2C3E44',
        },
        iron: '#4A5568',
        concrete: '#8B9197',
        aluminum: '#B0B5BA',
        mist: '#E4E7E9',
        polar: '#F8F9FA',
        // Semantic Colors
        signal: {
          red: '#DC2626',
          'red-light': '#FEE2E2',
        },
        safety: {
          green: '#16A34A',
          'green-light': '#DCFCE7',
        },
        warning: {
          amber: '#F59E0B',
        },
        info: {
          blue: '#3B82F6',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #FF9C37 0%, #FFD81C 100%)',
        'gradient-dark-overlay': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 80%)',
        'gradient-45': 'linear-gradient(45deg, #FF9C37 0%, #FFD81C 100%)',
        'gradient-90': 'linear-gradient(90deg, #FF9C37 0%, #FFD81C 100%)',
        'gradient-radial': 'radial-gradient(circle, #FFD81C 0%, #FF9C37 100%)',
        'pattern-diagonal': 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 156, 55, 0.05) 20px, rgba(255, 156, 55, 0.05) 40px)',
        'pattern-grid': 'linear-gradient(rgba(255, 156, 55, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 156, 55, 0.03) 1px, transparent 1px)',
        'pattern-dots': 'radial-gradient(rgba(255, 156, 55, 0.15) 1.5px, transparent 1.5px)',
      },
      backgroundSize: {
        'pattern-grid': '48px 48px',
        'pattern-dots': '24px 24px',
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Brand System v2.0 Type Scale
        'display': ['72px', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h1': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h2': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'h5': ['20px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'h6': ['18px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0' }],
        'label': ['11px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '500' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        // Brand System v2.0 Animations
        'slide-up': 'slideUp 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'rotate-45': 'rotate45 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionTimingFunction: {
        'brand-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'brand-decelerate': 'cubic-bezier(0.0, 0, 0.2, 1)',
        'brand-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
        'brand-emphasis': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotate45: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(45deg)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
};

export default config;