import React from 'react';

const Pricing: React.FC = () => (
  <section className="py-48 md:py-64 relative z-10" id="pricing" aria-labelledby="pricing-heading">
    <div className="max-w-6xl mx-auto px-16 md:px-24">
      <div className="text-center mb-32 md:mb-48">
        <span className="section-label mb-16 md:mb-20">Pricing</span>
        <h2 id="pricing-heading" className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">Simple Pricing. Serious Value.</h2>
        <p className="text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">Unlimited downloads and commercial licensing. Plans for every stage.</p>
      </div>
      <div className="text-center pt-12">
        <a href="https://open.beatpass.ca/pricing" className="btn btn-flat-primary btn-lg rounded-button">
          View All Plans
          <svg className="svg-icon icon-end icon-sm" viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
        </a>
      </div>
    </div>
  </section>
);

export default Pricing;
