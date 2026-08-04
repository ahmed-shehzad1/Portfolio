// FILE: src/components/sections/SystemCapabilities.tsx
const CAPABILITIES = [
  {
    code: '01',
    title: 'SPATIAL 3D INTERACTION',
    description: 'Immersive browser experiences leveraging custom GLSL shaders, lighting models, and physics-driven particle systems.',
  },
  {
    code: '02',
    title: 'MICRO-GRAPHICS & ANIMATION',
    description: 'Fluid 60FPS UI transitions using GSAP and Lenis scroll synchronization with zero main-thread blockage.',
  },
  {
    code: '03',
    title: 'HIGH-PERFORMANCE OS UI',
    description: 'Enterprise React 19 architecture built with zero unneeded re-renders, strict TypeScript, and Tailwind CSS v4.',
  },
  {
    code: '04',
    title: 'FULL-STACK INTEGRATION',
    description: 'Scalable backend API integration with WebSockets, cloud infrastructure, and low-latency database management.',
  },
];

export function SystemCapabilities() {
  return (
    <section id="capabilities" className="relative min-h-screen w-full bg-[#030308] py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 font-mono text-xs text-[#00f0ff] uppercase tracking-widest mb-3">
            <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            04 // SYSTEM ARCHITECTURE
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
            Core <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Capabilities</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.code}
              className="glass-panel p-10 rounded-3xl border-white/10 hover:border-[#00f0ff]/30 transition-colors group"
            >
              <div className="font-mono text-2xl font-bold text-[#00f0ff] mb-6 group-hover:translate-x-2 transition-transform">
                // {cap.code}
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {cap.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}