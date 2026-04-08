/* ═══════════════════════════════════════════════════════════════════
   Dynamic Color Extraction
   Ported from portable prototype scripts.js — color math, palette
   analysis, WCAG contrast adjustment, and theme application.
   ═══════════════════════════════════════════════════════════════════ */

declare class ColorThief {
  getColor(img: HTMLImageElement): [number, number, number];
  getPalette(img: HTMLImageElement, count: number): [number, number, number][];
}

export const DEFAULT_DYNAMIC_PRIMARY: [number, number, number] = [99, 102, 241];

export const PRECOMPUTED_IMAGE_COLORS: Record<string, [number, number, number]> = {
  'https://bpass24.s3.us-east-005.backblazeb2.com/storage/homepage/3baa4e33-7001-4f95-b996-054a53022789.jpg':
    [87, 198, 232],
};

type RGB = [number, number, number];

/* ─── Color Math ─── */

function getRelativeLuminance(r: number, g: number, b: number): number {
  function channel(value: number) {
    value /= 255;
    return value <= 0.04045
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const lightness = (max + min) / 2;
  if (max === min) return 0;
  const delta = max - min;
  return lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
}

function getHue(r: number, g: number, b: number): number {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  if (max !== min) {
    const delta = max - min;
    if (max === r) {
      hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      hue = ((b - r) / delta + 2) / 6;
    } else {
      hue = ((r - g) / delta + 4) / 6;
    }
  }
  return Math.round(hue * 360);
}

function isGrayscale(r: number, g: number, b: number): boolean {
  const saturation = getSaturation(r, g, b);
  if (saturation < 0.15) return true;
  if (saturation < 0.25) {
    const hue = getHue(r, g, b);
    if ((hue >= 10 && hue <= 50) || hue >= 345) return true;
  }
  return false;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === r) {
      hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      hue = ((b - r) / delta + 2) / 6;
    } else {
      hue = ((r - g) / delta + 4) / 6;
    }
  }

  return [
    Math.round(hue * 360),
    Math.round(saturation * 100),
    Math.round(lightness * 100),
  ];
}

function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;
  const amount = s * Math.min(l, 1 - l);
  function channel(index: number) {
    const k = (index + h / 30) % 12;
    return l - amount * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  }
  return [
    Math.round(channel(0) * 255),
    Math.round(channel(8) * 255),
    Math.round(channel(4) * 255),
  ];
}

function rgbToCss(color: RGB): string {
  return color.join(' ');
}

function lighten(rgb: RGB, amount: number): RGB {
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  return hslToRgb(hsl[0], hsl[1], Math.min(100, hsl[2] + hsl[2] * amount));
}

function darken(rgb: RGB, amount: number): RGB {
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  return hslToRgb(hsl[0], hsl[1], Math.max(0, hsl[2] - hsl[2] * amount));
}

/* ─── WCAG Contrast ─── */

function getThemeBackgroundLuminances(): number[] {
  const bgVars = ['--be-background', '--be-background-alt', '--be-paper', '--be-background-chip'];
  const luminances: number[] = [];
  const styles = getComputedStyle(document.documentElement);

  bgVars.forEach((variable) => {
    const value = styles.getPropertyValue(variable).trim();
    if (!value) return;
    const parts = value.split(/\s+/).map(Number);
    if (parts.length >= 3 && parts.every((part) => !isNaN(part))) {
      luminances.push(getRelativeLuminance(parts[0], parts[1], parts[2]));
    }
  });

  return luminances.length ? luminances : [0.003];
}

function ensureWcagContrast(color: RGB, bgLuminances: number[], isDarkTheme: boolean): RGB {
  const colorLuminance = getRelativeLuminance(color[0], color[1], color[2]);
  const worstRatio = Math.min(
    ...bgLuminances.map((bg) => getContrastRatio(colorLuminance, bg))
  );
  if (worstRatio >= 4.5) return color;

  const hsl = rgbToHsl(color[0], color[1], color[2]);
  let nextLightness = hsl[2];

  for (let i = 0; i < 70; i += 1) {
    nextLightness += isDarkTheme ? 1 : -1;
    if ((isDarkTheme && nextLightness > 97) || (!isDarkTheme && nextLightness < 3)) break;

    const candidate = hslToRgb(hsl[0], hsl[1], nextLightness);
    const candidateLuminance = getRelativeLuminance(candidate[0], candidate[1], candidate[2]);
    const ratio = Math.min(
      ...bgLuminances.map((bg) => getContrastRatio(candidateLuminance, bg))
    );
    if (ratio >= 4.5) return candidate;
  }

  return isDarkTheme ? [200, 200, 200] : [50, 50, 50];
}

function adjustForReadability(rgb: RGB, isDarkTheme: boolean, bgLuminances: number[]): RGB {
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  let adjustedSaturation: number;
  let adjustedLightness: number;

  if (isDarkTheme) {
    adjustedSaturation = Math.min(hsl[1], 75);
    adjustedLightness = Math.max(45, Math.min(65, hsl[2]));
  } else {
    adjustedSaturation = Math.min(hsl[1], 60);
    adjustedLightness = Math.max(40, Math.min(50, hsl[2]));
  }

  return ensureWcagContrast(
    hslToRgb(hsl[0], adjustedSaturation, adjustedLightness),
    bgLuminances,
    isDarkTheme
  );
}

function getAccessibleOnPrimary(primary: RGB): RGB {
  const primaryLuminance = getRelativeLuminance(primary[0], primary[1], primary[2]);
  const whiteContrast = getContrastRatio(1, primaryLuminance);
  const blackContrast = getContrastRatio(primaryLuminance, 0);
  return whiteContrast >= blackContrast ? [255, 255, 255] : [0, 0, 0];
}

/* ─── Palette Analysis ─── */

function isPaletteGrayscale(palette: RGB[]): boolean {
  if (!palette.length) return true;
  let grayscaleCount = 0;
  let totalSaturation = 0;
  palette.forEach((color) => {
    const saturation = getSaturation(color[0], color[1], color[2]);
    totalSaturation += saturation;
    if (saturation < 0.15) grayscaleCount += 1;
  });
  return totalSaturation / palette.length < 0.15 || grayscaleCount / palette.length > 0.7;
}

function ensureMinimumBrightness(color: RGB, minLuminance = 0.12): RGB {
  const luminance = getRelativeLuminance(color[0], color[1], color[2]);
  if (luminance >= minLuminance) return color;
  const factor = Math.sqrt(minLuminance / Math.max(luminance, 0.01));
  return [
    Math.min(255, Math.round(color[0] * factor)),
    Math.min(255, Math.round(color[1] * factor)),
    Math.min(255, Math.round(color[2] * factor)),
  ];
}

function getHueDifference(hueA: number, hueB: number): number {
  const difference = Math.abs(hueA - hueB);
  return Math.min(difference, 360 - difference);
}

interface HueWeight {
  sum: number;
  weight: number;
}

function analyzeHueDistribution(palette: RGB[]): { dominantHue: number; confidence: number } {
  const hueWeights: Record<string, HueWeight> = {
    red: { sum: 0, weight: 0 },
    orange: { sum: 0, weight: 0 },
    yellow: { sum: 0, weight: 0 },
    green: { sum: 0, weight: 0 },
    cyan: { sum: 0, weight: 0 },
    blue: { sum: 0, weight: 0 },
    purple: { sum: 0, weight: 0 },
    magenta: { sum: 0, weight: 0 },
  };

  palette.forEach((color) => {
    const saturation = getSaturation(color[0], color[1], color[2]);
    if (saturation < 0.12) return;
    const hue = getHue(color[0], color[1], color[2]);
    const luminance = getRelativeLuminance(color[0], color[1], color[2]);
    const weight =
      Math.pow(saturation, 1.5) * (luminance < 0.1 ? 0.5 : luminance > 0.85 ? 0.6 : 1);
    let category: string;

    if ((hue >= 0 && hue < 25) || hue >= 335) {
      category = 'red';
    } else if (hue >= 25 && hue < 50) {
      category = 'orange';
    } else if (hue >= 50 && hue < 70) {
      category = 'yellow';
    } else if (hue >= 70 && hue < 150) {
      category = 'green';
    } else if (hue >= 150 && hue < 190) {
      category = 'cyan';
    } else if (hue >= 190 && hue < 250) {
      category = 'blue';
    } else if (hue >= 250 && hue < 290) {
      category = 'purple';
    } else {
      category = 'magenta';
    }

    const normalizedHue = category === 'red' && hue > 180 ? hue - 360 : hue;
    hueWeights[category].sum += normalizedHue * weight;
    hueWeights[category].weight += weight;
  });

  let dominantCategory = 'blue';
  let maxWeight = 0;
  let totalWeight = 0;
  Object.keys(hueWeights).forEach((key) => {
    totalWeight += hueWeights[key].weight;
    if (hueWeights[key].weight > maxWeight) {
      maxWeight = hueWeights[key].weight;
      dominantCategory = key;
    }
  });

  const dominant = hueWeights[dominantCategory];
  let averageHue = dominant.weight > 0 ? dominant.sum / dominant.weight : 200;
  if (averageHue < 0) averageHue += 360;

  return {
    dominantHue: averageHue,
    confidence: totalWeight > 0 ? maxWeight / totalWeight : 0,
  };
}

function analyzeColorPalette(palette: RGB[], rawDominant: RGB): RGB {
  if (!palette || !palette.length) return [...DEFAULT_DYNAMIC_PRIMARY] as RGB;
  if (isPaletteGrayscale(palette)) return [128, 128, 128];

  const colorfulPalette = palette.filter((color) => !isGrayscale(color[0], color[1], color[2]));
  if (!colorfulPalette.length) return [128, 128, 128];

  const hueAnalysis = analyzeHueDistribution(palette);
  const matchingColors = colorfulPalette.filter(
    (color) => getHueDifference(getHue(color[0], color[1], color[2]), hueAnalysis.dominantHue) <= 45
  );
  const candidatePool = matchingColors.length ? matchingColors : colorfulPalette;
  let bestColor = candidatePool[0];
  let bestScore = 0;

  candidatePool.forEach((color) => {
    const saturation = getSaturation(color[0], color[1], color[2]);
    const luminance = getRelativeLuminance(color[0], color[1], color[2]);
    const hue = getHue(color[0], color[1], color[2]);
    let score = Math.pow(saturation, 1.3);

    if (luminance < 0.05) score *= 0.5;
    else if (luminance < 0.15) score *= 0.7;
    else if (luminance > 0.9) score *= 0.2;
    else if (luminance > 0.85) score *= 0.4;

    score *= 1 + (1 - getHueDifference(hue, hueAnalysis.dominantHue) / 90) * 0.4;

    if (score > bestScore) {
      bestScore = score;
      bestColor = color;
    }
  });

  const rawSaturation = getSaturation(rawDominant[0], rawDominant[1], rawDominant[2]);
  if (rawSaturation > 0.3) {
    const rawHueDiff = getHueDifference(
      getHue(rawDominant[0], rawDominant[1], rawDominant[2]),
      hueAnalysis.dominantHue
    );
    if (rawHueDiff <= 45 && Math.pow(rawSaturation, 1.3) * 1.2 > bestScore) {
      bestColor = rawDominant;
    }
  }

  return ensureMinimumBrightness(bestColor);
}

/* ─── Extraction Methods ─── */

function extractWithColorThief(imgEl: HTMLImageElement): RGB | null {
  if (typeof (window as any).ColorThief === 'undefined') return null;
  try {
    const colorThief = new ((window as any).ColorThief as typeof ColorThief)();
    const rawDominant = colorThief.getColor(imgEl);
    const palette = colorThief.getPalette(imgEl, 16);
    if (!rawDominant || !palette || !palette.length) return null;
    if (isGrayscale(rawDominant[0], rawDominant[1], rawDominant[2])) return [128, 128, 128];
    return analyzeColorPalette(palette, rawDominant);
  } catch {
    return null;
  }
}

function extractWithCanvas(imgEl: HTMLImageElement): RGB | null {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return null;

    const size = 56;
    canvas.width = size;
    canvas.height = size;
    context.drawImage(imgEl, 0, 0, size, size);

    const data = context.getImageData(0, 0, size, size).data;
    const buckets: Record<string, { weight: number; sum: number[]; count: number }> = {};
    const fallbackSum = [0, 0, 0];
    let fallbackCount = 0;

    for (let i = 0; i < data.length; i += 16) {
      const alpha = data[i + 3];
      if (alpha < 180) continue;

      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const luminance = getRelativeLuminance(red, green, blue);
      if (luminance < 0.03 || luminance > 0.95) continue;

      fallbackSum[0] += red;
      fallbackSum[1] += green;
      fallbackSum[2] += blue;
      fallbackCount += 1;

      const bucketKey =
        Math.round(red / 24) * 24 +
        ':' +
        Math.round(green / 24) * 24 +
        ':' +
        Math.round(blue / 24) * 24;

      if (!buckets[bucketKey]) {
        buckets[bucketKey] = { weight: 0, sum: [0, 0, 0], count: 0 };
      }

      const saturation = getSaturation(red, green, blue);
      let score = saturation < 0.1 ? 0.02 : Math.pow(saturation, 1.4);
      if (luminance < 0.1) score *= 0.5;
      if (luminance > 0.85) score *= 0.4;

      buckets[bucketKey].weight += score;
      buckets[bucketKey].sum[0] += red;
      buckets[bucketKey].sum[1] += green;
      buckets[bucketKey].sum[2] += blue;
      buckets[bucketKey].count += 1;
    }

    const bucketValues = Object.keys(buckets).map((key) => buckets[key]);
    if (!bucketValues.length) {
      if (!fallbackCount) return null;
      return ensureMinimumBrightness([
        Math.round(fallbackSum[0] / fallbackCount),
        Math.round(fallbackSum[1] / fallbackCount),
        Math.round(fallbackSum[2] / fallbackCount),
      ]);
    }

    bucketValues.sort((a, b) => b.weight - a.weight);

    const bestBucket = bucketValues[0];
    return ensureMinimumBrightness([
      Math.round(bestBucket.sum[0] / bestBucket.count),
      Math.round(bestBucket.sum[1] / bestBucket.count),
      Math.round(bestBucket.sum[2] / bestBucket.count),
    ]);
  } catch {
    return null;
  }
}

/* ─── Theme Application ─── */

interface TintValues {
  primary: RGB;
  primaryLight: RGB;
  primaryDark: RGB;
  onPrimary: RGB;
  tintHsl: { h: number; s: number; l: number };
  opacities: { tint: number; strong: number; bg: number };
}

function generateTintValues(dominant: RGB, isDarkTheme: boolean): TintValues {
  const bgLuminances = getThemeBackgroundLuminances();
  const primary = adjustForReadability(dominant, isDarkTheme, bgLuminances);
  const primaryLight = ensureWcagContrast(lighten(primary, 0.3), bgLuminances, isDarkTheme);
  const primaryDark = ensureWcagContrast(darken(primary, 0.2), bgLuminances, isDarkTheme);
  const onPrimary = getAccessibleOnPrimary(primary);
  const hsl = rgbToHsl(dominant[0], dominant[1], dominant[2]);
  const saturation = hsl[1];
  const isGrayscaleColor = saturation < 15;
  const tintS = isGrayscaleColor
    ? saturation
    : isDarkTheme
      ? Math.max(saturation, 40)
      : Math.min(Math.max(saturation, 30), 50);
  const tintL = isDarkTheme ? 55 : 75;

  return {
    primary,
    primaryLight,
    primaryDark,
    onPrimary,
    tintHsl: { h: hsl[0], s: tintS, l: tintL },
    opacities: {
      tint: isDarkTheme ? 0.18 : 0.12,
      strong: isDarkTheme ? 0.28 : 0.18,
      bg: isDarkTheme ? 0.1 : 0.06,
    },
  };
}

export function applyTheme(dominant: RGB): void {
  const isDarkTheme = document.documentElement.classList.contains('dark');
  const tintValues = generateTintValues(dominant, isDarkTheme);
  const el = document.documentElement;

  el.style.setProperty('--be-primary', rgbToCss(tintValues.primary));
  el.style.setProperty('--be-primary-light', rgbToCss(tintValues.primaryLight));
  el.style.setProperty('--be-primary-dark', rgbToCss(tintValues.primaryDark));
  el.style.setProperty('--be-on-primary', rgbToCss(tintValues.onPrimary));
  el.style.setProperty(
    '--dynamic-tint',
    `hsl(${tintValues.tintHsl.h}deg ${tintValues.tintHsl.s}% ${tintValues.tintHsl.l}% / ${tintValues.opacities.tint})`
  );
  el.style.setProperty(
    '--dynamic-tint-strong',
    `hsl(${tintValues.tintHsl.h}deg ${tintValues.tintHsl.s}% ${tintValues.tintHsl.l}% / ${tintValues.opacities.strong})`
  );
  el.style.setProperty(
    '--dynamic-bg-tint',
    `hsl(${tintValues.tintHsl.h}deg ${tintValues.tintHsl.s}% ${tintValues.tintHsl.l}% / ${tintValues.opacities.bg})`
  );
}

export function getConfiguredImagePrimary(url: string): RGB | null {
  const configured = PRECOMPUTED_IMAGE_COLORS[url];
  return configured ? ([...configured] as RGB) : null;
}

export function extractColors(imgEl: HTMLImageElement, headerImageUrl: string): RGB {
  const dominant: RGB =
    extractWithColorThief(imgEl) ||
    getConfiguredImagePrimary(headerImageUrl) ||
    extractWithCanvas(imgEl) ||
    ([...DEFAULT_DYNAMIC_PRIMARY] as RGB);
  applyTheme(dominant);
  return dominant;
}
