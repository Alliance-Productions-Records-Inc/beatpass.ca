import { MenuIcon } from '@/components/icons/material/Menu';
import { CloseIcon } from '@/components/icons/material/Close';
import { ExploreIcon } from '@/components/icons/material/Explore';
import { AudiotrackIcon } from '@/components/icons/material/Audiotrack';
import { QueueMusicIcon } from '@/components/icons/material/QueueMusic';
import { ArrowForwardIcon } from '@/components/icons/material/ArrowForward';
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Button, IconButton } from '@/components/ui/Button';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import Brand from './Brand';
import { APP_URLS } from '@/utils/navigation';

const mobileQuery = '(max-width: 767px)';
const subscribe = (callback: () => void) => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const links = [
  { href: APP_URLS.discover, label: 'Explore beats', detail: 'Listen and find your sound', Icon: ExploreIcon },
  { href: APP_URLS.pricing, label: 'Plans', detail: 'Find a license for your next release', Icon: QueueMusicIcon },
  { href: APP_URLS.producers, label: 'For producers', detail: 'Bring your catalog to BeatPass', Icon: AudiotrackIcon },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useSyncExternalStore(subscribe, () => window.matchMedia(mobileQuery).matches, () => false);
  const reduced = useReducedMotionPreference();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closed = mobile && !menuOpen;

  useEffect(() => { if (!mobile) setMenuOpen(false); }, [mobile]);
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    const focus = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    document.addEventListener('focusin', focus);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('focusin', focus);
    };
  }, [menuOpen]);

  return <header className="landing-header" ref={headerRef} data-menu-open={mobile && menuOpen}>
    <div className="landing-shell landing-header-inner">
      <Brand />
      <IconButton ref={toggleRef} type="button" className="landing-menu-toggle" onClick={() => setMenuOpen(value => !value)}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="landing-navigation">
        <span className="menu-glyph menu-glyph-open"><MenuIcon /></span><span className="menu-glyph menu-glyph-close"><CloseIcon /></span>
      </IconButton>
      <motion.nav id="landing-navigation" aria-label="Main navigation" aria-hidden={closed || undefined}
        {...(closed ? { inert: '' } : {})} className="landing-navigation" initial={false}
        animate={{ height: closed ? 0 : 'auto', opacity: closed ? 0 : 1, y: closed ? -8 : 0 }}
        transition={{ duration: reduced ? 0 : .22, ease: [.2, 0, 0, 1] }}>
        <div className="landing-navigation-links">
          {links.map(({ href, label, detail, Icon }) => <Button key={href} href={href} aria-label={label} size="sm" className="landing-navigation-link" onClick={() => setMenuOpen(false)}>
            <span className="navigation-icon"><Icon size="sm" /></span><span className="navigation-label"><span>{label}</span><span className="navigation-detail">{detail}</span></span><span className="navigation-arrow"><ArrowForwardIcon size="sm" /></span>
          </Button>)}
          <div className="navigation-account"><Button href={APP_URLS.login} variant="outline" size="sm" onClick={() => setMenuOpen(false)}>Log in</Button></div>
        </div>
      </motion.nav>
    </div>
  </header>;
}
