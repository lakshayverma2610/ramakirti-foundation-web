/**
 * FILE: tailwind.config.ts
 * DESCRIPTION: Tailwind CSS configuration with custom color palette,
 *              typography scale, and component utilities for Ramakirti Foundation
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom color palette (trust-centric design)
      colors: {
        'primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#4A1210',
          950: '#651A16', // Navy Blue (Primary)
        },
        'emerald': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
          950: '#C9A84C', // Emerald Green (Action)
        },
        'amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#C9A84C',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#C9A84C', // Warm Amber (Secondary)
        },
        'neutral': {
          50: '#fafbff',  // Off-White (background)
          100: '#f3f4f8',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937', // Charcoal (text)
          900: '#111827',
        },
      },

      // Typography
      fontFamily: {
        'sans': ['var(--font-atkinson)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        'heading': ['var(--font-atkinson)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '28px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['28px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
        '6xl': ['60px', { lineHeight: '72px' }],
      },

      // Spacing (8px base unit)
      spacing: {
        '0': '0px',
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
        '11': '88px',
        '12': '96px',
      },

      // Gap utilities (for flexbox/grid)
      gap: {
        '0': '0px',
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },

      // Border radius
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'base': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        'full': '9999px',
      },

      // Box shadows (layered for depth)
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },

      // Animations
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },

      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },

      // Backdrop blur (for overlays)
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
      },

      // Transition timing
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '500': '500ms',
      },
    },
  },

  plugins: [
    // Custom plugin for responsive text sizing
    function ({ addUtilities }: any) {
      addUtilities({
        '.text-clamp-sm': {
          fontSize: 'clamp(14px, 2vw, 16px)',
        },
        '.text-clamp-md': {
          fontSize: 'clamp(16px, 3vw, 20px)',
        },
        '.text-clamp-lg': {
          fontSize: 'clamp(20px, 4vw, 28px)',
        },
        '.text-clamp-xl': {
          fontSize: 'clamp(28px, 6vw, 48px)',
        },
        // Safe area insets for mobile notches
        '.safe-top': {
          paddingTop: 'max(var(--tw-spacing), env(safe-area-inset-top))',
        },
        '.safe-bottom': {
          paddingBottom: 'max(var(--tw-spacing), env(safe-area-inset-bottom))',
        },
      });
    },

    // Disable default Tailwind prose (if using @tailwindcss/typography)
    // require('@tailwindcss/typography'),
  ],
};

export default config;

