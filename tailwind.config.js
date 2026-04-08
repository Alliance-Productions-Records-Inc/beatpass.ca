/** @type {import('tailwindcss').Config} */

/*
 * Pixel-based spacing scale matching the production app's shared.tailwind.js.
 * Every key N maps to N/16 rem (= N px at default 16 px root font-size).
 * Standard Tailwind uses N/4 rem which is 4× larger — the prototype's HTML
 * classes (p-16 = 1rem, gap-12 = 0.75rem, etc.) rely on this 1-px scale.
 */
function pxSpacing() {
  const scale = { '0': '0px' };
  for (let i = 1; i <= 200; i++) {
    scale[String(i)] = `${i / 16}rem`;
  }
  return scale;
}

module.exports = {
  content: [
    "./resources/**/*.{js,ts,jsx,tsx,blade.php}",
  ],
  darkMode: 'class',
  theme: {
    spacing: pxSpacing(),
    extend: {
      fontSize: {
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
        '18': '1.125rem',
        '20': '1.25rem',
        '24': '1.5rem',
        '32': '2rem',
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--be-primary) / <alpha-value>)',
          light: 'rgb(var(--be-primary-light) / <alpha-value>)',
          dark: 'rgb(var(--be-primary-dark) / <alpha-value>)',
        },
        'on-primary': 'rgb(var(--be-on-primary) / <alpha-value>)',
        positive: 'rgb(var(--be-positive) / <alpha-value>)',
        amber: 'rgb(var(--be-amber) / <alpha-value>)',
        background: 'rgb(var(--be-background) / <alpha-value>)',
        alt: 'rgb(var(--be-background-alt) / <alpha-value>)',
        chip: 'rgb(var(--be-background-chip) / <alpha-value>)',
        paper: 'rgb(var(--be-paper) / <alpha-value>)',
        foreground: 'rgb(var(--be-foreground-base) / <alpha-value>)',
        divider: 'rgb(var(--be-foreground-base) / var(--be-divider-opacity))',
        hover: 'rgb(var(--be-foreground-base) / var(--be-hover-opacity))',
        muted: 'rgb(var(--be-foreground-base) / var(--be-text-muted-opacity))',
        main: 'rgb(var(--be-foreground-base) / var(--be-text-main-opacity))',
      },
      borderRadius: {
        button: 'var(--be-button-radius, 0.5rem)',
        input: 'var(--be-input-radius, 0.5rem)',
        panel: 'var(--be-panel-radius, 0.75rem)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
