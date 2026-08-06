import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'OUR STORY', href: '#story' },
  { label: 'WHY RAWYAL', href: '#why-rawyal' },
  { label: 'WHAT WE DO', href: '#what-we-do' },
  { label: 'INFRASTRUCTURE', href: '#infrastructure' },
  { label: 'AURORA AI', href: '#aurora' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header({ onViewChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-glass-fill backdrop-blur-xl border-b border-glass-stroke shadow-xl shadow-deep-navy/40">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <a href="#top" onClick={() => onViewChange?.('home')} className="flex items-center gap-3 group py-2">
          <img
            src="/logo.png"
            alt="The Rawyal India"
            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <nav className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => onViewChange?.('home')}
              className="font-body text-label-caps text-ivory-white/80 hover:text-champagne-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={() => onViewChange?.('home')}
            className="px-6 py-3 bg-[#c9a96e] text-[#050d1a] font-body text-[11px] tracking-widest rounded hover:bg-[#d4b87a] hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] transition-all duration-300 font-bold uppercase"
          >
            GET STARTED
          </a>
        </div>

        <button
          className="md:hidden text-champagne-gold p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="material-symbols-outlined"
          >
            {menuOpen ? 'close' : 'menu'}
          </motion.span>
        </button>
      </div>

      {/* Animated mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="md:hidden overflow-hidden bg-deep-navy/95 backdrop-blur-xl border-t border-glass-stroke"
          >
            <div className="flex flex-col px-margin-mobile py-6 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    onViewChange?.('home');
                    setMenuOpen(false);
                  }}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                  className="font-body text-label-caps text-ivory-white/80 hover:text-champagne-gold py-3 border-b border-glass-stroke/60 transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={() => {
                    onViewChange?.('home');
                    setMenuOpen(false);
                  }}
                  className="block text-center w-full px-6 py-4 bg-[#c9a96e] text-[#050d1a] font-body text-label-caps rounded font-bold"
                >
                  GET STARTED
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
