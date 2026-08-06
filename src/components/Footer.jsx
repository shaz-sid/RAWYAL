export default function Footer({ onViewChange }) {
  return (
    <footer className="relative w-full py-unit-xl bg-deep-navy border-t border-glass-stroke z-10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center text-center gap-4">
        <a href="#top" className="inline-block">
          <img
            src="/logo.png"
            alt="The Rawyal India"
            className="h-12 w-auto object-contain"
          />
        </a>
        <p className="font-body text-sm text-ivory-white/50 max-w-md mt-1">
          Crafting global e-commerce empires with precision, luxury, and unyielding ambition.
        </p>
      </div>
      <div className="mt-12 pt-8 border-t border-glass-stroke px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <span className="font-body text-[10px] text-ivory-white/40">
            © {new Date().getFullYear()} THE RAWYAL INDIA. ALL RIGHTS RESERVED. CRAFTED IN JAIPUR FOR THE WORLD.
          </span>
          <button
            onClick={() => {
              onViewChange?.('policies');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-body text-[10px] text-ivory-white/40 hover:text-champagne-gold transition-colors duration-300 underline underline-offset-2 uppercase tracking-wider font-semibold"
          >
            Terms & Policies
          </button>
        </div>
        <div className="flex gap-4">
          <a className="text-ivory-white/40 hover:text-champagne-gold transition-colors duration-300 flex items-center justify-center" href="#top" title="Scroll to Top">
            <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
          </a>
          <a className="text-ivory-white/40 hover:text-champagne-gold transition-colors duration-300 flex items-center justify-center" href="#contact" title="Contact Us">
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
