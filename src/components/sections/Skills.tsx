// FILE: src/components/sections/Skills.tsx
const SKILL_GROUPS = [
  {
    category: 'CORE ARCHITECTURE',
    skills: [
      { name: 'TypeScript / JS (ESNext)', level: 98 },
      { name: 'React 19 / Next.js', level: 95 },
      { name: 'WebGL / Three.js / R3F', level: 92 },
      { name: 'Tailwind CSS v4 / SCSS', level: 96 },
    ],
  },
  {
    category: 'GRAPHICS & SHADERS',
    skills: [
      { name: 'GLSL / Custom Shaders', level: 88 },
      { name: 'GSAP / ScrollTrigger', level: 95 },
      { name: 'Framer Motion', level: 90 },
      { name: 'Blender 3D Modeling', level: 80 },
    ],
  },
  {
    category: 'BACKEND & INFRASTRUCTURE',
    skills: [
      { name: 'Node.js / Express / Bun', level: 90 },
      { name: 'WebSockets / WebRTC', level: 85 },
      { name: 'Docker / CI/CD', level: 82 },
      { name: 'PostgreSQL / Redis', level: 88 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative min-h-screen w-full bg-[#030308] py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 font-mono text-xs text-[#8b5cf6] uppercase tracking-widest mb-3">
            <span className="h-2 w-2 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
            03 // TECHNICAL MATRIX
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
            Capability <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Tree</span>
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
                <h3 className="font-mono text-xs font-bold text-[#8b5cf6] tracking-widest uppercase mb-8 border-b border-white/5 pb-4">
                  {group.category}
                </h3>

                <div className="space-y-6">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between font-mono text-xs text-white/80 mb-2">
                        <span>{skill.name}</span>
                        <span className="text-[#00f0ff] font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/30">
                <span>STATUS: VERIFIED</span>
                <span>TIER 1</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}