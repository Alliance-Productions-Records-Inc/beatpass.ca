// One controller for the landing's document scroll, independent of React renders.
export function attachParallax(node: HTMLElement): () => void {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let disposed = false;
  const update = () => {
    frame = 0;
    if (disposed) return;
    const y = Math.max(0, window.scrollY);
    const reduced = preference.matches;
    node.dataset.motion = reduced ? 'still' : 'parallax';
    node.dataset.suspended = String(document.hidden || y >= 1100);
    node.style.setProperty('--parallax-offset', `${reduced ? 0 : Math.min(y, 1100) * 0.35}px`);
    node.style.setProperty('--scene-opacity', String(reduced ? 1 : Math.max(0, Math.min(1, (1100 - y) / 600))));
  };
  const schedule = () => {
    if (!frame && !document.hidden && !preference.matches && !disposed) frame = requestAnimationFrame(update);
  };
  const reset = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    update();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  document.addEventListener('visibilitychange', reset);
  preference.addEventListener('change', reset);
  update();
  return () => {
    disposed = true;
    window.removeEventListener('scroll', schedule);
    document.removeEventListener('visibilitychange', reset);
    preference.removeEventListener('change', reset);
    if (frame) cancelAnimationFrame(frame);
  };
}
