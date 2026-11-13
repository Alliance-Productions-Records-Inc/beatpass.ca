import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { IconButton } from './Button';
import { KeyboardArrowLeftIcon } from '@/components/icons/material/KeyboardArrowLeft';
import { KeyboardArrowRightIcon } from '@/components/icons/material/KeyboardArrowRight';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { getLandingRailEdgeFades, getLandingRailEdgeMask } from '@/utils/rail-edge-fade';
import { ChannelCarouselViewport } from './ChannelCarouselViewport';

type Props = { title: string; description?: string; action?: ReactNode; children: ReactNode; mobileOnly?: boolean; label: string };

// The player's native channel layout, without its track/license/filter providers.
export function ChannelCarousel({ title, description, action, children, mobileOnly = false, label }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const id = useId();
  const reduced = useReducedMotionPreference();
  const [navigation, setNavigation] = useState({ overflow: false, previous: false, next: false });
  const measure = useCallback(() => {
    const node = viewport.current;
    if (!node) return;
    if (mask.current) {
      const style = getComputedStyle(mask.current);
      const fades = getLandingRailEdgeFades({
        viewport: mask.current.getBoundingClientRect(),
        items: Array.from(node.children).map(item => item.getBoundingClientRect()),
        gap: parseFloat(getComputedStyle(node).columnGap),
        maxFade: parseFloat(style.getPropertyValue('--mask-width')),
      });
      mask.current.style.setProperty('--landing-rail-edge-mask', getLandingRailEdgeMask(fades));
      mask.current.dataset.fadeLeft = String(fades.left);
      mask.current.dataset.fadeRight = String(fades.right);
    }
    const overflow = node.scrollWidth > node.clientWidth + 1;
    const previous = overflow && node.scrollLeft > 1;
    const next = overflow && node.scrollWidth - node.scrollLeft > node.clientWidth + 1;
    setNavigation(current => current.overflow === overflow && current.previous === previous && current.next === next ? current : { overflow, previous, next });
  }, []);

  useLayoutEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (mask.current) observer.observe(mask.current);
    if (node.firstElementChild) observer.observe(node.firstElementChild);
    measure();
    return () => observer.disconnect();
  }, [children, measure]);

  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    let frame = 0;
    const update = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; measure(); }); };
    node.addEventListener('scroll', update, { passive: true });
    return () => { node.removeEventListener('scroll', update); if (frame) cancelAnimationFrame(frame); };
  }, [measure]);

  const move = (direction: number) => {
    const node = viewport.current;
    if (!node) return;
    const first = node.children.item(0) as HTMLElement | null;
    const second = node.children.item(1) as HTMLElement | null;
    const step = first && second ? second.offsetLeft - first.offsetLeft : node.clientWidth;
    const count = Math.max(1, Math.floor(node.clientWidth / step) - 1);
    node.scrollBy({ left: direction * step * count, behavior: reduced ? 'auto' : 'smooth' });
  };

  return <div className={`channel-carousel${mobileOnly ? ' channel-carousel-mobile' : ''}`} role="region" aria-roledescription="carousel" aria-labelledby={`${id}-heading`}>
    <div className="channel-carousel-heading">
      <div className="landing-section-heading"><h2 id={`${id}-heading`}>{title}</h2>{description && <p>{description}</p>}</div>
      <div className="channel-carousel-actions">{action}{navigation.overflow && <div className="channel-carousel-controls">
        <IconButton aria-label={`Previous ${label}`} aria-controls={`${id}-viewport`} disabled={!navigation.previous} onClick={() => move(-1)}><KeyboardArrowLeftIcon /></IconButton>
        <IconButton aria-label={`Next ${label}`} aria-controls={`${id}-viewport`} disabled={!navigation.next} onClick={() => move(1)}><KeyboardArrowRightIcon /></IconButton>
      </div>}</div>
    </div>
    <div ref={mask} className="channel-carousel-mask landing-rail-edge-fade" data-can-previous={navigation.previous} data-can-next={navigation.next}
      onFocusCapture={() => { if (mask.current) mask.current.dataset.landingRailFocus = 'true'; }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) delete event.currentTarget.dataset.landingRailFocus; }}>
    <ChannelCarouselViewport role="group" id={`${id}-viewport`} ref={viewport} tabIndex={0} aria-label={label} className="channel-carousel-viewport" onKeyDown={event => {
      if (event.target !== event.currentTarget || !navigation.overflow) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
      if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); event.currentTarget.scrollTo({ left: event.key === 'Home' ? 0 : event.currentTarget.scrollWidth, behavior: reduced ? 'auto' : 'smooth' }); }
    }}>{children}</ChannelCarouselViewport>
    </div>
  </div>;
}
