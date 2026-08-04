// src/App.tsx
import type { FC } from 'react';
import HeroCanvas from '@/components/Hero/HeroCanvas';
import { Navbar, HeroContent, ScrollIndicator, SocialLinks, AnimatedGradient } from '@/components/UI';

const App: FC = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-void text-white antialiased">
      {/* Existing Three.js hero canvas (do not modify Hero files) */}
      <HeroCanvas />

      {/* UI overlay above the canvas */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <AnimatedGradient />

        <div className="pointer-events-auto">
          <Navbar />
        </div>

        <div className="absolute inset-0 z-40 flex items-center px-6 md:px-12 lg:px-24">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
            <div className="flex-1 pointer-events-auto py-12">
              <div className="md:pt-10 lg:pt-14">
                <HeroContent />
              </div>
            </div>
            <div className="hidden lg:flex lg:w-1/3" />
          </div>
        </div>

        <SocialLinks />
        <ScrollIndicator />
      </div>
    </main>
  );
};

export default App;