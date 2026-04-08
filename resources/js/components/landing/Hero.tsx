import React, { useEffect, useRef, useState } from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';
import { extractColors, getConfiguredImagePrimary, applyTheme, DEFAULT_DYNAMIC_PRIMARY } from '@/utils/colorExtraction';

const HEADER_IMAGE =
  'https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/3baa4e33-7001-4f95-b996-054a53022789.jpg';
const CONFIGURED_OPACITY = 0.6;

const LOGO_URLS = {
  darkDesktop: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/8524b656-7e0d-4271-9503-03d515ac6ecc.png',
  darkMobile: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/2e638426-07a8-4a23-bfcc-c30e5d588bf8.png',
  lightDesktop: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/e5cfac08-433a-4dfd-b575-b1cfdb75ea81.png',
  lightMobile: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/48747fba-5202-43ce-8022-3a68dcc87277.png',
};

const Hero: React.FC = () => {
  const deskRef = useRef<HTMLDivElement>(null);
  const mobRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { setDominantColor } = useThemeContext();

  useEffect(() => {
    const configuredPrimary = getConfiguredImagePrimary(HEADER_IMAGE);
    if (configuredPrimary) {
      setLoaded(true);
      applyTheme(configuredPrimary);
      setDominantColor(configuredPrimary);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setLoaded(true);
      const dominant = extractColors(img, HEADER_IMAGE);
      setDominantColor(dominant);
    };
    img.onerror = () => {
      setLoaded(true);
      const fallback: [number, number, number] = [...DEFAULT_DYNAMIC_PRIMARY];
      applyTheme(fallback);
      setDominantColor(fallback);
    };
    img.src = HEADER_IMAGE;
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const parallax = y * 0.4;
          const fade = Math.min(y / 500, 1);
          const opacity = loaded ? CONFIGURED_OPACITY * (1 - fade) : 0;
          if (deskRef.current) {
            deskRef.current.style.opacity = String(opacity);
            deskRef.current.style.transform = `translateY(-${parallax}px)`;
          }
          if (mobRef.current) {
            mobRef.current.style.opacity = String(opacity);
            mobRef.current.style.transform = `translateY(-${parallax * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [loaded]);

  const bgStyle = (opacity: number): React.CSSProperties => ({
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    willChange: 'transform,opacity',
    backgroundImage: `url('${HEADER_IMAGE}')`,
    opacity: opacity,
  });

  const desktopMask: React.CSSProperties = {
    maskImage: 'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 40%,rgba(0,0,0,0.9) 60%,rgba(0,0,0,0.7) 75%,rgba(0,0,0,0.4) 88%,rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 40%,rgba(0,0,0,0.9) 60%,rgba(0,0,0,0.7) 75%,rgba(0,0,0,0.4) 88%,rgba(0,0,0,0) 100%)',
  };

  const mobileMask: React.CSSProperties = {
    maskImage: 'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 20%,rgba(0,0,0,0.9) 40%,rgba(0,0,0,0.7) 60%,rgba(0,0,0,0.4) 80%,rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 20%,rgba(0,0,0,0.9) 40%,rgba(0,0,0,0.7) 60%,rgba(0,0,0,0.4) 80%,rgba(0,0,0,0) 100%)',
  };

  return (
    <>
      {/* Desktop hero bg */}
      <div className="hidden md:block fixed top-0 left-0 right-0 w-full pointer-events-none overflow-hidden" style={{ zIndex: 0, height: '85vh' }} aria-hidden="true">
        <div ref={deskRef} className="absolute inset-0 w-full h-full" style={{ ...bgStyle(0), ...desktopMask }}>
          <div className="absolute inset-0 bg-paper/50" />
          <div className="absolute inset-0 bg-alt/30" style={{ backdropFilter: 'saturate(0.7)', WebkitBackdropFilter: 'saturate(0.7)' }} />
          <div className="absolute inset-0 bg-alt/20" />
        </div>
        <div className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(to bottom,transparent 0%,transparent 15%,rgba(var(--be-background),0.2) 30%,rgba(var(--be-background),0.5) 45%,rgba(var(--be-background),0.75) 60%,rgba(var(--be-background),0.9) 72%,rgba(var(--be-background),0.97) 84%,rgb(var(--be-background)) 92%)' }} />
      </div>
      {/* Mobile hero bg */}
      <div className="md:hidden fixed top-0 left-0 right-0 w-full pointer-events-none overflow-hidden" style={{ zIndex: 0, height: '100vh' }} aria-hidden="true">
        <div ref={mobRef} className="absolute inset-0 w-full h-full" style={{ ...bgStyle(0), ...mobileMask }}>
          <div className="absolute inset-0 bg-paper/50" />
          <div className="absolute inset-0 bg-alt/30" style={{ backdropFilter: 'saturate(0.65)', WebkitBackdropFilter: 'saturate(0.65)' }} />
          <div className="absolute inset-0 bg-alt/20" />
        </div>
        <div className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(to bottom,transparent 0%,transparent 10%,rgba(var(--be-background),0.2) 25%,rgba(var(--be-background),0.5) 40%,rgba(var(--be-background),0.75) 55%,rgba(var(--be-background),0.9) 70%,rgba(var(--be-background),0.97) 85%,rgb(var(--be-background)) 95%)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-end gap-6 pl-14 pr-8 md:gap-10 md:pl-20 md:pr-20 h-64 py-8">
        <a href="https://open.beatpass.ca/" className="mr-auto block h-full max-h-32 flex-shrink-0 md:max-h-36" aria-label="Go to homepage">
          <picture
            className="block h-full"
            data-theme-logo
            data-dark-desktop={LOGO_URLS.darkDesktop}
            data-dark-mobile={LOGO_URLS.darkMobile}
            data-light-desktop={LOGO_URLS.lightDesktop}
            data-light-mobile={LOGO_URLS.lightMobile}
          >
            <source data-logo-mobile media="(max-width: 768px)" srcSet={LOGO_URLS.darkMobile} />
            <source data-logo-desktop media="(min-width: 768px)" srcSet={LOGO_URLS.darkDesktop} />
            <img data-logo-img src={LOGO_URLS.darkMobile} alt="BeatPass logo" className="block h-full max-h-32 w-auto md:max-h-36" />
          </picture>
        </a>
        <div className="flex flex-shrink-0 items-center gap-4 text-sm max-md:hidden lg:gap-6">
          <a href="https://open.beatpass.ca/register" className="btn btn-text btn-sm rounded-button">Sign Up</a>
          <a href="https://open.beatpass.ca/login" className="btn btn-raised-primary btn-sm rounded-button">Login</a>
        </div>
        <MobileAuthMenu />
      </nav>

      {/* Hero content */}
      <section className="relative min-h-[85vh] flex items-center pt-16 md:pt-0" aria-labelledby="hero-heading">
        <div className="relative z-10 w-full px-16 md:px-24 py-32 md:py-48">
          <div className="max-w-4xl mx-auto text-center">
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-24 text-main leading-tight tracking-tight drop-shadow-lg" style={{ textWrap: 'balance' as any }}>
              Better Beats. Clear Licensing. Real Momentum.
            </h1>
            <p className="text-lg md:text-xl text-main mb-40 max-w-3xl mx-auto leading-relaxed drop-shadow">
              One platform for artists who need quality beats and producers who want to grow. Find your fit or upload your catalog.
            </p>

            {/* Stat badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-40 max-w-3xl mx-auto">
              {[
                { value: '∞', label: 'Unlimited Downloads' },
                { value: '✓', label: 'Commercial Licensing' },
                { value: 'HD', label: 'Studio Quality' },
                { value: '24/7', label: 'Instant Access' },
              ].map((s) => (
                <div key={s.label} className="p-12 md:p-16 bg-paper/80 backdrop-blur-sm rounded-panel border border-divider text-center">
                  <div className="text-xl md:text-2xl font-bold text-primary mb-2">{s.value}</div>
                  <div className="text-[10px] md:text-xs text-muted">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Search */}
            <form className="w-full max-w-2xl mx-auto mb-32" onSubmit={(e) => { e.preventDefault(); const input = (e.target as HTMLFormElement).querySelector('input') as HTMLInputElement; window.location.href = 'https://open.beatpass.ca/search/' + encodeURIComponent(input.value); }}>
              <div className="relative shadow-lg rounded-full overflow-hidden">
                <svg className="svg-icon icon-sm absolute left-16 top-1/2 -translate-y-1/2 text-muted" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                <input type="text" placeholder="Search beats, genres, producers..." className="w-full py-14 pl-44 pr-16 bg-paper text-main rounded-full border-0 outline-none text-base" aria-label="Search beats" />
              </div>
            </form>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-12 justify-center mb-32">
              <a href="https://open.beatpass.ca/register" className="btn btn-flat-primary btn-lg rounded-button w-full sm:w-auto">
                <svg className="svg-icon icon-start" style={{ fontSize: '1.25rem' }} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" /></svg>
                Get Started
                <svg className="svg-icon icon-end" style={{ fontSize: '1.25rem' }} viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
              </a>
              <a href="https://open.beatpass.ca/discover" className="btn btn-outline btn-lg rounded-button w-full sm:w-auto">
                <svg className="svg-icon icon-start" style={{ fontSize: '1.25rem' }} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5 7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" /></svg>
                Explore
              </a>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap justify-center gap-x-24 gap-y-12 text-sm text-muted">
              {['Cancel anytime \u2022 Licenses stay forever', 'Vetted producers \u2022 Clear standards', 'No contracts \u2022 No commitments'].map((t) => (
                <div key={t} className="flex items-center gap-6">
                  <svg className="svg-icon icon-xs text-positive" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" /></svg>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const MobileAuthMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', handler);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('click', handler); document.removeEventListener('keydown', esc); };
  }, []);

  return (
    <div className="md:hidden relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-center w-42 h-42 rounded-full hover:bg-hover transition-colors" aria-label="Account" aria-expanded={open} aria-controls="mobile-auth-menu">
        <svg className="svg-icon icon-md" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" /></svg>
      </button>
      {open && (
        <div id="mobile-auth-menu" className="absolute right-0 top-full mt-8 w-160 rounded-panel border border-divider bg-paper p-6 shadow-lg">
          <a href="https://open.beatpass.ca/login" className="block rounded-lg px-12 py-8 text-sm text-main hover:bg-hover transition-colors">Login</a>
          <a href="https://open.beatpass.ca/register" className="block rounded-lg px-12 py-8 text-sm text-main hover:bg-hover transition-colors">Sign Up</a>
        </div>
      )}
    </div>
  );
};

export default Hero;
