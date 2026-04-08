const DARK_THEME_VALUES: Record<string, string> = {
  '--be-foreground-base': '229 231 235',
  '--be-background': '10 10 10',
  '--be-background-alt': '18 18 18',
  '--be-background-chip': '41 46 54',
  '--be-paper': '15 15 15',
  '--be-disabled-bg-opacity': '12%',
  '--be-disabled-fg-opacity': '30%',
  '--be-hover-opacity': '8%',
  '--be-focus-opacity': '12%',
  '--be-selected-opacity': '16%',
  '--be-text-main-opacity': '100%',
  '--be-text-muted-opacity': '78%',
  '--be-divider-opacity': '12%',
  '--be-button-radius': '0.5rem',
  '--be-input-radius': '0.5rem',
  '--be-panel-radius': '0.75rem',
  '--be-navbar-color': 'transparent',
};

const LIGHT_THEME_VALUES: Record<string, string> = {
  '--be-foreground-base': '15 15 15',
  '--be-background': '252 254 255',
  '--be-background-alt': '240 242 245',
  '--be-background-chip': '233 236 239',
  '--be-paper': '247 251 255',
  '--be-disabled-bg-opacity': '12%',
  '--be-disabled-fg-opacity': '26%',
  '--be-hover-opacity': '4%',
  '--be-focus-opacity': '12%',
  '--be-selected-opacity': '8%',
  '--be-text-main-opacity': '87%',
  '--be-text-muted-opacity': '75%',
  '--be-divider-opacity': '12%',
  '--be-button-radius': '0.5rem',
  '--be-input-radius': '0.5rem',
  '--be-panel-radius': '0.75rem',
};

const BASE_THEME_KEYS = [
  '--be-foreground-base',
  '--be-background',
  '--be-background-alt',
  '--be-background-chip',
  '--be-paper',
  '--be-disabled-bg-opacity',
  '--be-disabled-fg-opacity',
  '--be-hover-opacity',
  '--be-focus-opacity',
  '--be-selected-opacity',
  '--be-text-main-opacity',
  '--be-text-muted-opacity',
  '--be-divider-opacity',
  '--be-button-radius',
  '--be-input-radius',
  '--be-panel-radius',
  '--be-navbar-color',
];

export function applyBaseTheme(themeValues: Record<string, string>) {
  const el = document.documentElement;
  BASE_THEME_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(themeValues, key)) {
      el.style.setProperty(key, themeValues[key]);
    } else {
      el.style.removeProperty(key);
    }
  });
}

export function applyDarkTheme() {
  document.documentElement.classList.add('dark');
  applyBaseTheme(DARK_THEME_VALUES);
}

export function applyLightTheme() {
  document.documentElement.classList.remove('dark');
  applyBaseTheme(LIGHT_THEME_VALUES);
}

export function syncThemeLogos(isDark: boolean) {
  const themeKey = isDark ? 'dark' : 'light';
  document.querySelectorAll<HTMLElement>('[data-theme-logo]').forEach((picture) => {
    const desktop = picture.getAttribute(`data-${themeKey}-desktop`);
    const mobile = picture.getAttribute(`data-${themeKey}-mobile`) || desktop;
    const mobileSource = picture.querySelector<HTMLSourceElement>('[data-logo-mobile]');
    const desktopSource = picture.querySelector<HTMLSourceElement>('[data-logo-desktop]');
    const image = picture.querySelector<HTMLImageElement>('[data-logo-img]');

    if (mobileSource && mobile) mobileSource.setAttribute('srcset', mobile);
    if (desktopSource && desktop) desktopSource.setAttribute('srcset', desktop!);
    if (image) image.setAttribute('src', mobile || desktop || '');
  });
}

export function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}
