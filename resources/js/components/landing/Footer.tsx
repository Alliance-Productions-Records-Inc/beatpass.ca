import { ChipRail } from '@/components/ui/ChipRail';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { DarkModeIcon } from '@/components/icons/material/DarkMode';
import { LightbulbIcon } from '@/components/icons/material/Lightbulb';
import { LanguageIcon } from '@/components/icons/material/Language';
import { KeyboardArrowDownIcon } from '@/components/icons/material/KeyboardArrowDown';
import { InstagramIcon } from '@/components/icons/social/instagram';
import { YoutubeIcon } from '@/components/icons/social/youtube';
import { TiktokIcon } from '@/components/icons/social/tiktok';
import { TwitterIcon } from '@/components/icons/social/twitter';
import { DiscordIcon } from '@/components/icons/social/discord';
import { createSvgIconFromTree } from '@/components/icons/create-svg-icon';
import { useThemeContext } from '@/contexts/ThemeContext';
import { openPrivacyPreferences } from '@/components/ConsentNotice';
import menu from '@/config/footer-menu.json';
import Brand from './Brand';

const FOOTER_MENU = menu.map(item => ({ ...item, Icon: createSvgIconFromTree(item.icon, item.label) }));
const SOCIALS = [
  { name: 'Follow us on Instagram', href: 'https://www.instagram.com/beatpass.wav', Icon: InstagramIcon },
  { name: 'Subscribe on YouTube', href: 'https://www.youtube.com/@beatpasswav', Icon: YoutubeIcon },
  { name: 'Follow us on TikTok', href: 'https://www.tiktok.com/@beatpass.wav', Icon: TiktokIcon },
  { name: 'Follow us on X', href: 'https://x.com/beatpasswav', Icon: TwitterIcon },
  { name: 'Join our Discord', href: 'https://discord.com/invite/N257QBkSeg', Icon: DiscordIcon },
];

export default function Footer() {
  const { isDark, toggleTheme } = useThemeContext();
  const [languageOpen, setLanguageOpen] = useState(false);
  const language = useRef<HTMLDivElement>(null);
  const languageTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!language.current?.contains(event.target as Node)) setLanguageOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  return <footer data-app-footer className="landing-shell landing-footer">
    <div className="landing-footer-top"><Brand variant="footer" /><nav aria-label="Social links" className="landing-socials">{SOCIALS.map(({name, href, Icon}) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`}><Icon size="sm" /></a>)}</nav></div>
    <ChipRail label="Footer" className="footer-chips">{FOOTER_MENU.map(({label, href, Icon}) => <a key={label} href={href}><span className="footer-chip-face"><Icon size="sm" />{label}</span></a>)}</ChipRail>
    <div className="landing-footer-bottom">
      <p>Copyright © {new Date().getFullYear()} BeatPass™, All Rights Reserved</p>
      <div className="landing-footer-controls">
        <Button variant="outline" size="sm" onClick={openPrivacyPreferences}>Privacy preferences</Button>
        <Button variant="outline" size="sm" startIcon={isDark ? <DarkModeIcon size="sm" /> : <LightbulbIcon size="sm" />} onClick={toggleTheme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>{isDark ? 'Dark mode' : 'Light mode'}</Button>
        <div className="footer-language" ref={language} onKeyDown={event => { if (event.key === 'Escape') { setLanguageOpen(false); languageTrigger.current?.focus(); } }}>
          <Button ref={languageTrigger} variant="outline" size="sm" startIcon={<LanguageIcon size="sm" />} endIcon={<KeyboardArrowDownIcon size="sm" />} aria-expanded={languageOpen} aria-controls="landing-language" onClick={() => setLanguageOpen(value => !value)}>English</Button>
          {languageOpen && <div id="landing-language" className="footer-language-menu"><p>Landing language: English</p><a href="https://open.beatpass.ca/discover">Choose another language in the app</a></div>}
        </div>
      </div>
    </div>
  </footer>;
}
