// FILE: src/components/sections/Footer.tsx
export function Footer() {
  return (
    <footer className="w-full bg-[#030308] py-12 px-6 border-t border-white/5 font-mono text-xs text-white/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>PORTFOLIO OS // BUILD 2026.4</span>
        </div>

        <div>
          <span>DESIGNED & ENGINEERED BY CREATIVE ARCHITECT</span>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GITHUB
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            LINKEDIN
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            TWITTER / X
          </a>
        </div>
      </div>
    </footer>
  );
}