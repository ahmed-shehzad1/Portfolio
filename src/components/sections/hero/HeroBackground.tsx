import { useEffect, useRef } from 'react';
import { MagneticButton } from '../../ui/MagneticButton';

function CyberCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate floating mesh nodes
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Cyber Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 48;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render Nodes & Connecting Lines
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#00F58C';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.strokeStyle = `rgba(0, 245, 140, ${0.18 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}

export function HeroBackground() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Animated Canvas Layer */}
      <CyberCanvasBackground />

      {/* Radial Gradient Vignette Layer */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 flex flex-col justify-center">
        {/* Top Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/50 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00F58C] animate-pulse shadow-[0_0_8px_#00F58C]" />
            <span>STATUS // READY TO ENGINEER</span>
          </div>
          <span className="hidden sm:inline text-white/40">
            QUOTE // "THERE IS NOTHING I CANNOT LEARN."
          </span>
        </div>

        {/* Main Hero Body */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F58C] glass-panel px-3.5 py-1.5 rounded-full border border-white/10 mb-6">
            <span>FULL STACK &amp; SYSTEMS ARCHITECT</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6">
            AHMED <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(0,245,140,0.8)]">
              SHEHZAD
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl font-sans mb-10 leading-relaxed">
            Specializing in Turborepo monorepos, multi-provider AI routing (Gemini, Groq, Claude, OpenAI), Prisma ORM, and high-concurrency Node.js backends.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <MagneticButton strength={20}>
              <button
                onClick={() => scrollTo('projects')}
                className="px-7 py-4 bg-[#00F58C] text-[#030308] font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,245,140,0.3)] flex items-center gap-2 cursor-pointer"
              >
                <span>INSPECT SYSTEM WORKS</span>
                <span>&rarr;</span>
              </button>
            </MagneticButton>

            <MagneticButton strength={15}>
              <button
                onClick={() => scrollTo('contact')}
                className="px-7 py-4 glass-panel text-white font-mono text-xs uppercase tracking-wider rounded-xl hover:border-white/30 transition-all cursor-pointer flex items-center gap-2 border border-white/10 bg-white/5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#00F58C]" />
                <span>INITIATE CONTACT</span>
              </button>
            </MagneticButton>
          </div>

          {/* Core Stack Divider & Badges */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <span className="text-white/40 uppercase tracking-widest text-[10px] mr-2 w-full sm:w-auto mb-1 sm:mb-0">
              // CORE STACK:
            </span>
            {['NEXT.JS', 'TURBOREPO', 'NODE.JS', 'PRISMA', 'MULTI-AI ROUTING'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/70 hover:border-[#00F58C]/40 hover:text-[#00F58C] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}