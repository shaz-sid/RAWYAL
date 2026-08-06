import { useRef } from 'react';
import Reveal from './Reveal.jsx';
import ScrollStack, { ScrollStackItem } from './ScrollStack.jsx';
import { SERVICES_DATA } from '../data/content.js';

function ServiceCard({ icon, title, copy }) {
  const cardRef = useRef(null);

  return (
    <div ref={cardRef} className="flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-full border border-champagne-gold/40 flex items-center justify-center bg-deep-navy/60 shadow-[0_0_20px_rgba(216,185,121,0.15)]">
            <span className="material-symbols-outlined text-champagne-gold text-2xl">{icon}</span>
          </div>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-ivory-white mb-4 leading-tight">{title}</h3>
        <p className="font-body text-body-lg text-ivory-white/80 max-w-2xl leading-relaxed">{copy}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="why-rawyal" className="py-32 px-margin-mobile md:px-margin-desktop relative z-10">
      <div className="max-w-container-max mx-auto">
        <Reveal className="text-center mb-16">
          <span className="font-body text-label-caps text-champagne-gold tracking-[0.25em] uppercase mb-4 block">
            Why Choose Rawyal
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-ivory-white">Pillars of Excellence</h2>
        </Reveal>

        {/* Enhanced ScrollStack Component Integration */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={48}
          stackPosition="30%"
          scaleEndPosition="15%"
          baseScale={0.90}
          blurAmount={1.5}
        >
          {SERVICES_DATA.map((s) => (
            <ScrollStackItem
              key={s.title}
              itemClassName="glass-panel p-6 sm:p-12 rounded-2xl border border-glass-stroke/90 backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300"
            >
              <ServiceCard {...s} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
