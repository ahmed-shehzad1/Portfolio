// src/hooks/useLenisGsap.ts
import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Minimal safe typing for standard Lenis options to ensure strictly typed usage
export interface UseLenisGsapOptions {
  wrapper?: Window | HTMLElement;
  content?: HTMLElement;
  eventsTarget?: Window | HTMLElement;
  smoothWheel?: boolean;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  touchInertiaMultiplier?: number;
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';```typescript
// src/hooks/useMousePosition.ts
import { useState, useEffect, useRef } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface MousePositionState {
  raw: Position;
  smoothed: Position;
  velocity: Position;
}

/**
 * Tracks the mouse position, velocity, and a smoothed position.
 * Uses requestAnimationFrame to optimize calculations and minimizes
 * React state updates by only triggering when values actually change.
 */
export function useMousePosition(smoothing: number = 0.1): MousePositionState {
  const [state, setState] = useState<MousePositionState>({
    raw: { x: 0, y: 0 },
    smoothed: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  });

  const target = useRef<Position>({ x: 0, y: 0 });
  const currentSmoothed = useRef<Position>({ x: 0, y: 0 });
  const previousRaw = useRef<Position>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const update = () => {
      const { x: tX, y: tY } = target.current;
      const { x: sX, y: sY } = currentSmoothed.current;
      const { x: pX, y: pY } = previousRaw.current;

      // Calculate new smoothed position (Lerp)
      const newSmoothedX = sX + (tX - sX) * smoothing;
      const newSmoothedY = sY + (tY - sY) * smoothing;

      // Calculate velocity
      const velX = tX - pX;
      const velY = tY - pY;

      const isMoving = Math.abs(velX) > 0.01 || Math.abs(velY) > 0.01;
      const isSmoothing = Math.abs(tX - newSmoothedX) > 0.01 || Math.abs(tY - newSmoothedY) > 0.01;

      if (isMoving || isSmoothing) {
        currentSmoothed.current = { x: newSmoothedX, y: newSmoothedY };
        previousRaw.current = { x: tX, y: tY };

        setState({
          raw: { x: tX, y: tY },
          smoothed: { x: newSmoothedX, y: newSmoothedY },
          velocity: { x: velX, y: velY },
        });
      }

      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [smoothing]);

  return state;
}