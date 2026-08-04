import type { FC } from 'react';

export const Navbar: FC = () => (
  <nav className="flex items-center justify-between px-6 py-4 text-sm uppercase tracking-[0.3em] text-white/80 md:px-8">
    <span className="font-medium">Future OS</span>
    <span className="rounded-full border border-white/15 px-3 py-1">Immersive portfolio</span>
  </nav>
);

export const HeroContent: FC = () => (
  <div className="max-w-2xl space-y-5">
    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Interactive spatial experience</p>
    <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
      Designing the next layer of digital presence.
    </h1>
    <p className="max-w-xl text-base text-white/70 sm:text-lg">
      A cinematic hero scene built with React Three Fiber and a lightweight UI layer that keeps the experience responsive.
    </p>
  </div>
);

export const ScrollIndicator: FC = () => (
  <div className="pointer-events-none absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-center text-xs uppercase tracking-[0.35em] text-white/60">
    <div className="mx-auto mb-2 h-8 w-px bg-white/40" />
    Scroll
  </div>
);

export const SocialLinks: FC = () => (
  <div className="pointer-events-auto absolute bottom-8 right-6 z-50 flex gap-3 md:right-8">
    {['GitHub', 'Dribbble', 'LinkedIn'].map((label) => (
      <a key={label} href="#" className="rounded-full border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-cyan-300/50 hover:text-white">
        {label}
      </a>
    ))}
  </div>
);

export const AnimatedGradient: FC = () => null;
