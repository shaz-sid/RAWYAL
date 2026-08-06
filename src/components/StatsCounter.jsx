import { useState, useEffect, useRef } from 'react';
import { STATS_DATA } from '../data/content.js';

function CountUp({ end, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = progress * end;
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [started, end]);

  const displayValue = end % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-bold gold-text-gradient">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-20 border-y border-glass-stroke bg-deep-navy/80 relative z-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS_DATA.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 p-6 glass-panel rounded-xl">
              <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <span className="font-body text-[11px] text-champagne-gold/70 tracking-[0.2em] uppercase mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
