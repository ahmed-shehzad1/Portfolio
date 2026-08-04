import type { FC } from 'react';

export const Navbar: FC = () => (
  <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-0 py-4 text-sm uppercase tracking-[0.32em] text-white/70">
    <div className="flex items-center gap-4">
      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.35em] text-white/90 backdrop-blur-md">
        Future Portfolio
      </span>
      <span className="text-xs uppercase tracking-[0.35em] text-white/55">Interactive digital experiences</span>
    </div>
    <a className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/10 hover:text-white" href="#work">
      View work
    </a>
  </nav>
);

export const HeroContent: FC = () => (
  <div className="space-y-6 max-w-xl">
    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70 backdrop-blur-md">
      Portfolio
    </span>
    <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
      I design immersive interfaces for premium technology brands.
    </h1>
    <p className="text-lg leading-8 text-slate-300 sm:text-xl">
      Refined digital systems, cinematic motion, and premium product experiences that feel tactile, intelligent, and effortless.
    </p>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Product systems</p>
        <p className="mt-3 text-2xl font-semibold text-white">Cinematic interaction</p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Studio work</p>
        <p className="mt-3 text-2xl font-semibold text-white">Premium digital interfaces</p>
      </div>
    </div>
  </div>
);

export const HeroPanel: FC = () => (
  <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0c1330]/75 p-8 shadow-[0_50px_120px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
    <div className="relative space-y-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">System preview</p>
        <h2 className="text-3xl font-semibold text-white">Quiet metrics, premium presence.</h2>
        <p className="text-sm leading-6 text-slate-300">
          A small panel for clean information without loud color or clutter.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Render</p>
          <p className="mt-4 text-3xl font-semibold text-white">Clean</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Latency</p>
          <p className="mt-4 text-3xl font-semibold text-white">Minimal</p>
        </div>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Design system</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold text-white">Quiet interaction</p>
            <p className="mt-2 text-sm text-slate-400">Soft motion and clean detail.</p>
          </div>
          <div className="rounded-3xl bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">Live</div>
        </div>
      </div>
    </div>
  </div>
);

export const ScrollIndicator: FC = () => (
  <div className="pointer-events-none absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-center text-xs uppercase tracking-[0.35em] text-white/60">
    <div className="mx-auto mb-2 h-8 w-px bg-white/20" />
    Scroll
  </div>
);

export const SocialLinks: FC = () => (
  <div className="pointer-events-auto absolute bottom-8 right-6 z-50 flex gap-3 md:right-8">
    {['GitHub', 'Dribbble', 'LinkedIn'].map((label) => (
      <a key={label} href="#" className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40 hover:text-white">
        {label}
      </a>
    ))}
  </div>
);

export const AnimatedGradient: FC = () => (
  <div className="pointer-events-none absolute inset-0 opacity-100">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_18%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.0),rgba(5,7,13,0.92))]" />
  </div>
);
