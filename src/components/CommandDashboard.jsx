import { useState } from 'react';
import { COMMAND_DASHBOARD_DATA } from '../data/content.js';

export default function CommandDashboard() {
  const [activeTab, setActiveTab] = useState(COMMAND_DASHBOARD_DATA[0].id);
  const activeMode = COMMAND_DASHBOARD_DATA.find((m) => m.id === activeTab) || COMMAND_DASHBOARD_DATA[0];

  return (
    <section className="py-24 md:py-28 px-margin-mobile md:px-margin-desktop relative z-10">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-6xl text-ivory-white">
            Operations
          </h2>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-glass-stroke max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-10 pb-6 border-b border-glass-stroke">
            {COMMAND_DASHBOARD_DATA.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveTab(mode.id)}
                className={`px-6 py-3 rounded-lg font-body text-label-caps transition-all duration-300 ${
                  activeTab === mode.id
                    ? 'bg-champagne-gold text-deep-navy shadow-[0_0_25px_rgba(201,169,110,0.35)] font-bold'
                    : 'bg-surface/50 text-ivory-white/70 hover:text-champagne-gold border border-glass-stroke'
                }`}
              >
                {mode.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-ivory-white mb-3 font-semibold text-center sm:text-left">
              {activeMode.name}
            </h3>
            <p className="font-body text-body-lg text-ivory-white/70 mb-8 max-w-3xl text-center sm:text-left">
              {activeMode.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {activeMode.metrics.map((m) => (
                <div key={m.label} className="bg-surface/60 p-5 rounded-xl border border-glass-stroke/60 text-center sm:text-left">
                  <span className="font-body text-[10px] text-champagne-gold/70 tracking-widest uppercase block mb-1">
                    {m.label}
                  </span>
                  <span className="font-display text-xl sm:text-2xl text-ivory-white font-semibold">
                    {m.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
