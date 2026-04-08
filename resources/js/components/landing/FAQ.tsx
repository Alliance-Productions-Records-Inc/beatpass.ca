import React, { useState, useCallback } from 'react';

const FAQ_ITEMS = [
  { q: 'What is BeatPass?', a: 'BeatPass is a subscription platform where artists download unlimited beats with commercial licensing, and producers upload catalogs to earn recurring revenue. One plan, clear rights, no per-beat purchases.' },
  { q: 'Is BeatPass free to use?', a: 'Streaming and previewing the full catalog is free. To download beats and receive commercial licenses, you need a paid subscription. Plans start at an affordable monthly rate with no long-term commitment.' },
  { q: 'How is BeatPass different from other beat platforms?', a: 'Most platforms charge per beat. BeatPass gives you unlimited downloads with one subscription. Every producer is manually vetted for quality, every license includes BeatPassID verification, and producers keep full ownership of their work.' },
  { q: 'Can I use downloaded beats in commercial projects?', a: 'Yes. Every download includes a non-exclusive commercial license. You can release on Spotify, Apple Music, YouTube, and all other platforms. For streaming royalty splits, negotiate directly with the producer.' },
  { q: 'Do I keep my licenses if I cancel?', a: 'Every license obtained during your active subscription is permanent. Cancel anytime and continue releasing and monetizing songs made with those beats. Your rights never expire.' },
  { q: 'How do I become a producer on BeatPass?', a: 'Apply through the Producer Program. Every submission is reviewed for audio quality, originality, and production value. Once approved, upload your catalog immediately and start earning from subscriber streams.' },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = useCallback((idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <section className="py-48 md:py-64 relative z-10" aria-labelledby="landing-faq-heading">
      <div className="max-w-6xl mx-auto px-16 md:px-24">
        <div className="text-center mb-32 md:mb-48">
          <span className="section-label section-label--amber mb-20">
            <svg className="svg-icon icon-sm" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg>
            {' '}Got Questions?
          </span>
          <h2 id="landing-faq-heading" className="text-2xl md:text-4xl font-bold text-main mb-12">Frequently Asked Questions</h2>
          <p className="text-base text-muted max-w-xl mx-auto">Straight answers to the questions new visitors ask most</p>
        </div>
        <div className="bg-paper rounded-panel border border-divider overflow-hidden mb-32">
          <div className="divide-y divide-divider" role="list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`faq-item${openIdx === i ? ' faq-item--open' : ''}`} role="listitem">
                <button
                  onClick={() => toggle(i)}
                  className="w-full px-20 py-16 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset group hover:bg-hover transition-colors duration-200"
                  aria-expanded={openIdx === i}
                >
                  <span className="text-base font-semibold text-main pr-16 group-hover:text-primary transition-colors duration-200">{item.q}</span>
                  <div className="faq-toggle w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-chip text-muted">
                    <svg className="svg-icon icon-sm" viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>
                  </div>
                </button>
                <div className="faq-answer overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out max-h-0 opacity-0">
                  <div className="px-20 pb-16 pr-60">
                    <p className="text-muted text-base leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
