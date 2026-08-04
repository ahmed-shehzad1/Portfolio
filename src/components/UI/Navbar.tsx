// FILE: src/components/ui/Navbar.tsx
import { useState, useEffect } from 'react';
import { useSystemStore } from '../../store/useSystemStore';
import { MagneticButton } from './MagneticButton';

const NAV_ITEMS = [
  { id: 'hero', label: '01 // SYSTEM' },
  { id: 'projects', label: '02 // WORKS' },
  { id: 'skills', label: '03 // STACK' },
  { id: 'capabilities', label: '04 // ARCH' },
  { id: 'contact', label: '05 // TRANSMIT' },
];

export function Navbar() {
  const { activeSection, soundEnabled, toggleSound } = useSystemStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-[#030308]/80 backdrop-blur-xl border-b border-white/10' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo / Identity */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#00F58C] p-[1px] transition-transform duration-500 group-hover:scale-110">
            <div className="w-full h-full bg-[#030308] rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-[#00F58C]">
              AS
            </div>
          </div>
          <div>
            <span className="block font-mono text-xs font-bold tracking-widest text-white group-hover:text-[#00F58C] transition-colors">
              AHMED SHEHZAD
            </span>
            <span className="block font-mono text-[9px] text-white/40 tracking-wider">
              SYSTEMS ARCHITECT
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border-white/10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 rounded-full ${
                  isActive ? 'text-[#00F58C]' : 'text-white/60 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-[#00F58C]/10 rounded-full border border-[#00F58C]/30 -z-10 animate-pulse" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions HUD */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/60 hover:text-[#00F58C] glass-panel px-3 py-1.5 rounded-md border-white/10 transition-colors"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                soundEnabled ? 'bg-[#00F58C] shadow-[0_0_8px_#00F58C]' : 'bg-white/20'
              }`}
            />
            {soundEnabled ? 'AUDIO // ON' : 'AUDIO // MUTED'}
          </button>

          <MagneticButton strength={30} radius={80}>
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#030308] bg-[#00F58C] hover:bg-white rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,245,140,0.4)]"
            >
              HIRE ME
            </button>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}