// FILE: src/hooks/useLenisGsap.ts

import { useEffect, useRef, useCallback } from 'react';
import Lenis, { type LenisOptions } from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Safely register ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseLenisGsapResult {
  lenis: Lenis | null;
  /**
   * Scroll progress (0 to 1). Exposed as a mutable ref to prevent
   * costly React re-renders on every animation frame.
   */
  progress: React.MutableRefObject<number>;
  pause: () => void;
  resume: () => void;
}

/**
 * Initializes Lenis smooth scrolling, synchronizes it with GSAP's centralized ticker,
 * and updates ScrollTrigger on scroll.
 */
export function useLenisGsap(options?: Partial<LenisOptions>): UseLenisGsapResult {
  const lenisRef = useRef<Lenis | null>(null);
  const progressRef = useRef<number>(0);

  useEffect(() => {
    // Initialize Lenis with correct v1.3.25 properties
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      ...options,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger and update progress ref
    lenis.on('scroll', (e: Lenis) => {
      ScrollTrigger.update();
      progressRef.current = e.progress;
    });

    // Delegate Lenis's raf loop to GSAP's centralized ticker for optimized 60fps rendering
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    
    // Prevent GSAP's lag smoothing from causing jumps during aggressive scrolling
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  const pause = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const resume = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return { 
    lenis: lenisRef.current, 
    progress: progressRef, 
    pause, 
    resume 
  };
}