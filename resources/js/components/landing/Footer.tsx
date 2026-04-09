import React from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';

const LOGO_URLS = {
  darkDesktop: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/8524b656-7e0d-4271-9503-03d515ac6ecc.png',
  darkMobile: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/2e638426-07a8-4a23-bfcc-c30e5d588bf8.png',
  lightDesktop: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/e5cfac08-433a-4dfd-b575-b1cfdb75ea81.png',
  lightMobile: 'https://bpass24.s3.us-east-005.backblazeb2.com/storage/branding_media/48747fba-5202-43ce-8022-3a68dcc87277.png',
};

const FOOTER_MENU_ITEMS = [
  { label: 'Contact', href: 'https://open.beatpass.ca/contact', icon: 'M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z' },
  { label: 'Pricing', href: 'https://open.beatpass.ca/pricing', icon: 'M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z' },
  { label: 'Help Center', href: 'https://docs.beatpass.ca', target: '_blank', icon: 'M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16h-4.83l-.59.59L12 20.17l-1.59-1.59-.58-.58H5V4h14v14zm-7-1 1.88-4.12L18 11l-4.12-1.88L12 5l-1.88 4.12L6 11l4.12 1.88z' },
  { label: 'Changelog', href: '/changelog', icon: 'M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z' },
  { label: 'Blog', href: 'https://blog.beatpass.ca', target: '_blank', icon: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' },
  { label: 'About', href: 'https://blog.beatpass.ca/about/', target: '_blank', icon: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  { label: 'API', href: 'https://docs.beatpass.ca/developers/overview', target: '_blank', icon: 'm14 12-2 2-2-2 2-2 2 2zm-2-6 2.12 2.12 2.5-2.5L12 1 7.38 5.62l2.5 2.5L12 6zm-6 6 2.12-2.12-2.5-2.5L1 12l4.62 4.62 2.5-2.5L6 12zm12 0-2.12 2.12 2.5 2.5L23 12l-4.62-4.62-2.5 2.5L18 12zm-6 6-2.12-2.12-2.5 2.5L12 23l4.62-4.62-2.5-2.5L12 18z' },
  { label: 'Terms of service', href: 'https://open.beatpass.ca/pages/terms-of-service', icon: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  { label: 'DMCA', href: 'https://open.beatpass.ca/pages/dmca', icon: 'M13 7.83c.85-.3 1.53-.98 1.83-1.83H18l-3 7c0 1.66 1.57 3 3.5 3s3.5-1.34 3.5-3l-3-7h2V4h-6.17c-.41-1.17-1.52-2-2.83-2s-2.42.83-2.83 2H3v2h2l-3 7c0 1.66 1.57 3 3.5 3S9 14.66 9 13L6 6h3.17c.3.85.98 1.53 1.83 1.83V19H2v2h20v-2h-9V7.83zM20.37 13h-3.74l1.87-4.36L20.37 13zm-13 0H3.63L5.5 8.64 7.37 13zM12 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z' },
  { label: 'Privacy Policy', href: 'https://open.beatpass.ca/pages/privacy-policy', icon: 'M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
  { label: 'Refund Policy', href: 'https://open.beatpass.ca/pages/refund-policy', icon: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
];

const SOCIALS = [
  { href: 'https://www.instagram.com/beatpass.wav', label: 'Instagram', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
  { href: 'https://www.youtube.com/@beatpasswav', label: 'YouTube', icon: 'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z' },
  { href: 'https://www.tiktok.com/@beatpass.wav', label: 'TikTok', icon: 'M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z' },
  { href: 'https://x.com/beatpasswav', label: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { href: 'https://github.com/Alliance-Productions-Records-Inc/beatpass.ca', label: 'GitHub', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z' },
  { href: 'https://discord.com/invite/N257QBkSeg', label: 'Discord', icon: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <footer className="landing-container relative z-10 text-sm pt-32 md:pt-48 pb-16 md:pb-24">
      <div className="border-t border-divider pt-24 md:pt-32">
        {/* Logo + Social */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-16 md:gap-20 mb-20">
          <a href="https://open.beatpass.ca/" className="block flex-shrink-0" aria-label="Go to homepage">
            <picture
              data-theme-logo
              data-dark-desktop={LOGO_URLS.darkDesktop}
              data-dark-mobile={LOGO_URLS.darkMobile}
              data-light-desktop={LOGO_URLS.lightDesktop}
              data-light-mobile={LOGO_URLS.lightMobile}
            >
              <source data-logo-mobile media="(max-width: 768px)" srcSet={LOGO_URLS.darkMobile} />
              <source data-logo-desktop media="(min-width: 768px)" srcSet={LOGO_URLS.darkDesktop} />
              <img data-logo-img src={LOGO_URLS.darkMobile} alt="BeatPass logo" className="block w-auto h-48 max-w-[160px] object-contain" />
            </picture>
          </a>
          <div className="flex items-center justify-center md:justify-end gap-8">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-36 h-36 rounded-full flex items-center justify-center text-muted hover:text-main hover:bg-hover transition-colors" aria-label={s.label}>
                <svg className="svg-icon icon-sm" viewBox="0 0 24 24"><path d={s.icon} /></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Scrollable menu */}
        <div className="mb-16 space-y-10">
          <div className="footer-menu-scroll">
            <div className="overflow-x-auto touch-pan-x md:overflow-visible">
              <div className="px-4 md:px-0 flex items-center gap-8 pr-16 md:pr-0 text-muted flex-nowrap md:flex-wrap justify-start">
                {FOOTER_MENU_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.target ? { target: item.target, rel: 'noopener noreferrer' } : {})}
                    className="footer-chip-link"
                  >
                    <svg className="svg-icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon} /></svg>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-16 border-t border-divider/50 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="text-xs text-muted/70 order-2 md:order-1">
            Copyright &copy; {year} BeatPass™ | The producer hub., All Rights Reserved
          </div>
          <div className="flex items-center gap-8 order-1 md:order-2">
            {/* Theme Toggle */}
            <button type="button" onClick={toggleTheme} className="btn btn-outline btn-sm rounded-lg gap-8 border-divider hover:bg-hover">
              {isDark ? (
                <svg className="svg-icon icon-sm" viewBox="0 0 24 24"><path d="M12.43 2.3c-2.38-.59-4.68-.29-6.63.64-.35.17-.37.66-.04.86C7.55 5 8.7 6.74 9.15 8.78c.94 4.2-1.63 8.39-5.72 9.58-.37.11-.53.54-.32.86C4.63 21.35 7.26 23 10.35 23c5.24 0 9.5-4.26 9.5-9.5 0-5.19-4.18-10.2-7.42-11.2zM10.35 21c-1.9 0-3.64-.78-4.97-2.04 3.77-1.53 6.31-5.29 5.92-9.51-.18-1.92-1-3.63-2.25-4.95 1.4-.23 2.86-.03 4.19.55C16.09 6.42 17.85 10 17.85 13.5c0 4.13-3.37 7.5-7.5 7.5z" /></svg>
              ) : (
                <svg className="svg-icon icon-sm" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" /></svg>
              )}
              <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
            </button>
            {/* Locale */}
            <button type="button" disabled aria-disabled="true" className="btn btn-outline btn-sm rounded-lg gap-8 capitalize border-divider hover:bg-hover">
              <svg className="svg-icon icon-sm" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>
              English
              <svg className="svg-icon icon-xs" viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
