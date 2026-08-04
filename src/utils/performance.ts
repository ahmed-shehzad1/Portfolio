// FILE: src/utils/performance.ts

/**
 * Defers the execution of a function until after a specified delay.
 * Useful for window resize events or heavy computations.
 */
export const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Ensures a function is only called at most once in a specified time period.
 * Crucial for high-frequency events like scroll or mousemove.
 */
export const throttle = <T extends (...args: Parameters<T>) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Detects if the current device is a touch-based device.
 * Important for adjusting interaction paradigms (disabling custom cursors).
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints is IE specific but good for legacy checks
    navigator.msMaxTouchPoints > 0
  );
};

/**
 * Calculates a safe device pixel ratio for WebGL rendering.
 * Prevents mobile devices with 3x+ DPR from crashing the GPU.
 */
export const getSafeDpr = (maxDpr: number = 2): number => {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio || 1, maxDpr);
};

/**
 * Evaluates hardware concurrency to provide a heuristic for device capability.
 * Fallback is conservative (low power).
 */
export const getHardwareConcurrency = (): number => {
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency;
  }
  return 2; 
};