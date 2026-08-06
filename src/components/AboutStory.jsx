import Reveal from './Reveal.jsx';
import { ABOUT_STORY_DATA } from '../data/content.js';

export default function AboutStory() {
  const { sectionTitle, headline, intro, founder, pillars } = ABOUT_STORY_DATA;

  return (
    <section id="story" className="py-32 px-margin-mobile md:px-margin-desktop relative z-10">
      <div className="max-w-container-max mx-auto">
        <Reveal className="text-center mb-16">
          <span className="font-body text-label-caps text-champagne-gold tracking-[0.25em] uppercase mb-4 block">
            {sectionTitle}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-ivory-white mb-6">
            {headline}
          </h2>
          <p className="font-body text-lg sm:text-xl text-ivory-white/80 max-w-3xl mx-auto leading-relaxed">
            {intro}
          </p>
        </Reveal>

        {/* Side-by-Side Pillars: "Started in Jaipur" and "Plutus Global Alliance" */}
        <Reveal
          as="div"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          stagger={0.15}
        >
          {pillars.map((p) => (
            <div
              key={p.title}
              className="glass-panel p-8 sm:p-10 rounded-2xl border border-glass-stroke/80 flex flex-col justify-between h-full group hover:border-champagne-gold/50 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="w-14 h-14 rounded-full border border-champagne-gold/40 flex items-center justify-center mb-6 bg-deep-navy/60 group-hover:border-champagne-gold group-hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] transition-all duration-300">
                  {p.icon.endsWith('.png') || p.icon.endsWith('.svg') || p.icon.startsWith('/') ? (
                    <img
                      src={p.icon}
                      alt={p.title}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-champagne-gold text-3xl">
                      {p.icon}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl text-ivory-white mb-4 font-semibold">
                  {p.title}
                </h3>
                <p className="font-body text-base text-ivory-white/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Dedicated Centered Founder Section for Aanchal Middha */}
        {founder && (
          <Reveal>
            <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-glass-stroke text-center max-w-3xl mx-auto flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Soft background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-champagne-gold/10 rounded-full blur-3xl pointer-events-none" />

              {/* Founder Photo Container */}
              <div className="relative mb-6">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-champagne-gold via-[#d4b87a] to-champagne-gold shadow-[0_0_35px_rgba(201,169,110,0.35)]">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top rounded-full bg-deep-navy"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#c9a96e] text-[#050d1a] px-4 py-1 rounded-full text-[10px] font-body tracking-widest font-bold uppercase shadow-md whitespace-nowrap">
                  FOUNDER & MANAGING DIRECTOR
                </div>
              </div>

              {/* Founder Details */}
              <div className="mt-2 text-center max-w-2xl mx-auto">
                <h3 className="font-display text-3xl sm:text-4xl text-ivory-white font-semibold mb-4 gold-text-gradient">
                  {founder.name}
                </h3>
                <blockquote className="font-body text-lg sm:text-xl text-ivory-white/90 leading-relaxed italic">
                  &ldquo;{founder.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
