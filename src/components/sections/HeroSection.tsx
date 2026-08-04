// FILE: src/components/sections/HeroSection.tsx
import { HeroCanvas } from './hero/HeroCanvas';
import { HeroBackground } from './hero/HeroBackground';

export function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#030308]">
      <HeroCanvas />
      <HeroBackground />
    </section>
  );
}