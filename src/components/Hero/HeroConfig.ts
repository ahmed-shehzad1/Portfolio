// Central Hero configuration and helpers
export const HERO_RADIUS = 6;
export const SCULPTURE_SCALE = 1.0;

export const isMobile = (): boolean =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 900);

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const DPR = (): [number, number] => {
  if (typeof window === 'undefined') return [1, 1];
  return isMobile() ? [1, 1.3] : [1, Math.min(window.devicePixelRatio || 1, 1.8)];
};