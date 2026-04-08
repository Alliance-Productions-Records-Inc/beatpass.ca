import React from 'react';

const FooterCTA: React.FC = () => (
  <section className="relative z-10 pt-48 md:pt-64 pb-0" aria-labelledby="footer-cta-heading">
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/1765e9f6-d031-497f-809c-57aaf96fe6b8.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
          maskImage: 'linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 30%,rgba(0,0,0,0.9) 50%,rgba(0,0,0,0.7) 65%,rgba(0,0,0,0.4) 80%,rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 30%,rgba(0,0,0,0.9) 50%,rgba(0,0,0,0.7) 65%,rgba(0,0,0,0.4) 80%,rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-paper/50" />
        <div className="absolute inset-0 bg-alt/30" style={{ backdropFilter: 'saturate(0.7)', WebkitBackdropFilter: 'saturate(0.7)' }} />
      </div>
    </div>
    <div className="relative z-10 max-w-4xl mx-auto px-16 md:px-24 py-48 md:py-64 text-center">
      <span className="section-label mb-16 md:mb-20">Get Started</span>
      <h2 id="footer-cta-heading" className="text-3xl md:text-5xl font-bold mb-16 md:mb-20 text-main leading-tight">Ready to Move?</h2>
      <p className="text-base md:text-xl text-muted leading-relaxed mb-32 max-w-2xl mx-auto">Find your sound or share yours. One platform, two paths, zero friction.</p>
      <div className="flex flex-col sm:flex-row gap-12 justify-center mb-16">
        <a href="https://open.beatpass.ca/register" className="btn btn-flat-primary btn-lg rounded-button w-full sm:w-auto">
          Sign up for free
          <svg className="svg-icon icon-end icon-sm" viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
        </a>
      </div>
      <p className="text-xs text-muted">Cancel anytime &bull; Licenses stay forever &bull; Producers paid directly</p>
    </div>
  </section>
);

export default FooterCTA;
