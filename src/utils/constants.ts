// FILE: src/utils/constants.ts

/**
 * System-wide mathematical constants.
 */
export const MATH = {
  PI: Math.PI,
  TWO_PI: Math.PI * 2,
  HALF_PI: Math.PI / 2,
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
} as const;

/**
 * Global animation duratons (in seconds) for GSAP and Framer Motion.
 */
export const DURATION = {
  instant: 0.1,
  fast: 0.3,
  base: 0.6,
  slow: 1.2,
  cinematic: 2.5,
} as const;

/**
 * Z-Index architecture for the OS interface.
 * Strict layering ensures WebGL and UI never conflict.
 */
export const Z_INDEX = {
  canvas: 0,
  content: 10,
  navigation: 50,
  modal: 80,
  overlay: 90,
  cursor: 100,
} as const;

/**
 * Screen breakpoints aligning with Tailwind, 
 * useful for JS-driven layout calculations in R3F.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Semantic easing curves mapped to bezier arrays for Framer Motion.
 */
export const CSS_EASING = {
  smooth: [0.16, 1, 0.3, 1],       // Apple-like smooth decel
  snappy: [0.85, 0, 0.15, 1],      // Swift and rigid
  cinematic: [0.4, 0, 0.2, 1],     // Grand reveals
  bounce: [0.34, 1.56, 0.64, 1],   // Playful physical snap
} as const;