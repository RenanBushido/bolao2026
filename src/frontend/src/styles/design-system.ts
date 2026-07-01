/**
 * Design System Color Tokens
 * World Cup 2026 Premium Branding Palette
 *
 * Use these constants to ensure consistency across the application.
 * Reference: design.md - Color Palette Decision
 */

export const COLORS = {
  // Primary Colors
  navy: '#1a2f5c',      // Trust, premium feel (primary backgrounds, text)
  gold: '#d4af37',      // Prestige, football tradition (accents, highlights only)

  // Secondary Colors
  green: '#00d084',     // Energy, football pitch authenticity (secondary accents)
  orange: '#f97316',    // Urgency, call-to-action (primary CTA buttons)

  // Neutral Colors
  white: '#ffffff',     // Clean, clarity
  offWhite: '#f8f9fa',  // Light backgrounds
  nearBlack: '#1a1a1a', // Dark text, heavy accents
} as const;

/**
 * Color Usage Guidelines
 */
export const COLOR_USAGE = {
  // Text Colors
  textPrimary: COLORS.nearBlack,      // Headings, body text on light backgrounds
  textSecondary: COLORS.navy,         // Secondary copy, supporting text
  textInverse: COLORS.white,          // Text on dark backgrounds
  textAccent: COLORS.gold,            // Highlighted/emphasized text (use sparingly)

  // Background Colors
  bgPrimary: COLORS.white,            // Main background
  bgSecondary: COLORS.offWhite,       // Secondary sections
  bgDark: COLORS.navy,                // Dark sections
  bgAccent: COLORS.orange,            // CTA sections

  // Button Colors
  buttonPrimary: COLORS.orange,       // Primary CTA buttons
  buttonPrimaryText: COLORS.white,    // Text on primary buttons
  buttonSecondary: COLORS.navy,       // Secondary buttons (outline)
  buttonSecondaryText: COLORS.navy,   // Text on secondary buttons

  // Component Accents
  borderDefault: '#e5e7eb',           // Standard borders
  borderAccent: COLORS.gold,          // Highlight borders
  shadowDefault: 'rgba(0, 0, 0, 0.1)', // Standard shadows

  // Alert/Status (from legacy palette, kept for compatibility)
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

/**
 * Typography Tokens
 */
export const TYPOGRAPHY = {
  // Font Families
  display: 'Space Grotesk, Helvetica Neue, Arial, sans-serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  mono: 'Monaco, Menlo, monospace',

  // Font Sizes (Display)
  displayXL: { size: '56px', lineHeight: '1.2', weight: 700 },
  displayLG: { size: '48px', lineHeight: '1.2', weight: 700 },
  displayMD: { size: '40px', lineHeight: '1.2', weight: 700 },
  displaySM: { size: '32px', lineHeight: '1.2', weight: 700 },

  // Font Sizes (Body)
  bodyLG: { size: '18px', lineHeight: '1.6', weight: 400 },
  bodyBase: { size: '16px', lineHeight: '1.6', weight: 400 },
  bodySM: { size: '14px', lineHeight: '1.5', weight: 400 },
  bodyXS: { size: '12px', lineHeight: '1.5', weight: 400 },
} as const;

/**
 * Spacing Scale
 * Based on 8px grid system
 */
export const SPACING = {
  xs: '8px',    // 1 unit
  sm: '12px',   // 1.5 units
  base: '16px', // 2 units
  md: '24px',   // 3 units
  lg: '32px',   // 4 units
  xl: '48px',   // 6 units
  '2xl': '64px', // 8 units
} as const;

/**
 * Responsive Breakpoints
 * Matches TailwindCSS breakpoints
 */
export const BREAKPOINTS = {
  mobile: '0px',      // < 640px
  tablet: '640px',    // 640px - 1024px
  desktop: '1024px',  // >= 1024px
} as const;

/**
 * Performance Targets
 */
export const PERFORMANCE = {
  lcpTarget: '2.5s',   // Largest Contentful Paint
  fidTarget: '100ms',  // First Input Delay
  assetTargets: {
    svgMaxKB: 20,      // FIFA logo max size
    pngMaxKB: 15,      // Argentina flag max size
  },
} as const;
