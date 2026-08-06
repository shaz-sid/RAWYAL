import Reveal from './Reveal.jsx';
import Accordion from './Accordion.jsx';
import { FAQ_DATA } from '../data/content.js';

export default function FAQ() {
  return (
    <section id="faq" className="py-32 px-margin-mobile md:px-margin-desktop relative z-10">
      <div className="max-w-[800px] mx-auto">
        <Reveal className="text-center mb-16">
          <span className="font-body text-label-caps text-champagne-gold tracking-[0.2em] uppercase mb-4 block">
            Questions & Insights
          </span>
          <h2 className="font-display text-headline-lg text-ivory-white">Before You Reach Out</h2>
        </Reveal>

        <Reveal>
          <Accordion items={FAQ_DATA} />
        </Reveal>
      </div>
    </section>
  );
}
