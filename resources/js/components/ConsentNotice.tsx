import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { readConsent, saveConsent, type Consent } from '@/utils/analytics';

export function openPrivacyPreferences() {
  window.dispatchEvent(new Event('bp:privacy-preferences'));
}

export default function ConsentNotice() {
  const [visible, setVisible] = useState(() => readConsent() === null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const refuseRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reopen = () => {
      returnFocusRef.current = document.activeElement as HTMLElement;
      setPreferencesOpen(true);
      setVisible(true);
    };
    window.addEventListener('bp:privacy-preferences', reopen);
    return () => window.removeEventListener('bp:privacy-preferences', reopen);
  }, []);

  useEffect(() => { if (preferencesOpen) refuseRef.current?.focus(); }, [preferencesOpen]);
  const close = () => {
    setVisible(false);
    setPreferencesOpen(false);
    returnFocusRef.current?.focus();
  };
  const choose = (consent: Consent) => { saveConsent(consent); close(); };
  if (!visible) return null;

  return <section role="region" aria-labelledby="consent-title" aria-describedby="consent-description" className="cookie-notice" data-cookie-notice="bottom" data-cookie-placement="floating">
    <h2 id="consent-title" className="sr-only">Your privacy choices</h2>
    <div className="cookie-notice-content">
      <div>
        <p id="consent-description">Optional analytics and marketing cookies help us improve BeatPass. Your choice won't affect access. Change it anytime in Privacy preferences.</p>
        <a className="cookie-policy" href="https://open.beatpass.ca/pages/privacy-policy">Privacy Policy</a>
      </div>
      <div className="cookie-notice-actions">
        <Button ref={refuseRef} variant="outline" onClick={() => choose('denied')}>Refuse</Button>
        <Button variant="outline" onClick={() => choose('granted')}>Accept</Button>
        {preferencesOpen && readConsent() !== null && <Button className="cookie-notice-cancel" onClick={close}>Cancel</Button>}
      </div>
    </div>
  </section>;
}
