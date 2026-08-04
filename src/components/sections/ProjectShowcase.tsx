// FILE: src/components/sections/ProjectShowcase.tsx
import { useState } from 'react';
import { useSystemStore, type Project } from '../../store/useSystemStore';
import { MagneticButton } from '../ui/MagneticButton';

const PROJECTS: Project[] = [
  {
    id: 'airo',
    title: 'AIRO — Academic Intelligence & Resource Orchestrator',
    category: 'AI / Neural',
    description: 'Full-stack academic platform combining knowledge management, Google Classroom sync, and multi-provider AI processing.',
    longDescription: 'Built on a Turborepo monorepo with strict Controller → Service → Repository layering and a transaction-safe PostgreSQL + Prisma backend. Features a deterministic classification engine paired with multi-provider AI routing (Gemini, Groq, OpenAI, Claude) for structured document extraction, OAuth 2.0 authentication, and strict document publishing workflows (PRIVATE → PENDING → PUBLISHED).',
    tags: ['Turborepo', 'Next.js', 'Google Classroom API', 'Prisma', 'PostgreSQL', 'Multi-AI'],
    metrics: [
      { label: 'Architecture', value: 'Monorepo' },
      { label: 'AI Providers', value: '4 Engines' },
      { label: 'Security', value: 'OAuth 2.0 + RBAC' },
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/ahmed-shehzad1',
  },
  {
    id: 'rydex',
    title: 'Rydex 2.0 — AI-Powered Ride-Sharing Platform',
    category: 'Full-Stack OS',
    description: 'Ride-sharing ecosystem focused on intelligent route matching, navigation, role-based dual portals, and secure auth.',
    longDescription: 'Features intelligent passenger-to-driver route matching algorithms, Mapbox API integration for interactive mapping and real-time navigation, JWT authentication for protected API routes, and distinct role-based UI experiences for both Drivers and Passengers.',
    tags: ['Next.js', 'Mapbox API', 'JWT Auth', 'Node.js', 'Tailwind CSS'],
    metrics: [
      { label: 'Matching Logic', value: 'Smart Route' },
      { label: 'Portals', value: 'Dual Role' },
      { label: 'API Security', value: 'JWT Guarded' },
    ],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://rydex-2-0.vercel.app',
    githubUrl: 'https://github.com/ahmed-shehzad1',
  },
  {
    id: 'elitedrive',
    title: 'EliteDrive — Luxury Car Rental & VIP Concierge',
    category: 'Full-Stack OS',
    description: 'Premium vehicle rental platform featuring dynamic fleet management, Supabase RLS security policies, and an AI concierge.',
    longDescription: 'A high-end luxury vehicle rental platform offering real-time fleet availability, automated booking management, user session management via Supabase Auth, Row Level Security (RLS) data isolation, and an integrated AI concierge assistant for VIP user experience.',
    tags: ['Supabase', 'RLS Security', 'Next.js', 'AI Concierge', 'Tailwind CSS'],
    metrics: [
      { label: 'Data Isolation', value: 'Supabase RLS' },
      { label: 'Concierge', value: 'AI Integrated' },
      { label: 'Fleet Sync', value: 'Realtime' },
    ],
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://elite-drive-mu.vercel.app/',
    githubUrl: 'https://github.com/ahmed-shehzad1',
  },
];

const CATEGORIES = ['ALL', 'AI / Neural', 'Full-Stack OS'] as const;

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const { setSelectedProject, selectedProject } = useSystemStore();

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative min-h-screen w-full bg-[#030308] py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#00F58C] uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-[#00F58C] shadow-[0_0_8px_#00F58C]" />
              02 // FEATURED SYSTEMS
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
              Selected <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Architectures</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 glass-panel p-1.5 rounded-xl border-white/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-mono text-xs rounded-lg transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#00F58C] text-[#030308] font-bold shadow-[0_0_12px_rgba(0,245,140,0.4)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer glass-panel-interactive rounded-2xl overflow-hidden flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-[#0a0b14]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full font-mono text-[10px] font-semibold text-[#00F58C] border-white/10">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00F58C] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between font-mono text-xs font-bold text-[#00F58C] pt-4 border-t border-white/5">
                  <span>SYSTEM SPECIFICATIONS &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
          <div className="relative max-w-3xl w-full glass-panel border-white/15 rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 font-mono text-xs text-white/50 hover:text-white glass-panel px-3 py-1.5 rounded-full"
            >
              [ ESC // CLOSE ]
            </button>

            <span className="font-mono text-xs text-[#00F58C] uppercase tracking-widest block mb-2">
              {selectedProject.category}
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white mb-4">
              {selectedProject.title}
            </h2>

            <p className="text-white/80 leading-relaxed mb-8">
              {selectedProject.longDescription}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {selectedProject.metrics.map((m) => (
                <div key={m.label} className="glass-panel p-4 rounded-xl border-white/5">
                  <span className="block font-mono text-[10px] text-white/40 uppercase mb-1">
                    {m.label}
                  </span>
                  <span className="font-mono text-lg font-bold text-[#00F58C]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {selectedProject.liveUrl && (
                <MagneticButton strength={20}>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-[#00F58C] text-[#030308] font-mono text-xs font-bold rounded-xl hover:bg-white transition-colors inline-block"
                  >
                    LAUNCH LIVE SYSTEM &rarr;
                  </a>
                </MagneticButton>
              )}
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 glass-panel text-white font-mono text-xs rounded-xl hover:border-white/30 transition-colors inline-block"
              >
                VIEW GITHUB REPO
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}