// FILE: src/components/sections/SystemCapabilities.tsx
const PILLARS = [
  {
    code: '01',
    title: 'STRUCTURE',
    subtitle: 'Modular Layered Boundaries',
    description: 'Clear modules, focused responsibilities, and predictable Controller → Service → Repository layer boundaries using Turborepo and Next.js.',
  },
  {
    code: '02',
    title: 'PROTECT',
    subtitle: 'Zero-Trust Security & DTO Validation',
    description: 'Strict DTO input validation, fine-grained Role-Based Access Control (RBAC), OAuth 2.0 / JWT integration, and strict resource ownership policies.',
  },
  {
    code: '03',
    title: 'PROCESS',
    subtitle: 'Deterministic & Hybrid AI Engine',
    description: 'Deterministic rule-based logic execution first, coupled with intelligent multi-provider AI fallbacks (Gemini, Groq, OpenAI, Claude) second.',
  },
  {
    code: '04',
    title: 'SCALE',
    subtitle: 'Transaction-Safe Data Flows',
    description: 'Reusable isolated services, transactional database operations with Prisma & PostgreSQL, and architectures built with limitless headroom.',
  },
];

export function SystemCapabilities() {
  return (
    <section id="capabilities" className="relative min-h-screen w-full bg-[#030308] py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F58C] uppercase tracking-widest mb-3">
            <span className="h-2 w-2 rounded-full bg-[#00F58C] shadow-[0_0_8px_#00F58C]" />
            04 // ENGINEERING PHILOSOPHY
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
            How I <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Engineer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((cap) => (
            <div
              key={cap.code}
              className="glass-panel p-10 rounded-3xl border-white/10 hover:border-[#00F58C]/30 transition-colors group"
            >
              <div className="font-mono text-2xl font-bold text-[#00F58C] mb-2 group-hover:translate-x-2 transition-transform">
                // {cap.code}
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">
                {cap.title}
              </h3>
              <div className="font-mono text-xs text-white/40 uppercase mb-4">
                {cap.subtitle}
              </div>
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