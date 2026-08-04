// FILE: src/components/sections/hero/HeroBackground.tsx
import { MagneticButton } from '../../ui/MagneticButton';

export function HeroBackground() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 flex h-full flex-col justify-between px-6 py-24 max-w-7xl mx-auto pointer-events-none">
      {/* Top Metadata Header */}
      <div className="flex items-center justify-between font-mono text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00F58C] animate-pulse" />
          <span>STATUS // READY TO ENGINEER</span>
        </div>
        <span className="hidden sm:inline">QUOTE // "THERE IS NOTHING I CANNOT LEARN."</span>
      </div>

      {/* Main Title / Callout */}
      <div className="max-w-4xl pointer-events-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F58C] glass-panel px-3 py-1 rounded-full border-white/10 mb-6">
          <span>FULL STACK & SYSTEMS ARCHITECT</span>
        </div>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6">
          AHMED <br />
          <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(0,245,140,0.8)]">
            SHEHZAD
          </span>
        </h1>
        <p className="text-white/70 text-base sm:text-lg max-w-2xl font-sans mb-8 leading-relaxed">
          Specializing in Turborepo monorepos, multi-provider AI routing (Gemini, Groq, Claude, OpenAI), Prisma ORM, and high-concurrency Node.js backends.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <MagneticButton strength={25}>
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-4 bg-[#00F58C] text-[#030308] font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,245,140,0.3)]"
            >
              INSPECT SYSTEM WORKS &rarr;
            </button>
          </MagneticButton>
          <MagneticButton strength={15}>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 glass-panel text-white font-mono text-xs uppercase tracking-wider rounded-xl hover:border-white/30 transition-all"
            >
              INITIATE CONTACT
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Footer Indicator */}
      <div className="flex items-center justify-between font-mono text-xs text-white/40">
        <span>NEXT.JS · TURBOREPO · NODE.JS · PRISMA · AI ROUTING</span>
        <div className="w-12 h-[1px] bg-white/20" />
      </div>
    </div>
  );
}