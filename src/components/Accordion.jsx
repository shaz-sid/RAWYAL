import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-[800px] mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="glass-panel rounded-xl border border-glass-stroke/60 overflow-hidden transition-colors duration-300"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display text-xl text-ivory-white font-medium hover:text-champagne-gold transition-colors duration-300"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span
                className={`material-symbols-outlined text-champagne-gold transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 font-body text-base text-ivory-white/70 leading-relaxed border-t border-glass-stroke/30">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
