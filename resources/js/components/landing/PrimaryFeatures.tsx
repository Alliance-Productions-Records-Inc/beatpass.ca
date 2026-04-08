import React from 'react';

const STEPS = [
  { icon: 'M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l7.03-6.24c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z', title: 'Subscribe Once', desc: 'One plan replaces every per-beat purchase. Download what fits, license it, and move.', gradient: 'linear-gradient(135deg,#8B5CF6,#6366F1)' },
  { icon: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z', title: 'License Instantly', desc: 'Every download generates a BeatPassID certificate. Your proof of rights, ready for any platform.', gradient: 'linear-gradient(135deg,#10B981,#14B8A6)' },
  { icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z', title: 'Release Everywhere', desc: 'Commercial licensing for all platforms. Your masters, your releases, your revenue.', gradient: 'linear-gradient(135deg,#3B82F6,#06B6D4)' },
];

const PrimaryFeatures: React.FC = () => (
  <section className="py-48 md:py-64 relative z-10" aria-labelledby="primary-features-heading">
    <div className="max-w-6xl mx-auto px-16 md:px-24">
      <h2 id="primary-features-heading" className="sr-only">How It Works</h2>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden -mx-16 px-16">
        <div className="flex gap-16 overflow-x-auto pb-24 snap-x snap-mandatory">
          {STEPS.map((s) => (
            <div key={s.title} className="flex-shrink-0 w-[280px] snap-center">
              <div className="h-full p-16 rounded-xl bg-alt border border-divider shadow-sm flex flex-col items-center text-center">
                <div className="mb-16 p-12 rounded-lg text-white shadow-sm" style={{ background: s.gradient }}>
                  <svg className="svg-icon icon-md" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                </div>
                <h3 className="text-lg font-bold mb-8 text-main">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-24">
        {STEPS.map((s) => (
          <div key={s.title} className="group relative p-20 rounded-xl bg-alt border border-divider hover:border-primary/30 overflow-hidden transition-all duration-300 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-16 p-12 rounded-lg text-white shadow-sm mx-auto w-fit group-hover:scale-105 transition-transform duration-300" style={{ background: s.gradient }}>
                <svg className="svg-icon icon-md" viewBox="0 0 24 24"><path d={s.icon} /></svg>
              </div>
              <h3 className="text-sm font-semibold mb-8 text-main group-hover:text-primary transition-colors duration-300">{s.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PrimaryFeatures;
