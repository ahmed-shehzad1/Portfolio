// FILE: src/components/sections/Skills.tsx
const SKILL_GROUPS = [
  {
    category: 'FRONTEND & ARCHITECTURE',
    skills: [
      { name: 'Next.js / React', level: 98 },
      { name: 'TypeScript / JavaScript (ESNext)', level: 96 },
      { name: 'Turborepo Monorepo', level: 95 },
      { name: 'Tailwind CSS / HTML / CSS / Vite', level: 95 },
    ],
  },
  {
    category: 'BACKEND & DATA',
    skills: [
      { name: 'Node.js / Express', level: 95 },
      { name: 'Prisma ORM & PostgreSQL', level: 92 },
      { name: 'REST APIs & Layered Architecture', level: 96 },
      { name: 'Supabase / MongoDB / MySQL / SQLite', level: 88 },
    ],
  },
  {
    category: 'AI & DEVOPS TOOLING',
    skills: [
      { name: 'Multi-AI Routing (Gemini/Groq/OpenAI/Claude)', level: 94 },
      { name: 'Python / TensorFlow / PyTorch', level: 82 },
      { name: 'OAuth 2.0 / JWT / RBAC Security', level: 92 },
      { name: 'Docker / Linux / Git / Vercel', level: 90 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative min-h-screen w-full bg-[#030308] py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F58C] uppercase tracking-widest mb-3">
            <span className="h-2 w-2 rounded-full bg-[#00F58C] shadow-[0_0_8px_#00F58C]" />
            03 // TECH STACK & TOOLING
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
            Engineering <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Matrix</span>
          </h2>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="glass-panel p-8 rounded-3xl border-white/10 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono text-xs font-bold text-[#00F58C] tracking-widest uppercase mb-8 border-b border-white/5 pb-4">
                  {group.category}
                </h3>

                <div className="space-y-6">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between font-mono text-xs text-white/80 mb-2">
                        <span>{skill.name}</span>
                        <span className="text-[#00F58C] font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00F58C] rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/30">
                <span>VERIFIED STACK</span>
                <span>PRODUCTION READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}