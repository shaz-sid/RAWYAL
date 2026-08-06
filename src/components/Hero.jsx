import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import EarthGlobe from './EarthGlobe.jsx';
import StarfieldBackground from './StarfieldBackground.jsx';
import SplitText from './SplitText.jsx';
import Reveal from './Reveal.jsx';
import { HERO_DATA } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const globeWrapRef = useRef(null);
  const scrollCueRef = useRef(null);
  const heroTextRef = useRef(null);
  const { headline, subheading, primaryCTA, secondaryCTA, tagline } = HERO_DATA;

  /* ── Page Mount & Return-to-Home Extra Slow Floating Fall Entrance ── */
  useGSAP(
    () => {
      const globeWrap = globeWrapRef.current;
      const introText = introRef.current;
      if (!globeWrap || !introText) return;

      // Master Extra Slow Floating Entrance Timeline (5.5 Seconds Duration)
      const introTl = gsap.timeline({
        defaults: { ease: 'sine.out' },
      });

      // Globe starts at top behind header, rotates and floats down slowly over 5.5s
      const isMobile = window.innerWidth < 640;
      introTl
        .fromTo(
          globeWrap,
          {
            y: isMobile ? -110 : -320,
            scale: isMobile ? 0.75 : 0.65,
            opacity: 0,
            rotate: -30,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 5.5,
            ease: 'power1.out',
          }
        )
        .fromTo(
          introText,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 3.5,
            ease: 'sine.out',
          },
          '-=4.5'
        );

      // Re-trigger entrance animation when scrolling back up to the top of the home page
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        onEnterBack: () => {
          introTl.restart();
        },
      });
    },
    { scope: sectionRef }
  );

  /* ── Scroll‑driven parallax ──────── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < 640;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=140%' : '+=100%',
          scrub: isMobile ? 1.2 : 1,
          pin: false,
          invalidateOnRefresh: true,
        },
      });

      if (introRef.current) {
        tl.to(introRef.current, {
          opacity: 0,
          y: -60,
          ease: 'none',
        }, 0);
      }

      if (globeWrapRef.current) {
        tl.to(globeWrapRef.current, {
          scale: 1.35,
          opacity: 0,
          ease: 'none',
        }, 0);
      }

      if (scrollCueRef.current) {
        tl.to(scrollCueRef.current, {
          opacity: 0,
          ease: 'none',
        }, 0);
      }
    },
    { scope: sectionRef }
  );

  /* ── Hero text reveal ─────────────────── */
  useGSAP(
    () => {
      if (!heroTextRef.current) return;
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroTextRef.current,
            start: 'top 92%',
            once: true,
          },
        }
      );
    },
    { scope: heroTextRef }
  );


  return (
    <>
      {/* ═══ INTRO — Sticky viewport with globe ═══ */}
      <section
        ref={sectionRef}
        id="top"
        className="relative h-[240vh] sm:h-[200vh]"
      >
        <StarfieldBackground className="fixed inset-0 w-full h-full opacity-50 pointer-events-none" />

        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/30 via-transparent to-deep-navy pointer-events-none z-[1]" />

          {/* 3D Globe with 5.5s Extra Slow Fall Entrance Animation */}
          <div
            ref={globeWrapRef}
            className="absolute inset-0 flex items-end justify-center z-[2] will-change-transform pointer-events-none"
            style={{ transform: 'scale(1)', transformOrigin: 'center 60%' }}
          >
            <div className="relative w-full h-[65vh] sm:h-[75vh] translate-y-[10%] sm:translate-y-[15%] flex items-center justify-center">
              <div className="globe-orbit w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] opacity-70">
                <div className="globe-node top-0 left-1/2 -translate-x-1/2" />
                <div className="globe-node bottom-0 left-1/2 -translate-x-1/2" />
                <div className="globe-node top-1/2 left-0 -translate-y-1/2" style={{ animationDelay: '1s' }} />
                <div className="globe-node top-1/2 right-0 -translate-y-1/2" style={{ animationDelay: '2s' }} />
              </div>
              <EarthGlobe className="w-full h-full" />
            </div>
          </div>

          {/* Text overlay */}
          <div
            ref={introRef}
            className="relative z-[3] flex flex-col items-center text-center px-6 will-change-transform"
          >
            <img
              src="/logo.png"
              alt="The Rawyal India"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            />

            <h1
              className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-[110px] font-semibold gold-text-gradient leading-none"
              style={{ letterSpacing: '0.18em', wordSpacing: '0.3em' }}
            >
              THE RAWYAL
            </h1>

            <p
              className="font-body text-ivory-white/40 mt-5 sm:mt-6 mb-6"
              style={{ letterSpacing: '0.35em', fontSize: '11px' }}
            >
              {tagline}
            </p>

            <a
              href="#contact"
              className="btn-pill-quote mt-2"
            >
              Get a Free Quote
            </a>
          </div>

          <div
            ref={scrollCueRef}
            className="absolute bottom-8 sm:bottom-10 z-[4] flex flex-col items-center will-change-transform"
          >
            <span className="font-body text-[10px] text-champagne-gold/60 tracking-[0.25em] uppercase">
              Explore
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-champagne-gold/50 to-transparent mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══ HERO TEXT — revealed after scrolling past intro ═══ */}
      <section className="relative z-10 py-20 sm:py-28 px-margin-mobile md:px-margin-desktop">
        <div ref={heroTextRef} className="max-w-5xl mx-auto text-center will-change-transform">
          <SplitText
            text={headline}
            tag="h2"
            className="font-display text-4xl sm:text-6xl md:text-[80px] leading-[1.1] gold-text-gradient mb-8"
            splitType="words"
            delay={80}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />

          <Reveal delay={0.3}>
            <p className="font-body text-body-lg text-ivory-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              {subheading}
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="#contact"
                className="btn-pill-quote"
              >
                {primaryCTA}
              </a>
              <a
                href="#why-rawyal"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-ivory-white border border-champagne-gold/40 font-body text-label-caps rounded-full hover:border-champagne-gold hover:bg-champagne-gold/10 transition-all duration-300"
              >
                {secondaryCTA}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
