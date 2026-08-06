import { useState } from 'react';
import SplitText from './SplitText.jsx';
import Reveal from './Reveal.jsx';
import { AURORA_DATA } from '../data/content.js';

export default function Aurora() {
  const { title, blocks } = AURORA_DATA;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="aurora"
      className="py-24 md:py-28 px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne-gold/5 rounded-full blur-[100px] z-0" />

      <SplitText
        text={title}
        tag="h2"
        className="font-display text-[48px] sm:text-[64px] md:text-[80px] text-ivory-white font-light tracking-tight mb-12 relative z-10"
        splitType="words"
        delay={120}
        from={{ opacity: 0, y: 30, scale: 0.9 }}
        to={{ opacity: 1, y: 0, scale: 1 }}
      />

      <Reveal delay={0.3} className="w-full max-w-4xl mx-auto mb-16 relative z-10 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {blocks.map((block) => (
            <div key={block.title} className="py-2">
              <h3 className="font-display text-xl sm:text-2xl text-champagne-gold mb-4 font-semibold">
                {block.title}
              </h3>
              <p className="font-body text-base text-ivory-white/70 leading-relaxed">
                {block.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ═══ VIDEO PLACEHOLDER CONTAINER (Clean closing element of the section) ═══ */}
      <Reveal delay={0.4} className="w-full max-w-4xl mx-auto relative z-10">
        <div className="glass-panel rounded-2xl border border-glass-stroke shadow-2xl overflow-hidden relative aspect-video flex items-center justify-center group bg-deep-navy/90">
          {/* Ambient Background Glow for Video Frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-deep-navy via-royal-blue/30 to-deep-navy opacity-80" />

          {/* AI Radar & Pulse Waveform Loading Animation */}
          <div className="relative z-10 flex flex-col items-center justify-center p-8">
            {/* Pulsing Sonar Ring & Play Button */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full border border-champagne-gold/30 animate-ping opacity-40" />
              <div className="absolute w-32 h-32 rounded-full border border-champagne-gold/15 animate-spin-slow" />
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label="Play Aurora AI Demo Preview"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c9a96e] text-[#050d1a] flex items-center justify-center shadow-[0_0_40px_rgba(201,169,110,0.4)] transition-all duration-300 transform group-hover:scale-110"
              >
                <span className="material-symbols-outlined text-3xl sm:text-4xl pl-1">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            {/* Coming Soon & Status Badges */}
            <div className="glass-panel py-1.5 px-5 rounded-full border border-champagne-gold/30 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-champagne-gold animate-pulse" />
              <span className="font-body text-[11px] text-champagne-gold tracking-[0.2em] uppercase font-semibold">
                COMING SOON · VIDEO TEASER
              </span>
            </div>

            <p className="font-body text-xs text-ivory-white/50 tracking-wider">
              {isPlaying ? 'Initializing AI Stream...' : 'Click to preview interactive engine concepts'}
            </p>

            {/* AI Status Telemetry Overlay */}
            <div className="absolute bottom-4 left-6 hidden sm:flex items-center gap-2 text-[10px] font-mono text-ivory-white/40 tracking-widest">
              <span>AURORA ENGINE v4.0</span>
              <span>·</span>
              <span className="text-champagne-gold">BETA READY</span>
            </div>

            <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 text-[10px] font-mono text-ivory-white/40 tracking-widest">
              <span>1080P HD STREAM</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
