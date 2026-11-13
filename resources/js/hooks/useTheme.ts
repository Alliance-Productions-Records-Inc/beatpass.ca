const DARK_THEME_VALUES: Record<string, string> = {
  "--be-primary": "148 148 148",
  "--be-disabled-fg-opacity": "30%",
  "--be-on-primary": "0 0 0",
  "--be-foreground-base": "229 231 235",
  "--be-background": "0 0 0",
  "--be-paper": "18 18 18",
  "--be-text-main-opacity": "100%",
  "--be-input-radius": "0.5rem",
  "--be-navbar-color": "transparent",
  "--be-disabled-bg-opacity": "12%",
  "--be-primary-light": "180 180 180",
  "--be-text-muted-opacity": "78%",
  "--be-background-chip": "41 46 54",
  "--be-focus-opacity": "12%",
  "--be-button-radius": "0.5rem",
  "--be-hover-opacity": "8%",
  "--be-panel-radius": "0.75rem",
  "--be-primary-dark": "148 148 148",
  "--be-divider-opacity": "12%",
  "--be-selected-opacity": "16%",
  "--be-background-alt": "19 19 20",
  "--be-danger": "248 113 113",
};

const LIGHT_THEME_VALUES: Record<string, string> = {
  "--be-primary": "102 102 102",
  "--be-disabled-fg-opacity": "26%",
  "--be-on-primary": "255 255 255",
  "--be-foreground-base": "15 15 15",
  "--be-background": "243 243 243",
  "--be-paper": "243 243 243",
  "--be-text-main-opacity": "87%",
  "--be-input-radius": "0.5rem",
  "--be-navbar-color": "transparent",
  "--be-disabled-bg-opacity": "12%",
  "--be-primary-light": "102 102 102",
  "--be-text-muted-opacity": "75%",
  "--be-background-chip": "229 229 229",
  "--be-focus-opacity": "12%",
  "--be-button-radius": "0.5rem",
  "--be-hover-opacity": "4%",
  "--be-panel-radius": "0.75rem",
  "--be-primary-dark": "82 82 82",
  "--be-divider-opacity": "12%",
  "--be-selected-opacity": "8%",
  "--be-background-alt": "243 243 243",
  "--be-danger": "185 28 28",
};

const BASE_THEME_KEYS = Object.keys(DARK_THEME_VALUES);

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
