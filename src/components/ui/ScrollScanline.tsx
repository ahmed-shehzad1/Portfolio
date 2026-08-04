// FILE: src/components/ui/ScrollScanline.tsx
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollScanline() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the progress bar movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-white/5 pointer-events-none">
      {/* Primary Glowing Laser Line */}
      <motion.div
        className="h-full bg-gradient-to-r from-[#00f0ff] via-[#00F58C] to-[#00F58C] origin-left shadow-[0_0_12px_#00F58C,0_0_4px_#00f0ff]"
        style={{ scaleX }}
      />
      {/* Trailing Micro Accent Dot */}
      <motion.div
        className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#00F58C] shadow-[0_0_8px_#00F58C] -translate-y-1/2"
        style={{
          left: `${scaleX.get() * 100}%`,
        }}
      />
    </div>
  );
}