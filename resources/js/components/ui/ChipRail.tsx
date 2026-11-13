import React, { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

// Landing adapter of the app's ScrollableChipNav: native touch scrolling, 24px
// alpha fades, observed bounds and keyboard focus reveal. No selection runtime.
export function ChipRail({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
  const rail = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const sync = () => {
    const node = rail.current;
    if (!node) return;
    const left = node.scrollLeft > 4;
    const right = node.scrollWidth - node.clientWidth - node.scrollLeft > 4;
    setEdges(current => current.left === left && current.right === right ? current : { left, right });
  };
  useLayoutEffect(() => {
    const node = rail.current;
    if (!node) return;
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    Array.from(node.children).forEach(child => observer.observe(child));
    sync();
    return () => observer.disconnect();
  }, [children]);
  return <nav ref={rail} aria-label={label} className={`chip-rail ${className}`} data-fade-left={edges.left} data-fade-right={edges.right}
    onScroll={sync} onFocusCapture={event => {
      if (!event.target.matches(':focus-visible')) return;
      const node = event.currentTarget;
      const bounds = node.getBoundingClientRect();
      const item = event.target.getBoundingClientRect();
      const inset = Math.min(28, Math.max(0, (node.clientWidth - item.width) / 2));
      if (item.left < bounds.left + inset) node.scrollLeft += item.left - bounds.left - inset;
      else if (item.right > bounds.right - inset) node.scrollLeft += item.right - bounds.right + inset;
      sync();
    }}>{children}</nav>;
}
