// FILE: src/utils/easing.ts

/**
 * Collection of pure mathematical easing functions.
 * Useful for WebGL shaders, Three.js animations, or custom physics
 * where importing a full animation library is unnecessary.
 * 
 * @param t - Progress ratio usually between 0 and 1.
 */

export const easeLinear = (t: number): number => t;

export const easeInQuad = (t: number): number => t * t;

export const easeOutQuad = (t: number): number => t * (2 - t);

export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const easeInCubic = (t: number): number => t * t * t;

export const easeOutCubic = (t: number): number => --t * t * t + 1;

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const easeInOutExpo = (t: number): number => {
  if (t === 0) return 0;
  if (t === 1) return 1;
  if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
  return 0.5 * (-Math.pow(2, -10 * --t) + 2);
};

export const easeOutSine = (t: number): number => {
  return Math.sin((t * Math.PI) / 2);
};

export const easeInOutSine = (t: number): number => {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};