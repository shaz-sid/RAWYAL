import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Single accordion row. Height + opacity + a rotating chevron animate
 * with a spring easing so the drop-down never feels linear or abrupt.
 */
function AccordionItem({ index, question, answer, isOpen, onToggle }) {
  const headingId = `accordion-heading-${index}`;
  const panelId = `accordion-panel-${index}`;

  return (
    <div className="border-b border-glass-stroke">
      <button
        id={headingId}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="font-display text-headline-md text-ivory-white group-hover:text-champagne-gold transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="material-symbols-outlined shrink-0 text-champagne-gold text-[28px]"
          aria-hidden="true"
        >
          add
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="content"
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', stiffness: 280, damping: 32 },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 font-body text-body-lg text-ivory-white/60">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]));

  const handleToggle = (index) => {
    setOpenIndexes((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set();
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          index={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndexes.has(index)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
