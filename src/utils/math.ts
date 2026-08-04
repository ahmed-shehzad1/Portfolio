// FILE: src/utils/math.ts

/**
 * Linearly interpolates between two values.
 * 
 * @param start - The starting value.
 * @param end - The ending value.
 * @param amount - The interpolation factor (typically between 0 and 1).
 * @returns The interpolated value.
 */
export const lerp = (start: number, end: number, amount: number): number => {
  return (1 - amount) * start + amount * end;
};

/**
 * Frame-rate independent damping (smooth dampening).
 * Superior to simple lerp inside useFrame or requestAnimationFrame.
 * 
 * @param current - Current value.
 * @param target - Target value.
 * @param lambda - Smoothing factor (higher = faster).
 * @param dt - Delta time since last frame.
 * @returns The dampened value.
 */
export const damp = (current: number, target: number, lambda: number, dt: number): number => {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
};

/**
 * Clamps a value between a minimum and maximum range.
 * 
 * @param value - The value to clamp.
 * @param min - The minimum allowed value.
 * @param max - The maximum allowed value.
 * @returns The clamped value.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Maps a value from one range to another.
 * 
 * @param value - The current value to map.
 * @param inMin - The lower bound of the input range.
 * @param inMax - The upper bound of the input range.
 * @param outMin - The lower bound of the output range.
 * @param outMax - The upper bound of the output range.
 * @returns The mapped value.
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Normalizes a value from a given range to [0, 1].
 * 
 * @param value - The value to normalize.
 * @param min - The minimum of the range.
 * @param max - The maximum of the range.
 * @returns The normalized value between 0 and 1.
 */
export const normalize = (value: number, min: number, max: number): number => {
  return clamp((value - min) / (max - min), 0, 1);
};