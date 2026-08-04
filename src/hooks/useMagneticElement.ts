// src/hooks/useMagneticElement.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface UseMagneticElementOptions {
  /** Multiplier for the movement distance. @default 0.5 */
  strength?: number;
  /** 
   * Activation radius in pixels. 
   * If > 0, tracks mouse globally and pulls the element when within radius.
   * If 0, only activates when hovering the element itself.
   * @default 0 
   */
  radius?: number;
  /** GSAP easing string. @default "power3.out" */
  easing?: string;
  /** Animation duration in seconds. @default 0.6 */
  duration?: number;
}

/**
 * Creates a magnetic interaction effect on the referenced element using GSAP.
 */
export const useMagneticElement = <T extends HTMLElement = HTMLDivElement>(
  options: UseMagneticElementOptions = {}
) => {
  const {
    strength = 0.5,
    radius = 0,
    easing = 'power3.out',
    duration = 0.6
  } = options;

  const elementRef = useRef<T>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      
      // Extract current GSAP transforms to calculate the true original center, 
      // preventing jitter when the element runs away from the cursor.
      const xTransform = (gsap.getProperty(element, 'x') as number) || 0;
      const yTransform = (gsap.getProperty(element, 'y') as number) || 0;

      const centerX = rect.left - xTransform + rect.width / 2;
      const centerY = rect.top - yTransform + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (radius > 0) {
        if (distance < radius) {
          isHovered.current = true;
          gsap.to(element, {
            x: distanceX * strength,
            y: distanceY * strength,
            ease: easing,
            duration,
          });
        } else if (isHovered.current) {
          isHovered.current = false;
          gsap.to(element, { x: 0, y: 0, ease: easing, duration });
        }
      } else {
        if (isHovered.current) {
          gsap.to(element, {
            x: distanceX * strength,
            y: distanceY * strength,
            ease: easing,
            duration,
          });
        }
      }
    };

    const onMouseEnter = () => {
      if (radius === 0) isHovered.current = true;
    };

    const onMouseLeave = () => {
      if (radius === 0) {
        isHovered.current = false;
        gsap.to(element, { x: 0, y: 0, ease: easing, duration });
      }
    };

    if (radius > 0) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    } else {
      element.addEventListener('mouseenter', onMouseEnter, { passive: true });
      element.addEventListener('mousemove', onMouseMove, { passive: true });
      element.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }

    return () => {
      if (radius > 0) {
        window.removeEventListener('mousemove', onMouseMove);
      } else {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
      }
      gsap.killTweensOf(element);
    };
  }, [strength, radius, easing, duration]);

  return elementRef;
};