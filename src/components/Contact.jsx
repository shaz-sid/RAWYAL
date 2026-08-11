import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { CONTACT_DATA } from '../data/content.js';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
  });

  const { title, subtitle, email } = CONTACT_DATA;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const apiUrl = import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:5001' : '');
      const response = await fetch(`${apiUrl}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit quote request');
      }

      setSubmitted(true);
      setFormData({ fullName: '', company: '', email: '' });
    } catch (err) {
      if (err.name === 'TypeError' || err.message?.includes('Failed to fetch')) {
        setError('Server connection error. Please ensure the backend server is running on port 5001.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 px-margin-mobile md:px-margin-desktop relative z-10 bg-gradient-to-b from-transparent to-deep-navy"
    >
      <Reveal
        as="div"
        className="max-w-[1000px] mx-auto glass-panel rounded-xl p-8 md:p-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-headline-lg text-ivory-white mb-4">
              {title}
            </h2>
            <p className="font-body text-body-lg text-ivory-white/60 mb-12">
              {subtitle}
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-champagne-gold">mail</span>
                <div>
                  <h5 className="font-body text-label-caps text-ivory-white mb-1">EMAIL</h5>
                  <p className="font-body text-sm text-ivory-white/50">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
              <span className="material-symbols-outlined text-champagne-gold text-5xl">
                check_circle
              </span>
              <h3 className="font-display text-headline-md text-ivory-white">Inquiry sent.</h3>
              <p className="font-body text-body-lg text-ivory-white/60">
                Will reach out to you shortly
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-champagne-gold hover:text-ivory-white transition-colors"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div aria-live="assertive" aria-atomic="true">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-4" role="alert">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="contact-fullName" className="font-body text-[10px] tracking-widest text-ivory-white/50 block mb-2">
                  FULL NAME
                </label>
                <input
                  required
                  id="contact-fullName"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-transparent border-0 border-b border-glass-stroke text-ivory-white pb-2 px-0 transition-colors duration-300 placeholder-ivory-white/30"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="contact-company" className="font-body text-[10px] tracking-widest text-ivory-white/50 block mb-2">
                  COMPANY / BRAND
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full bg-transparent border-0 border-b border-glass-stroke text-ivory-white pb-2 px-0 transition-colors duration-300 placeholder-ivory-white/30"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="font-body text-[10px] tracking-widest text-ivory-white/50 block mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  required
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-transparent border-0 border-b border-glass-stroke text-ivory-white pb-2 px-0 transition-colors duration-300 placeholder-ivory-white/30"
                  disabled={loading}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-[#c9a96e] text-[#050d1a] font-body text-label-caps rounded hover:bg-[#d4b87a] hover:shadow-[0_0_30px_rgba(201,169,110,0.35)] transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'SUBMITTING...' : 'GET A FREE QUOTE'}
                  {!loading && <span className="material-symbols-outlined text-[16px]">arrow_forward</span>}
                </button>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
