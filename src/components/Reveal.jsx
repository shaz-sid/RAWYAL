import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + rises its children into place once they cross the viewport
 * threshold. `as` lets it render as a section/div/etc, `stagger` lets
 * a group of direct children (e.g. cards) reveal in sequence.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  y = 40,
  duration = 0.9,
  delay = 0,
  stagger = 0,
  start = 'top 85%',
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
