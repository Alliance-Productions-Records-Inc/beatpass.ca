import React from 'react';

const FEATURES = [
  { icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-5.55-8h-2.9v3H8l4 4 4-4h-2.55z', title: 'Unlimited Downloads', desc: 'Download as many beats as you want with no limits, no quotas, no restrictions.', gradient: 'linear-gradient(135deg,#8B5CF6,#6366F1)' },
  { icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z', title: 'Commercial Rights', desc: 'Full licensing to release on all streaming platforms worldwide.', gradient: 'linear-gradient(135deg,#3B82F6,#06B6D4)' },
  { icon: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z', title: 'Legal Protection', desc: 'Official license certificates with BeatPassID verification for your releases.', gradient: 'linear-gradient(135deg,#10B981,#14B8A6)' },
  { icon: 'm12 3 .01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z', title: 'HD Quality', desc: 'Studio-quality audio files perfect for professional music production.', gradient: 'linear-gradient(135deg,#F97316,#F59E0B)' },
  { icon: 'm16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z', title: 'Growing Catalog', desc: 'Fresh beats uploaded every day by vetted producers from around the world.', gradient: 'linear-gradient(135deg,#F43F5E,#EC4899)' },
  { icon: 'M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z', title: 'Direct Connection', desc: 'Message producers directly to negotiate exclusives and collaborations.', gradient: 'linear-gradient(135deg,#0EA5E9,#3B82F6)' },
];

const WhatYouGet: React.FC = () => (
  <section className="py-48 md:py-64 relative z-10" aria-labelledby="features-heading">
    <div className="max-w-6xl mx-auto px-16 md:px-24">
      <div className="text-center mb-32 md:mb-48">
        <span className="section-label mb-16 md:mb-20">What You Get</span>
        <h2 id="features-heading" className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">Built for Serious Creators</h2>
        <p className="text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">Quality beats, clear rights, and tools that help you move faster.</p>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden -mx-16 px-16">
        <div className="flex gap-16 overflow-x-auto pb-24 snap-x snap-mandatory" role="region" aria-label="Features">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex-shrink-0 w-[280px] snap-center">
              <div className="h-full p-16 rounded-xl bg-alt border border-divider shadow-sm flex flex-col items-center text-center">
                <div className="mb-16 p-12 rounded-lg text-white shadow-sm" style={{ background: f.gradient }}>
                  <svg className="svg-icon icon-md" viewBox="0 0 24 24"><path d={f.icon} /></svg>
                </div>
                <h3 className="text-lg font-bold mb-10 text-main">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-24">
        {FEATURES.map((f) => (
          <div key={f.title} className="group relative p-20 rounded-xl bg-alt border border-divider hover:border-primary/30 overflow-hidden transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col items-start text-left">
              <div className="mb-16 p-12 rounded-lg text-white shadow-sm group-hover:scale-105 transition-transform duration-300" style={{ background: f.gradient }}>
                <svg className="svg-icon icon-md" viewBox="0 0 24 24"><path d={f.icon} /></svg>
              </div>
              <h3 className="text-sm font-semibold mb-8 text-main group-hover:text-primary transition-colors duration-300">{f.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatYouGet;
