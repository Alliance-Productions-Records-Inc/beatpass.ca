import React from 'react';

const PERKS = [
  { icon: 'M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zm-7.76-2.78c-1.17-.52-2.61-.9-4.24-.9-1.63 0-3.07.39-4.24.9C6.68 14.13 6 15.21 6 16.39V18h12v-1.61c0-1.18-.68-2.26-1.76-2.74zM8.07 16c.09-.23.13-.39.91-.69.97-.38 1.99-.56 3.02-.56s2.05.18 3.02.56c.77.3.81.46.91.69H8.07zM12 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z', label: 'Producer Network', gradient: 'linear-gradient(135deg,#5865F2,#7289DA)' },
  { icon: 'm12 3 .01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z', label: 'Beat Drops & Previews', gradient: 'linear-gradient(135deg,#3B82F6,#06B6D4)' },
  { icon: 'm16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z', label: 'Growth Tips', gradient: 'linear-gradient(135deg,#10B981,#14B8A6)' },
  { icon: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z', label: 'Direct Support', gradient: 'linear-gradient(135deg,#F97316,#F59E0B)' },
];

const Discord: React.FC = () => (
  <section className="py-48 md:py-64 relative z-10" aria-labelledby="discord-heading">
    <div className="max-w-6xl mx-auto px-16 md:px-24">
      <div className="relative overflow-hidden rounded-panel bg-paper border border-divider">
        <div className="relative p-24 md:p-48">
          <div className="grid md:grid-cols-2 gap-32 items-center">
            <div className="text-center md:text-left">
              <div className="w-48 h-48 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-20 text-white shadow-sm" style={{ background: 'linear-gradient(135deg,#5865F2,#7289DA)' }}>
                <svg className="svg-icon icon-md" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
              </div>
              <h2 id="discord-heading" className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">Join the Community</h2>
              <p className="text-sm md:text-lg text-muted leading-relaxed mb-24">Connect with producers and artists. Share tips, get feedback, and stay in the loop on new drops.</p>
              <a href="https://discord.com/invite/N257QBkSeg" target="_blank" rel="noopener noreferrer" className="btn btn-flat-primary btn-lg rounded-button w-full md:w-auto">
                Join Discord
                <svg className="svg-icon icon-end icon-sm" viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-12">
              {PERKS.map((p) => (
                <div key={p.label} className="flex items-center gap-12 p-16 bg-alt rounded-panel border border-divider">
                  <div className="w-40 h-40 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0" style={{ background: p.gradient }}>
                    <svg className="svg-icon icon-sm" viewBox="0 0 24 24"><path d={p.icon} /></svg>
                  </div>
                  <span className="text-xs font-medium text-main">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Discord;
