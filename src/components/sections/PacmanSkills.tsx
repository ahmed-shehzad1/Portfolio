import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiPrisma,
  SiNextdotjs,
  SiDocker,
  SiPostgresql,
} from 'react-icons/si';

interface SkillTile {
  id: string;
  name: string;
  row: number;
  col: number;
  Icon: IconType;
  color: string;
  eaten: boolean;
}

interface PacmanAgent {
  id: string;
  color: string;
  r: number;
  c: number;
  dir: number; // 0: Right, 1: Down, 2: Left, 3: Up
  rotation: number;
}

// 0 = Corridor Path, 1 = Wall Block
const MAZE_GRID = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const DIRS = [
  { dr: 0, dc: 1, rot: 0 },   // Right
  { dr: 1, dc: 0, rot: 90 },  // Down
  { dr: 0, dc: -1, rot: 180 },// Left
  { dr: -1, dc: 0, rot: 270 },// Up
];

const INITIAL_SKILLS: SkillTile[] = [
  { id: 'ts', name: 'TypeScript', row: 1, col: 1, Icon: SiTypescript, color: '#3178C6', eaten: false },
  { id: 'js', name: 'JavaScript', row: 1, col: 7, Icon: SiJavascript, color: '#F7DF1E', eaten: false },
  { id: 'react', name: 'React', row: 1, col: 13, Icon: SiReact, color: '#61DAFB', eaten: false },
  { id: 'node', name: 'Node.js', row: 3, col: 3, Icon: SiNodedotjs, color: '#5FA04E', eaten: false },
  { id: 'prisma', name: 'Prisma', row: 3, col: 11, Icon: SiPrisma, color: '#5A67D8', eaten: false },
  { id: 'tailwind', name: 'Tailwind', row: 5, col: 3, Icon: SiTailwindcss, color: '#06B6D4', eaten: false },
  { id: 'next', name: 'Next.js', row: 5, col: 11, Icon: SiNextdotjs, color: '#FFFFFF', eaten: false },
  { id: 'docker', name: 'Docker', row: 7, col: 1, Icon: SiDocker, color: '#2496ED', eaten: false },
  { id: 'postgres', name: 'PostgreSQL', row: 7, col: 13, Icon: SiPostgresql, color: '#4169E1', eaten: false },
];

export function PacmanSkills() {
  const [skills, setSkills] = useState<SkillTile[]>(INITIAL_SKILLS);
  const [score, setScore] = useState(0);

  const [pacmen, setPacmen] = useState<PacmanAgent[]>([
    { id: 'pac-1', color: '#F7DF1E', r: 1, c: 1, dir: 0, rotation: 0 },
    { id: 'pac-2', color: '#00F58C', r: 7, c: 13, dir: 2, rotation: 180 },
  ]);

  useEffect(() => {
    const stepSize = 0.08;

    const interval = setInterval(() => {
      setPacmen((prevPacmen) =>
        prevPacmen.map((pac) => {
          let { r, c, dir, rotation } = pac;

          const currentDir = DIRS[dir];
          let nextR = r + currentDir.dr * stepSize;
          let nextC = c + currentDir.dc * stepSize;

          const gridR = Math.round(nextR);
          const gridC = Math.round(nextC);

          const isAtCellCenter =
            Math.abs(nextR - gridR) < stepSize && Math.abs(nextC - gridC) < stepSize;

          if (isAtCellCenter) {
            const validDirs: number[] = [];
            DIRS.forEach((d, idx) => {
              const checkR = gridR + d.dr;
              const checkC = gridC + d.dc;
              if (
                checkR >= 0 &&
                checkR < MAZE_GRID.length &&
                checkC >= 0 &&
                checkC < MAZE_GRID[0].length &&
                MAZE_GRID[checkR][checkC] === 0
              ) {
                validDirs.push(idx);
              }
            });

            const oppositeDir = (dir + 2) % 4;
            const forwardValid = validDirs.includes(dir);
            const choiceDirs = validDirs.filter((d) => d !== oppositeDir);

            if (choiceDirs.length > 0) {
              if (!forwardValid || Math.random() < 0.35) {
                dir = choiceDirs[Math.floor(Math.random() * choiceDirs.length)];
              }
            } else if (validDirs.length > 0) {
              dir = validDirs[0];
            }

            rotation = DIRS[dir].rot;
            r = gridR;
            c = gridC;

            setSkills((prevSkills) =>
              prevSkills.map((s) => {
                if (!s.eaten && s.row === gridR && s.col === gridC) {
                  setScore((sc) => sc + 200);
                  return { ...s, eaten: true };
                }
                return s;
              })
            );
          } else {
            r = nextR;
            c = nextC;
          }

          return { ...pac, r, c, dir, rotation };
        })
      );

      setSkills((prevSkills) => {
        if (prevSkills.every((s) => s.eaten)) {
          return prevSkills.map((s) => ({ ...s, eaten: false }));
        }
        return prevSkills;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const rows = MAZE_GRID.length;
  const cols = MAZE_GRID[0].length;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="glass-panel relative rounded-2xl border border-white/10 p-6 bg-[#030308]/95 overflow-hidden font-mono">
        {/* Arcade HUD */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs">
          <div className="flex items-center gap-3 text-[#00F58C]">
            <span className="w-2 h-2 rounded-full bg-[#00F58C] animate-ping" />
            <span className="tracking-wider">// ARCADE_GRID // MULTI_AGENT_SYSTEM</span>
          </div>
          <div className="flex items-center gap-6 text-white/80 text-[11px]">
            <span>AGENTS: <strong className="text-[#00F58C]">PAC-01 &amp; PAC-02</strong></span>
            <span>SCORE: <strong className="text-[#00F0FF]">{score}</strong></span>
          </div>
        </div>

        {/* 2D Grid Maze Board */}
        <div
          className="relative w-full aspect-[15/9] rounded-xl border-2 border-blue-600/40 bg-[#02030a] overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)]"
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {/* Maze Grid Cells & Pellets */}
          {MAZE_GRID.map((rowArr, rIdx) =>
            rowArr.map((tile, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                className="relative w-full h-full flex items-center justify-center p-0.5"
              >
                {tile === 1 ? (
                  <div className="w-full h-full bg-blue-950/40 border border-blue-500/50 rounded-sm shadow-[inset_0_0_6px_rgba(59,130,246,0.3)]" />
                ) : (
                  !skills.some((s) => s.row === rIdx && s.col === cIdx) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-200/40" />
                  )
                )}
              </div>
            ))
          )}

          {/* Skill Icon Blocks */}
          {skills.map((skill) => {
            const IconComponent = skill.Icon;
            return (
              <div
                key={skill.id}
                className="absolute z-10 flex items-center justify-center pointer-events-none"
                style={{
                  top: `${(skill.row / rows) * 100}%`,
                  left: `${(skill.col / cols) * 100}%`,
                  width: `${(1 / cols) * 100}%`,
                  height: `${(1 / rows) * 100}%`,
                }}
              >
                <motion.div
                  animate={{
                    scale: skill.eaten ? 0 : 1,
                    opacity: skill.eaten ? 0 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                  className="w-full h-full flex items-center justify-center p-1"
                >
                  <div
                    className="w-full h-full max-w-[28px] max-h-[28px] rounded-lg border bg-[#050714] shadow-md flex items-center justify-center"
                    style={{
                      borderColor: `${skill.color}90`,
                      boxShadow: `0 0 10px ${skill.color}40`,
                    }}
                  >
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: skill.color }} />
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Multiple Pac-Man Agents */}
          {pacmen.map((pac) => (
            <div
              key={pac.id}
              className="absolute z-20 flex items-center justify-center pointer-events-none"
              style={{
                top: `${(pac.r / rows) * 100}%`,
                left: `${(pac.c / cols) * 100}%`,
                width: `${(1 / cols) * 100}%`,
                height: `${(1 / rows) * 100}%`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center p-0.5">
                <svg
                  className="w-full h-full max-w-[26px] max-h-[26px]"
                  style={{
                    fill: pac.color,
                    filter: `drop-shadow(0 0 6px ${pac.color})`,
                    transform: `rotate(${pac.rotation}deg)`,
                  }}
                  viewBox="0 0 100 100"
                >
                  <path d="M 50 50 L 95 20 A 45 45 0 1 0 95 80 Z">
                    <animate
                      attributeName="d"
                      values="M 50 50 L 95 20 A 45 45 0 1 0 95 80 Z; M 50 50 L 98 48 A 45 45 0 1 0 98 52 Z; M 50 50 L 95 20 A 45 45 0 1 0 95 80 Z"
                      dur="0.18s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="text-center font-mono text-[10px] text-white/40 mt-4 border-t border-white/5 pt-3">
          SYSTEM STATUS // GRID MAZE TRAVERSAL &amp; REAL-TIME TECH INGESTION
        </div>
      </div>
    </div>
  );
}