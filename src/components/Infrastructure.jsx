import ShaderBackground from './ShaderBackground.jsx';
import RotatingGlobe from './RotatingGlobe.jsx';
import Reveal from './Reveal.jsx';

const ROUTES = [
  {
    icon: 'warehouse',
    title: 'US Warehousing & Fulfillment',
    copy: 'Offices and warehouses across the United States, supporting sellers as they scale into American marketplaces.',
  },
  {
    icon: 'explore',
    title: 'Jaipur Origin, Global Ambition',
    copy: 'Founded over a decade ago in Jaipur, Rawyal has grown from a single export venture into an international trade partner.',
  },
];

export default function Infrastructure() {
  return (
    <section
      id="infrastructure"
      className="relative py-16 sm:py-32 overflow-hidden bg-deep-navy/50 border-y border-glass-stroke"
    >
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <ShaderBackground className="w-full h-full" />
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
        <Reveal as="div" className="md:w-1/2" y={30}>
          <span className="font-body text-label-caps text-champagne-gold tracking-[0.2em] uppercase mb-4 block">
            Logistics Network
          </span>
          <h2 className="font-display text-headline-lg text-ivory-white mb-6">
            Jaipur to Global Markets
          </h2>
          <p className="font-body text-body-lg text-ivory-white/70 mb-8 leading-relaxed">
            Rawyal bridges Indian entrepreneurs with global marketplaces through advanced fulfillment capabilities, international logistics, and scalable infrastructure designed for cross-border growth.
          </p>
          <ul className="space-y-4">
            {ROUTES.map((r) => (
              <li key={r.title} className="flex items-start gap-4 pb-4 border-b border-glass-stroke">
                <span className="material-symbols-outlined text-champagne-gold mt-1">{r.icon}</span>
                <div>
                  <h4 className="font-display text-[20px] text-ivory-white">{r.title}</h4>
                  <p className="text-ivory-white/50 text-sm mt-1">{r.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Seamless, Borderless 3D Globe View (Increased Size) */}
        <Reveal as="div" className="md:w-1/2 w-full h-[380px] sm:h-[480px] md:h-[620px] relative flex items-center justify-center" y={30} delay={0.15}>
          <div className="w-full h-full relative overflow-visible flex items-center justify-center">
            {/* 3D Earth Globe with Global Flight-Path Trajectories */}
            <RotatingGlobe className="w-full h-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
