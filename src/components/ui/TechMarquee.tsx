import { motion } from 'framer-motion';

const MARQUEE_ITEMS = [
  'TURBOREPO MONOREPO',
  'MULTI-PROVIDER AI ROUTING',
  'TYPESCRIPT EXCELLENCE',
  'PRISMA ORM & POSTGRESQL',
  'NEXT.JS 14 ARCHITECTURE',
  'HIGH-CONCURRENCY NODE.JS',
  'REST & GRAPHQL APIS',
  'SUPABASE RLS SECURITY',
];

export function TechMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#030308]/80 backdrop-blur-md py-4 font-mono text-xs">
      {/* Side Vignette Fades */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#030308] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#030308] to-transparent" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 25,
          ease: 'linear',
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00F58C] shadow-[0_0_8px_#00F58C]" />
            <span className="tracking-widest text-white/80 transition-colors hover:text-[#00F58C]">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}