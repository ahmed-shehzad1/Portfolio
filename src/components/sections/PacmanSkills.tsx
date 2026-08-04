import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SkillDot {
  id: string;
  name: string;
  position: number; // percentage along track (0-100)
  icon: string;
  color: string;
  eaten: boolean;
}

const INITIAL_SKILLS: SkillDot[] = [
  { id: 'ts', name: 'TypeScript', position: 12, icon: 'TS', color: '#3178C6', eaten: false },
  { id: 'js', name: 'JavaScript', position: 26, icon: 'JS', color: '#F7DF1E', eaten: false },
  { id: 'html', name: 'HTML5', position: 40, icon: 'HTML', color: '#E34F26', eaten: false },
  { id: 'react', name: 'React', position: 54, icon: 'REACT', color: '#61DAFB', eaten: false },
  { id: 'node', name: 'Node.js', position: 68, icon: 'NODE', color: '#339933', eaten: false },
  { id: 'tailwind', name: 'Tailwind', position: 82, icon: 'CSS', color: '#06B6D4', eaten: false },
];

export function PacmanSkills() {
  const [pacmanX, setPacmanX] = useState(0);
  const [skills, setSkills] = useState<SkillDot[]>(INITIAL_SKILLS);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const speed = 0.35; // speed multiplier
    const interval = setInterval(() => {
      setPacmanX((prev) => {
        const next = prev + speed;

        // Check collision with skills
        setSkills((currentSkills) =>
          currentSkills.map((skill) => {
            if (!skill.eaten && next >= skill.position - 2) {
              setScore((s) => s + 100);
              return { ...skill, eaten: true };
            }
            return skill;
          })
        );

        // Reset track loop
        if (next > 96) {
          setSkills((currentSkills) =>
            currentSkills.map((s) => ({ ...s, eaten: false }))
          );
          return -4;
        }

        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Arcade Container */}
      <div className="glass-panel relative rounded-2xl border border-white/10 p-6 bg-[#030308]/90 overflow-hidden font-mono">
        {/* Header HUD */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-xs">
          <div className="flex items-center gap-2 text-[#00F58C]">
            <span className="w-2 h-2 rounded-full bg-[#00F58C] animate-ping" />
            <span className="tracking-wider">// ARCADE_PROTOCOL // SKILL_MUNCHER_V1.0</span>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <span>HIGH SCORE: <strong className="text-[#00F0FF]">99000</strong></span>
            <span>SCORE: <strong className="text-[#00F58C]">{score}</strong></span>
          </div>
        </div>

        {/* Track Line */}
        <div className="relative h-24 w-full flex items-center px-4">
          <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full" />

          {/* Skill Dots to Eat */}
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="absolute -translate-x-1/2 flex flex-col items-center transition-all duration-300"
              style={{ left: `${skill.position}%` }}
            >
              <motion.div
                animate={{
                  scale: skill.eaten ? 0 : 1,
                  opacity: skill.eaten ? 0 : 1,
                  y: skill.eaten ? -20 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                {/* Custom Tech Badge */}
                <div
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold border border-white/20 shadow-lg backdrop-blur-md"
                  style={{
                    backgroundColor: `${skill.color}20`,
                    borderColor: skill.color,
                    color: skill.color,
                  }}
                >
                  {skill.icon}
                </div>
                <span className="text-[9px] text-white/50 mt-1">{skill.name}</span>
              </motion.div>

              {/* Floating +100 Score Text on Eat */}
              {skill.eaten && (
                <motion.span
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.5 }}
                  className="absolute text-[10px] font-bold text-[#00F58C]"
                >
                  +100
                </motion.span>
              )}
            </div>
          ))}

          {/* Animated Pac-Man */}
          <div
            className="absolute -translate-x-1/2 z-20 pointer-events-none"
            style={{ left: `${Math.max(0, pacmanX)}%` }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Pac-Man Body SVG with Mouth Champing Effect */}
              <svg className="w-10 h-10 -rotate-45 fill-[#F7DF1E] drop-shadow-[0_0_10px_#F7DF1E]" viewBox="0 0 100 100">
                <path d="M 50 50 L 95 20 A 45 45 0 1 0 95 80 Z">
                  <animate
                    attributeName="d"
                    values="M 50 50 L 95 20 A 45 45 0 1 0 95 80 Z; M 50 50 L 98 48 A 45 45 0 1 0 98 52 Z; M 50 50 L 95 20 A 45 45 0 1 0 95 80 Z"
                    dur="0.25s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center font-mono text-[10px] text-white/40 mt-4 border-t border-white/5 pt-3">
          PRESS START // CONSUMING CORE WEB STACK &amp; ARCHITECTURAL PATTERNS
        </div>
      </div>
    </div>
  );
}