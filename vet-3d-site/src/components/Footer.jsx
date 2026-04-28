export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12 px-8 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-forest-500 to-forest-700 rounded-xl flex items-center justify-center">
              <span>🐾</span>
            </div>
            <div>
              <div className="font-display font-bold text-white">PawCare</div>
              <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">Veterinary Clinic</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Careers', 'Blog'].map(l => (
              <button key={l} className="font-body text-sm text-white/40 hover:text-white/70 transition-colors cursor-hover">
                {l}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-white/25">
            © 2024 PawCare. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}