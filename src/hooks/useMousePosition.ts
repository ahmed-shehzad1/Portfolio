// src/hooks/useMousePosition.ts
import { useEffect, useRef } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export interface MouseData {
  raw: MousePosition;
  smoothed: MousePosition;
  velocity: MousePosition;
}

export interface UseMousePositionOptions {
  /**
   * The interpolation factor for smoothing (0 to 1).
   * Lower values result in smoother, more delayed movement.
   * @default 0.1
   */
  lerp?: number;
}

/**
 * Tracks mouse position, smoothed position, and velocity using requestAnimationFrame.
 * Returns a React ref to prevent unnecessary re-renders, optimized for 60fps animations.
 */
export const useMousePosition = ({ lerp = 0.1 }: UseMousePositionOptions = {}) => {
  const mouseData = useRef<MouseData>({
    raw: { x: 0, y: 0 },
    smoothed: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  });

  const previousSmoothed = useRef<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseData.current.raw.x = e.clientX;
      mouseData.current.raw.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const update = () => {
      const { raw, smoothed, velocity } = mouseData.current;

      // Calculate smoothed position via linear interpolation
      smoothed.x += (raw.x - smoothed.x) * lerp;
      smoothed.y += (raw.y - smoothed.y) * lerp;

      // Calculate velocity based on change in smoothed position
      velocity.x = smoothed.x - previousSmoothed.current.x;
      velocity.y = smoothed.y - previousSmoothed.current.y;

      // Store current smoothed for next frame's velocity calculation
      previousSmoothed.current.x = smoothed.x;
      previousSmoothed.current.y = smoothed.y;

      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return mouseData;
};