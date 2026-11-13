export interface LandingRailEdgeFades {
  left: number;
  right: number;
}
interface Bounds {
  left: number;
  right: number;
}
interface Geometry {
  viewport: Bounds;
  items: Bounds[];
  gap: number;
  maxFade: number;
}

export const landingRailEdgeFadeClassName =
  "carousel-mask-container landing-rail-edge-fade";

// Physical edges work for either text direction. Empty spacing beside a partial
// card lets a tiny visible sliver fade gently without veiling its full neighbor.
export function getLandingRailEdgeFades({
  viewport,
  items,
  gap,
  maxFade,
}: Geometry): LandingRailEdgeFades {
  const viewportWidth = viewport.right - viewport.left;
  if (viewportWidth <= 0 || !Number.isFinite(maxFade) || maxFade <= 0)
    return { left: 0, right: 0 };
  const ordered = items
    .filter(
      (item) =>
        Number.isFinite(item.left) &&
        Number.isFinite(item.right) &&
        item.right > item.left,
    )
    .slice()
    .sort((a, b) => a.left - b.left);
  const spacing = Number.isFinite(gap) ? Math.max(0, gap) : 0;
  const leading = ordered.findIndex(
    (item) =>
      item.left < viewport.left - 0.25 && item.right > viewport.left + 0.25,
  );
  const trailing = ordered.findIndex(
    (item) =>
      item.left < viewport.right - 0.25 && item.right > viewport.right + 0.25,
  );
  const width = (index: number, side: "left" | "right") => {
    if (index < 0) return 0;
    const item = ordered[index];
    const adjacent = side === "left" ? ordered[index + 1] : ordered[index - 1];
    const actualGap = adjacent
      ? Math.max(
          0,
          side === "left"
            ? adjacent.left - item.right
            : item.left - adjacent.right,
        )
      : spacing;
    const availableGap = Math.min(spacing, actualGap);
    const hidden =
      side === "left" ? viewport.left - item.left : item.right - viewport.right;
    const visible =
      side === "left"
        ? Math.min(viewport.right, item.right) - viewport.left
        : viewport.right - Math.max(viewport.left, item.left);
    return Math.max(
      0,
      Math.min(
        hidden,
        visible + availableGap,
        maxFade,
        viewportWidth / 4,
        (item.right - item.left) / 2,
      ),
    );
  };
  return { left: width(leading, "left"), right: width(trailing, "right") };
}

// A cosine alpha ramp has soft shoulders at both ends. Only the actually
// cropped fragment and adjacent empty gap are affected; no theme color paints.
export function getLandingRailEdgeMask({ left, right }: LandingRailEdgeFades) {
  const start = Number.isFinite(left) ? Math.max(0, left) : 0;
  const end = Number.isFinite(right) ? Math.max(0, right) : 0;
  if (start <= 0 && end <= 0) return "none";
  const fractions = [0, 0.125, 0.25, 0.5, 0.75, 0.875, 1];
  const round = (value: number) => Math.round(value * 1000) / 1000;
  const alpha = (fraction: number) =>
    round((1 - Math.cos(Math.PI * fraction)) / 2);
  const leading =
    start > 0
      ? fractions.map(
          (fraction) =>
            `rgba(0, 0, 0, ${alpha(fraction)}) ${round(start * fraction)}px`,
        )
      : ["black 0px"];
  const trailing =
    end > 0
      ? fractions.map(
          (fraction) =>
            `rgba(0, 0, 0, ${alpha(1 - fraction)}) calc(100% - ${round(
              end * (1 - fraction),
            )}px)`,
        )
      : ["black 100%"];
  return `linear-gradient(to right, ${[...leading, ...trailing].join(", ")})`;
}
