// FILE: src/App.tsx
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectShowcase } from './components/sections/ProjectShowcase';
import { Skills } from './components/sections/Skills';
import { SystemCapabilities } from './components/sections/SystemCapabilities';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { useLenisGsap } from './hooks/useLenisGsap';

export function App() {
  // Initialize Lenis smooth scroll synced with GSAP ticker
  useLenisGsap();

  return (
    <div className="relative min-h-screen bg-[#030308] text-white selection:bg-[#00f0ff]/30">
      {/* Hardware-accelerated custom cursor */}
      <CustomCursor />

      {/* Glass navigation bar */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <ProjectShowcase />
        <Skills />
        <SystemCapabilities />
        <Contact />
      </main>

      {/* Cyberpunk Architectural Footer */}
      <Footer />
    </div>
  );
}

export default App;