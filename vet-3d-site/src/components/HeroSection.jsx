import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      /* 
         pt-24 md:pt-32: Adds padding to the top so content doesn't touch the navbar.
         items-center: Keeps the text vertically centered in the remaining space.
      */
      className="relative min-h-screen flex items-center justify-start px-6 md:px-20 pt-24 md:pt-32 overflow-hidden"
    >
      {/* 
          Background Overlay: 
          Deepens the left side to ensure text pops against the 3D Dog/Background 
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none z-0" />

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="content-overlay max-w-5xl relative z-10 w-full"
      >
        {/* Decorative Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-forest-500/10 blur-[150px] rounded-full -z-10" />

        {/* Badge - Professional Glassmorphism */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-400"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-forest-300 tracking-[0.25em] uppercase font-semibold">
            Trusted since 2008
          </span>
        </motion.div>

        {/* Headline - Larger scale for professional impact */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-8 tracking-tighter"
        >
          <span className="text-white drop-shadow-md">Your pet's</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-forest-400 via-emerald-400 to-teal-300">
            health
          </span>
          <br />
          <span className="text-white/30 italic font-light text-3xl sm:text-5xl md:text-7xl block mt-4">
            is our story.
          </span>
        </motion.h1>

        {/* Subtitle - Optimized line-height and width */}
        <motion.p
          variants={fadeUp}
          className="font-body text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-xl border-l-2 border-forest-500/30 pl-6"
        >
          Expert veterinary care with compassion and precision. 
          We treat every animal as family — because they are.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-5"
        >
          <button
            className="group relative px-10 py-4 bg-forest-500 hover:bg-forest-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-forest-500/20"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Visit 
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            className="px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-medium hover:bg-white/10 transition-all rounded-xl"
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Services
          </button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-10 md:gap-20 mt-20 pt-10 border-t border-white/10"
        >
          {[
            { num: '15+', label: 'Years of Care' },
            { num: '8K+', label: 'Happy Pets' },
            { num: '12', label: 'Specialists' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.num}
              </div>
              <div className="text-[10px] md:text-xs text-forest-400 uppercase tracking-[0.2em] mt-1 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modern Vertical Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent relative">
          <motion.div 
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-forest-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}