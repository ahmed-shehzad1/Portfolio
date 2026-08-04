import { useEffect } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from '@/components/Hero/HeroCanvas';
import { Navbar, HeroContent, ScrollIndicator } from '@/components/UI';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import SystemCapabilities from '@/components/sections/SystemCapabilities';
import { useLenisGsap } from '@/hooks/useLenisGsap';

const App: FC = () => {
  useLenisGsap();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-copy', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.15,
    });

    const sections = gsap.utils.toArray<HTMLElement>('.section-reveal');
    sections.forEach((section) => {
      gsap.from(section, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070f] text-white antialiased">
      <HeroCanvas />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1300px] flex-col px-6 py-8 lg:px-12">
        <Navbar />

        <div className="hero-copy flex flex-1 flex-col justify-center gap-8 py-16">
          <HeroContent />

          <div className="flex flex-wrap gap-4">
            <a className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10 hover:text-white" href="#work">
              View work
            </a>
            <a className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.3em] text-white/70 transition hover:text-white" href="#capabilities">
              Capabilities
            </a>
          </div>
        </div>
      </div>

      <section id="work" className="relative z-20 mx-auto max-w-[1300px] px-6 py-24 lg:px-12 section-reveal">
        <ProjectShowcase />
      </section>

      <section id="capabilities" className="relative z-20 mx-auto max-w-[1300px] px-6 pb-32 lg:px-12 section-reveal">
        <SystemCapabilities />
      </section>

      <ScrollIndicator />
    </main>
  );
};

export default App;