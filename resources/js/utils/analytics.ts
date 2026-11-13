const MEASUREMENT_ID = 'G-5K99X60DF6';
const CONSENT_COOKIE = 'bp_consent';
const CONSENT_DOMAIN = '.beatpass.ca';

export type Consent = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;
let currentConsent: Consent = 'denied';

export function readConsent(): Consent | null {
  const value = document.cookie.split(';').map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  return value === 'granted' || value === 'denied' ? value : null;
}

function consentSettings(consent: Consent) {
  return {
    analytics_storage: consent,
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
  };
}

function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => /^(_ga($|_)|_gid$|_gat($|_)|_gac_)/.test(name));
  // Expire both host-only and domain cookies, including older path-scoped cookies.
  const domains = ['', window.location.hostname, CONSENT_DOMAIN];
  const paths = new Set(['/']);
  const segments = window.location.pathname.split('/').filter(Boolean);
  segments.forEach((_, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    paths.add(path);
    paths.add(`${path}/`);
  });
  for (const name of names) {
    for (const domain of domains) {
      for (const path of paths) {
        document.cookie = `${name}=; Max-Age=0; Path=${path}${domain ? `; Domain=${domain}` : ''}`;
      }
    }
  }
}

export function saveConsent(consent: Consent) {
  const withdrawing = currentConsent === 'granted' || readConsent() === 'granted';
  const expires = new Date();
  expires.setUTCMonth(expires.getUTCMonth() + 6);
  document.cookie = `${CONSENT_COOKIE}=${consent}; Domain=${CONSENT_DOMAIN}; Path=/; SameSite=Lax; Expires=${expires.toUTCString()}${window.location.protocol === 'https:' ? '; Secure' : ''}`;
  currentConsent = consent;
  window.gtag('consent', 'update', consentSettings(consent));

  if (consent === 'denied') {
    clearAnalyticsCookies();
    // Discard identifiers retained in the loaded tag's memory on withdrawal.
    if (withdrawing) window.location.reload();
  }
}

export function initializeAnalytics() {
  if (initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  // These commands must precede loading gtag.js and any measurement commands.
  window.gtag('consent', 'default', consentSettings('denied'));
  currentConsent = readConsent() ?? 'denied';
  if (currentConsent === 'granted') {
    window.gtag('consent', 'update', consentSettings('granted'));
  } else {
    clearAnalyticsCookies();
  }

  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    content_group: 'landing',
    cookie_domain: CONSENT_DOMAIN,
    // Manual pageviews: disable Enhanced Measurement's history pageviews in GA4 too.
    send_page_view: false,
  });

  let previousLocation = document.referrer;
  let lastRoute = '';
  const pageview = () => {
    // Section anchors are not separate pages on this landing site.
    const route = window.location.pathname + window.location.search;
    if (route === lastRoute) return;
    lastRoute = route;
    const location = window.location.origin + route;
    window.gtag('event', 'page_view', {
      send_to: MEASUREMENT_ID,
      content_group: 'landing',
      page_location: location,
      page_title: document.title,
      page_referrer: previousLocation,
    });
    previousLocation = location;
  };
  pageview();

  // The app has no router library; cover History API navigation and back/forward.
  for (const method of ['pushState', 'replaceState'] as const) {
    const original = window.history[method];
    window.history[method] = function (...args: Parameters<History['pushState']>) {
      original.apply(this, args);
      // Let the route's render/title update before measuring the new page.
      queueMicrotask(pageview);
    };
  }
  window.addEventListener('popstate', pageview);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}
