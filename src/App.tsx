// FILE: src/App.tsx
import { Navbar } from './components/ui/Navbar';
import { HeroBackground } from './components/sections/hero/HeroBackground';
import { ProjectShowcase } from './components/sections/ProjectShowcase';
import { Skills } from './components/sections/Skills';
import { SystemCapabilities } from './components/sections/SystemCapabilities';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { ScrollScanline } from './components/ui/ScrollScanline';
import { ScrollReveal } from './components/ui/ScrollReveal';

export default function App() {
  return (
    <div className="relative bg-[#030308] text-white selection:bg-[#00F58C] selection:text-[#030308]">
      {/* Top HUD Laser Scanline */}
      <ScrollScanline />

      <Navbar />

      <main id="hero" className="relative min-h-screen">
        <HeroBackground />
      </main>

      <ScrollReveal direction="up">
        <ProjectShowcase />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <Skills />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <SystemCapabilities />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Contact />
      </ScrollReveal>

      <Footer />
    </div>
  );
}