import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System: World Cup 2026 Premium Branding
        navy: '#1a2f5c',      // Primary: trust, premium feel
        gold: '#d4af37',      // Accent: prestige, football tradition
        green: '#00d084',     // Secondary: energy, football pitch
        orange: '#f97316',    // Tertiary: urgency, call-to-action
        // Neutrals
        'off-white': '#f8f9fa',
        'near-black': '#1a1a1a',

        // Legacy colors (kept for existing components)
        primary: {
          50: '#f0fef4',
          100: '#dafce8',
          200: '#b7f8d5',
          300: '#7ffbb9',
          400: '#4cef95',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontSize: {
        // Display Typography (Space Grotesk - bold, geometric, energetic)
        'display-xl': ['56px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-md': ['40px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.015em' }],
        'display-sm': ['32px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        // Body Typography (Inter - clean, readable)
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        'body-base': ['16px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.005em' }],
        'body-xs': ['12px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.01em' }],
        // Legacy sizes (kept for compatibility)
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        h4: ['20px', { lineHeight: '1.4', fontWeight: '500' }],
        h5: ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        h6: ['14px', { lineHeight: '1.5', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        xs: ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        0: '0',
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        10: '80px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        // Design System Fonts
        display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Legacy Fonts (for compatibility)
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Monaco', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
