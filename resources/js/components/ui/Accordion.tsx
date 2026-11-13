import { KeyboardArrowDownIcon } from '@/components/icons/material/KeyboardArrowDown';
import React, { useId, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

type Item = { id: string; label: string; content: ReactNode };
export function Accordion({ items }: { items: Item[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const prefix = useId();
  const reduced = useReducedMotionPreference();
  return <div className="bp-accordion">{items.map((item, index) => {
    const open = expanded === item.id;
    const buttonId = `${prefix}-${item.id}-button`;
    const panelId = `${prefix}-${item.id}-panel`;
    return <div className="bp-accordion-item" key={item.id}>
      <h3><button type="button" ref={node => { buttons.current[index] = node; }} id={buttonId} aria-controls={panelId}
        aria-expanded={open} onClick={() => setExpanded(open ? null : item.id)} onKeyDown={event => {
          let target: number | undefined;
          if (event.key === 'ArrowDown') target = (index + 1) % items.length;
          if (event.key === 'ArrowUp') target = (index + items.length - 1) % items.length;
          if (event.key === 'Home') target = 0;
          if (event.key === 'End') target = items.length - 1;
          if (target !== undefined) { event.preventDefault(); buttons.current[target]?.focus(); }
        }}><span>{item.label}</span><KeyboardArrowDownIcon size="md" className={open ? 'is-expanded' : ''} /></button></h3>
      <motion.div id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!open}
        {...(!open ? { inert: '' } : {})} initial={false} animate={open ? 'open' : 'closed'}
        variants={{ open: { height: 'auto', opacity: 1, visibility: 'visible' }, closed: { height: 0, opacity: 0, transitionEnd: { visibility: 'hidden' } } }}
        transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }} className="bp-accordion-panel">
        <div className="bp-accordion-body">{item.content}</div>
      </motion.div>
    </div>;
  })}</div>;
}
