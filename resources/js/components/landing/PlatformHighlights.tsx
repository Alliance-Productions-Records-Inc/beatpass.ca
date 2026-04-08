import React from 'react';

const CARDS = [
  { img: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/98815d9b-d461-44a2-a813-270badf3a93f.jpg', alt: 'Artist in studio — Stream and Preview', tag: 'Access', title: 'Stream & Preview', desc: 'Full catalog streaming on any device. Preview every beat before you commit.' },
  { img: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/a17a55c8-70f1-44c0-82d3-d53f35a8a215.jpg', alt: 'Analytics dashboard — Clear Analytics', tag: 'Clarity', title: 'Clear Analytics', desc: 'See what is working. Track plays, downloads, and engagement in real time.' },
  { img: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/2f547acd-7cfb-4222-91ba-ec6e3589da92.jpg', alt: 'Producer with gear — Creative Freedom', tag: 'Ownership', title: 'Creative Freedom', desc: 'Download unlimited beats. Your licenses stay valid forever, even if you cancel.' },
  { img: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/32c778da-ead9-4f2a-84e3-f6844b79ea25.jpg', alt: 'Creator building momentum — Build Momentum', tag: 'Growth', title: 'Build Momentum', desc: 'Tools and visibility that help you move from uploading to earning. Progress you can measure.' },
  { img: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/0bea745b-9fa3-45ff-a83a-02a0aff06aa0.jpg', alt: 'Curated beat discovery — Curated Discovery', tag: 'Signal', title: 'Curated Discovery', desc: 'Browse by mood, genre, and vibe. Less noise, better fit. Find what works for your project.' },
];

const ShowcaseCard: React.FC<{ card: typeof CARDS[number]; padClass: string }> = ({ card, padClass }) => (
  <div className="showcase-card group">
    <div className="relative aspect-[3/4] overflow-hidden">
      <img src={card.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={card.alt} loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    </div>
    <div className={`absolute bottom-0 left-0 right-0 ${padClass}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-light opacity-80">{card.tag}</span>
      <h3 className={`${padClass === 'p-16' ? 'text-sm' : 'text-lg'} font-bold text-white mt-4 leading-tight`}>{card.title}</h3>
      <p className="text-xs text-white/70 mt-6 leading-relaxed line-clamp-3">{card.desc}</p>
    </div>
  </div>
);

const PlatformHighlights: React.FC = () => (
  <section className="py-48 md:py-64 relative z-10" aria-labelledby="showcase-heading">
    <div className="max-w-6xl mx-auto px-16 md:px-24">
      <div className="text-center mb-32 md:mb-48">
        <span className="section-label mb-16 md:mb-20">Platform Highlights</span>
        <h2 id="showcase-heading" className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">See BeatPass in Action</h2>
        <p className="text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">Designed for creators who move fast. Every screen built to reduce friction.</p>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden -mx-16 px-16">
        <div className="flex gap-12 overflow-x-auto pb-24 snap-x snap-mandatory" role="region" aria-label="Highlights">
          {CARDS.map((c) => (
            <div key={c.title} className="flex-shrink-0 w-[75vw] max-w-[320px] snap-center">
              <ShowcaseCard card={c} padClass="p-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid: 3 + 2 */}
      <div className="hidden md:block space-y-20">
        <div className="grid grid-cols-3 gap-20">
          {CARDS.slice(0, 3).map((c) => (
            <div key={c.title}><ShowcaseCard card={c} padClass="p-24" /></div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-20">
          {CARDS.slice(3).map((c) => (
            <div key={c.title}><ShowcaseCard card={c} padClass="p-24" /></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PlatformHighlights;
