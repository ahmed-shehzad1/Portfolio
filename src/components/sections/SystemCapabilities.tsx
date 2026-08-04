import type { FC } from 'react';

const capabilities = [
  { title: 'Custom 3D Interaction', description: 'Real-time visuals and responsive motion that feel alive without overwhelming the experience.' },
  { title: 'Smooth scroll storytelling', description: 'Lenis and GSAP combine to create a polished, cinematic page flow that is easy to navigate.' },
  { title: 'Brand-focused visuals', description: 'A restrained, premium palette with layered depth and clear content hierarchy.' },
];

const SystemCapabilities: FC = () => (
  <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-white/50">Capabilities</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Design systems & motion engineered for impact.</h2>
      <p className="mt-4 max-w-2xl text-base text-slate-300">A modern interface should feel intentional, with motion, layout, and accessibility working together in every section.</p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {capabilities.map((item) => (
        <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 transition hover:border-white/20 hover:bg-slate-900/95">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default SystemCapabilities;
