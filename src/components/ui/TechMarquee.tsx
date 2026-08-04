import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiTurborepo,
  SiPrisma,
  SiPostgresql,
  SiTailwindcss,
  SiSupabase,
  SiDocker,
  SiPython,
  SiGit,
} from 'react-icons/si';

interface TechItem {
  name: string;
  Icon: IconType;
  color: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'NEXT.JS', Icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'TYPESCRIPT', Icon: SiTypescript, color: '#3178C6' },
  { name: 'REACT', Icon: SiReact, color: '#61DAFB' },
  { name: 'NODE.JS', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'TURBOREPO', Icon: SiTurborepo, color: '#EF4444' },
  { name: 'PRISMA', Icon: SiPrisma, color: '#5A67D8' },
  { name: 'POSTGRESQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'TAILWIND CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'SUPABASE', Icon: SiSupabase, color: '#3ECF8E' },
  { name: 'DOCKER', Icon: SiDocker, color: '#2496ED' },
  { name: 'PYTHON', Icon: SiPython, color: '#3776AB' },
  { name: 'GIT', Icon: SiGit, color: '#F05032' },
];

export function TechMarquee() {
  // Duplicate array for infinite ticker continuity
  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#030308]/90 backdrop-blur-md py-4 font-mono text-xs">
      {/* Side Vignette Fades */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#030308] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#030308] to-transparent" />

      <motion.div
        className="flex w-max items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        }}
      >
        {items.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <div key={index} className="flex items-center gap-3 px-6 group">
              {/* Icon Container Badge */}
              <div
                className="p-2 rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:scale-110 group-hover:border-white/30"
                style={{
                  boxShadow: `0 0 12px ${item.color}25`,
                }}
              >
                <IconComponent
                  className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6"
                  style={{ color: item.color }}
                />
              </div>

              {/* Tech Name */}
              <span className="font-mono text-xs font-semibold tracking-wider text-white/70 transition-colors group-hover:text-white">
                {item.name}
              </span>

              {/* Divider accent */}
              <span className="ml-4 text-white/20">//</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}