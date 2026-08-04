// src/App.tsx
import type { FC } from 'react';
import HeroCanvas from '@/components/Hero/HeroCanvas';
import { Navbar, HeroContent, ScrollIndicator } from '@/components/UI';

const App: FC = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070f] text-white antialiased">
      <HeroCanvas />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1300px] flex-col px-6 py-8 lg:px-12">
        <Navbar />

        <div className="flex flex-1 flex-col justify-center gap-8 py-16">
          <HeroContent />

          <div className="flex flex-wrap gap-4">
            <a className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10 hover:text-white" href="#">
              Request preview
            </a>
            <a className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white/70 transition hover:text-white" href="#">
              View case
            </a>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </main>
  );
};

export default App;