// FILE: src/components/sections/Footer.tsx
export function Footer() {
  return (
    <footer className="w-full bg-[#030308] py-12 px-6 border-t border-white/5 font-mono text-xs text-white/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#00F58C] animate-ping" />
          <span>AHMED SHAHZAD // PORTFOLIO SYSTEM</span>
        </div>

        <div>
          <span>"SIMPLICITY IS PREREQUISITE FOR RELIABILITY."</span>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/ahmed-shehzad1"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#00F58C] transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-shahzad-46711a405"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#00F58C] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:mrahmedshahzad321@gmail.com"
            className="hover:text-[#00F58C] transition-colors"
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}