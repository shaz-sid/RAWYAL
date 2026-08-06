import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text = '',
  className = '',
  delay = 60,
  duration = 0.9,
  ease = 'power3.out',
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  textAlign = 'center',
  tag = 'h2',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current || !text) return;
      const targets = containerRef.current.querySelectorAll('.split-word');
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            once: true,
          },
          onComplete: () => {
            onLetterAnimationComplete?.();
          }
        }
      );
    },
    { scope: containerRef, dependencies: [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to)] }
  );

  const Tag = tag || 'h2';
  const words = text.split(' ');
  const isGoldGradient = className.includes('gold-text-gradient');
  const parentClassName = className.replace(/\bgold-text-gradient\b/g, '').trim();

  return (
    <Tag
      ref={containerRef}
      style={{ textAlign }}
      className={`block w-full max-w-full ${parentClassName}`}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className={`split-word inline-block whitespace-nowrap mr-[0.25em] last:mr-0 align-baseline will-change-transform ${
            isGoldGradient ? 'gold-text-gradient' : ''
          }`}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
