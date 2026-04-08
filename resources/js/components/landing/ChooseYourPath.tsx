import React from 'react';

const ChooseYourPath: React.FC = () => (
  <section className="py-48 md:py-64 relative z-10" aria-labelledby="paths-heading">
    <div className="max-w-6xl mx-auto px-16 md:px-24">
      <div className="text-center mb-32 md:mb-48">
        <span className="section-label mb-16 md:mb-20">Choose Your Path</span>
        <h2 id="paths-heading" className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">One Platform. Two Ways In.</h2>
        <p className="text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">Whether you're looking for beats or making them, BeatPass is built for you.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        {/* For Artists */}
        <a href="https://open.beatpass.ca/pricing" className="group block">
          <div className="relative h-full p-24 md:p-32 rounded-panel transition-all duration-300 bg-paper border border-divider hover:border-primary/30 hover:shadow-lg">
            <div className="absolute inset-0 rounded-panel bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between mb-20">
                <div className="p-14 rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-105">
                  <svg className="svg-icon icon-lg text-primary" viewBox="0 0 24 24"><path d="m12 3 .01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
                </div>
                <span className="px-12 py-6 text-xs font-semibold rounded-full bg-primary/10 text-primary">Find your sound</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-12 text-main group-hover:text-primary transition-colors duration-300">For Artists &amp; Creators</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed mb-24 flex-grow">Unlimited beats, clear licensing, and custom requests. One plan replaces every per-beat purchase.</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm md:text-base text-primary">Browse Plans</span>
                <div className="w-40 h-40 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 group-hover:translate-x-4">
                  <svg className="svg-icon" style={{ fontSize: 18 }} viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </a>
        {/* For Producers */}
        <a href="https://open.beatpass.ca/producer-program" className="group block">
          <div className="relative h-full p-24 md:p-32 rounded-panel transition-all duration-300 bg-paper border border-divider hover:border-primary/30 hover:shadow-lg">
            <div className="absolute inset-0 rounded-panel bg-gradient-to-br from-positive/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between mb-20">
                <div className="p-14 rounded-xl bg-positive/10 transition-transform duration-300 group-hover:scale-105">
                  <svg className="svg-icon icon-lg text-positive" viewBox="0 0 24 24"><path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" /></svg>
                </div>
                <span className="px-12 py-6 text-xs font-semibold rounded-full bg-positive/10 text-positive">Build your catalog</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-12 text-main group-hover:text-primary transition-colors duration-300">For Producers</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed mb-24 flex-grow">Upload your beats, earn recurring revenue, and grow with producers who share your standards.</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm md:text-base text-positive">Learn More</span>
                <div className="w-40 h-40 rounded-full flex items-center justify-center bg-positive/10 text-positive group-hover:bg-positive group-hover:text-white transition-all duration-300 group-hover:translate-x-4">
                  <svg className="svg-icon" style={{ fontSize: 18 }} viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
);

export default ChooseYourPath;
