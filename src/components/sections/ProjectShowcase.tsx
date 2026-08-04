import type { FC } from 'react';

const projects = [
  {
    title: 'Future OS Portfolio',
    description: 'A polished, cinematic landing experience built with React, Three.js, and smooth scroll animation.',
    tags: ['React', 'Three.js', 'GSAP'],
  },
  {
    title: 'Interactive 3D Brand System',
    description: 'A responsive product showcase with subtle motion, clean typography, and performance-first design.',
    tags: ['UI/UX', 'Motion', 'Performance'],
  },
  {
    title: 'Modern Product Narrative',
    description: 'A premium presentation flow with modular layout, dark mode styling, and accessible content structure.',
    tags: ['Design Systems', 'Accessibility', 'Brand Experience'],
  },
];

const ProjectShowcase: FC = () => (
  <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-white/50">Featured work</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Selected projects that define the brand.</h2>
      <p className="mt-4 max-w-2xl text-base text-slate-300">From landing experiences to interactive case studies, each project is crafted to feel cinematic, effortless, and memorable.</p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <article key={project.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 transition hover:border-white/20 hover:bg-slate-900/95">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-[0.69rem] uppercase tracking-[0.2em] text-slate-300">{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default ProjectShowcase;
