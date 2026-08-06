import { useEffect, useRef } from 'react';
import Reveal from './Reveal.jsx';
import './WhatWeDo.css';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'We Build the Foundation',
    desc: 'Store setup, brand groundwork — the starting point for every entrepreneur we work with, before anything scales.',
  },
  {
    num: '02',
    title: 'We Open the Market',
    desc: 'Expansion into new marketplaces and regions once the foundation is live.',
  },
  {
    num: '03',
    title: 'We Put It on the Ground',
    desc: 'Offices and warehouses across key global markets provide the physical infrastructure that powers seamless fulfillment and supports scalable e-commerce operations.',
  },
  {
    num: '04',
    title: 'We Optimize With Aurora AI',
    desc: 'Inventory forecasting, pricing strategy, keyword research, PPC — the AI platform working continuously in the background.',
  },
  {
    num: '05',
    title: 'We Stay in the Room',
    desc: 'Ongoing strategic guidance and mentorship — not a one-time handoff.',
  },
  {
    num: '06',
    title: 'Your Growth Is the Outcome',
  },
];

export default function WhatWeDo() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const itemsRef = useRef([]);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = false;
    let rafId = null;

    const handleAnimation = () => {
      if (!isVisible) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Scroll-based progress calculation
      const triggerTop = viewportHeight * 0.55;
      const currentScroll = triggerTop - rect.top;
      const totalHeight = rect.height;

      // Reach 100% progress slightly before the absolute bottom
      const activeHeight = totalHeight - 120;
      let target = currentScroll / activeHeight;
      target = Math.max(0, Math.min(1, target));
      targetProgress.current = target;

      // Smooth Physics LERP
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;

      // Apply transform directly to DOM
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${currentProgress.current})`;
      }

      // Check vertical coordinate of each milestone to toggle visibility
      const progressHeight = totalHeight * currentProgress.current;
      itemsRef.current.forEach((item) => {
        if (!item) return;
        if (progressHeight >= item.offsetTop + 10) {
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
        }
      });

      rafId = requestAnimationFrame(handleAnimation);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            rafId = requestAnimationFrame(handleAnimation);
          } else {
            if (rafId) cancelAnimationFrame(rafId);
          }
        });
      },
      { threshold: 0.02, rootMargin: '150px 0px 150px 0px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="what-we-do" className="py-32 px-margin-mobile md:px-margin-desktop relative z-10 overflow-hidden">
      <div className="max-w-container-max mx-auto relative">
        
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <span className="font-body text-label-caps text-champagne-gold tracking-[0.25em] uppercase mb-4 block">
            HOW WE WORK
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-ivory-white font-semibold">
            From First Sale to Global Scale
          </h2>
        </Reveal>

        {/* Timeline container */}
        <div ref={containerRef} className="timeline-container relative max-w-4xl mx-auto">
          
          {/* Vertical Ledger Spine Line */}
          <div className="timeline__line">
            <div ref={progressRef} className="timeline__progress" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.num}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className="timeline__item relative flex flex-col md:grid md:grid-cols-2 items-start group"
                >
                  {/* Timeline Marker Node (Always centered exactly on the spine line and title baseline) */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-[20px] -translate-y-1/2 z-10 pointer-events-none">
                    <div className="timeline__marker" />
                  </div>

                  {/* Left Column Content (Even Steps) */}
                  <div className={`w-full md:col-start-1 ${isEven ? 'block' : 'hidden md:block md:invisible md:pointer-events-none'}`}>
                    {isEven && (
                      <div className="timeline__card-wrapper pl-12 pr-0 md:pl-0 md:pr-8 md:text-right">
                        <div className="py-1">
                          <h3 className={`font-display text-xl sm:text-2xl text-ivory-white group-hover:text-champagne-gold transition-colors duration-300 font-semibold ${step.desc ? 'mb-2' : 'mb-0'}`}>
                            {step.title}
                          </h3>
                          {step.desc && (
                            <p className="font-body text-base text-ivory-white/70 leading-relaxed">
                              {step.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column Content (Odd Steps) */}
                  <div className={`w-full ${!isEven ? 'block md:col-start-2' : 'hidden md:block md:invisible md:pointer-events-none'}`}>
                    {!isEven && (
                      <div className="timeline__card-wrapper pl-12 pr-0 md:pl-8 md:pr-0 md:text-left">
                        <div className="py-1">
                          <h3 className={`font-display text-xl sm:text-2xl text-ivory-white group-hover:text-champagne-gold transition-colors duration-300 font-semibold ${step.desc ? 'mb-2' : 'mb-0'}`}>
                            {step.title}
                          </h3>
                          {step.desc && (
                            <p className="font-body text-base text-ivory-white/70 leading-relaxed">
                              {step.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
