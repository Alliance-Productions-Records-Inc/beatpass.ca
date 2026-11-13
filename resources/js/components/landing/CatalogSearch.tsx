import SearchSuggestions from './SearchSuggestions';
import { AudiotrackIcon } from '@/components/icons/material/Audiotrack';
import { PersonIcon } from '@/components/icons/material/Person';
import { AlbumIcon } from '@/components/icons/material/Album';
import { QueueMusicIcon } from '@/components/icons/material/QueueMusic';
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { SearchIcon } from '@/components/icons/material/Search';
import { CloseIcon } from '@/components/icons/material/Close';
import { TagIcon } from '@/components/icons/material/Tag';
import { ArrowForwardIcon } from '@/components/icons/material/ArrowForward';
import { searchDestination } from '@/utils/navigation';

const FALLBACK_ICONS = { track: AudiotrackIcon, artist: PersonIcon, album: AlbumIcon, playlist: QueueMusicIcon, tag: TagIcon };

type Result = { id: string; kind: string; title: string; description: string; image: string | null; href: string };
type State = { query: string; items: Result[]; status: 'idle' | 'loading' | 'ready' | 'error' };

export default function CatalogSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [attempt, setAttempt] = useState(0);
  const [placement, setPlacement] = useState({ side: 'bottom', height: 460 });
  const [state, setState] = useState<State>({ query: '', items: [], status: 'idle' });
  const form = useRef<HTMLFormElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const trimmed = query.trim();
  const current = state.query === trimmed;
  const items = current ? state.items : [];
  const expanded = open && trimmed.length >= 3;
  const loading = !current || state.status === 'loading';

  useEffect(() => {
    setActive(-1);
    if (trimmed.length < 3) { setState({ query: trimmed, items: [], status: 'idle' }); return; }
    const controller = new AbortController();
    setState({ query: trimmed, items: [], status: 'loading' });
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?${new URLSearchParams({ query: trimmed })}`, { signal: controller.signal, credentials: 'omit', headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Search unavailable');
        const data = await response.json();
        if (!Array.isArray(data.results)) throw new Error('Invalid search response');
        if (!controller.signal.aborted) setState({ query: trimmed, items: data.results, status: 'ready' });
      } catch (error) {
        if (!controller.signal.aborted) setState({ query: trimmed, items: [], status: 'error' });
      }
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [trimmed, attempt]);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!form.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);

  useLayoutEffect(() => {
    if (!expanded) return;
    const measure = () => {
      const rect = form.current?.getBoundingClientRect();
      if (!rect) return;
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop || 0;
      const bottom = top + (viewport?.height || innerHeight);
      const below = bottom - rect.bottom - 20;
      const above = rect.top - top - 20;
      const side = below >= Math.min(320, above) ? 'bottom' : 'top';
      const height = Math.max(40, Math.min(460, side === 'bottom' ? below : above));
      setPlacement(previous => previous.side === side && previous.height === height ? previous : { side, height });
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    window.visualViewport?.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
      window.visualViewport?.removeEventListener('resize', measure);
    };
  }, [expanded]);

  useEffect(() => {
    if (expanded && active >= 0 && items[active]) document.getElementById(`${id}-${items[active].id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, expanded, items, id]);

  return <div className="landing-search">
    <form ref={form} role="search" onSubmit={event => {
      event.preventDefault();
      window.location.assign(active >= 0 && items[active] ? items[active].href : searchDestination(query));
    }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
      <label htmlFor={`${id}-input`}>Have a sound in mind?</label>
      <div className="catalog-search-control">
        <button type="submit" aria-label="Search"><SearchIcon size="sm" /></button>
        <input ref={input} id={`${id}-input`} type="search" role="combobox" aria-autocomplete="list" aria-expanded={expanded}
          aria-controls={expanded ? `${id}-results` : undefined} aria-activedescendant={expanded && active >= 0 && items[active] ? `${id}-${items[active]?.id}` : undefined}
          name="query" maxLength={120} autoComplete="off" spellCheck={false} placeholder="Search beats, genres, producers…" value={query}
          onChange={event => { setQuery(event.target.value); setOpen(true); setActive(-1); }} onFocus={() => setOpen(true)}
          onKeyDown={event => {
            if (event.key === 'Escape') { event.preventDefault(); setOpen(false); setActive(-1); }
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault(); setOpen(true);
              if (items.length) setActive(index => event.key === 'ArrowDown' ? (index + 1) % items.length : (index <= 0 ? items.length - 1 : index - 1));
            }
          }} />
        {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); setOpen(false); input.current?.focus(); }}><CloseIcon size="sm" /></button>}
      </div>
      {expanded && <div className="catalog-search-popover" data-side={placement.side} style={{ maxHeight: placement.height }}>
        <div id={`${id}-results`} role="listbox" aria-label="Search suggestions" aria-busy={loading}>
          {loading && <p className="catalog-search-message" role="status">Searching the catalog…</p>}
          {!loading && state.status === 'error' && <div className="catalog-search-message" role="status"><p>Search couldn’t load. You can try again or see all results.</p><button type="button" onClick={() => setAttempt(value => value + 1)}>Try again</button></div>}
          {!loading && state.status === 'ready' && items.length === 0 && <p className="catalog-search-message" role="status">No matches yet. Try another sound.</p>}
          {items.map((item, index) => { const FallbackIcon = FALLBACK_ICONS[item.kind] || TagIcon; return <a key={item.id} id={`${id}-${item.id}`} role="option" aria-selected={active === index} tabIndex={-1} href={item.href}
            className="catalog-result" onPointerMove={() => setActive(index)}>
            <span className={`catalog-result-art ${item.kind === 'artist' ? 'is-artist' : ''}`}>{item.image ? <img src={item.image} alt="" width="44" height="44" onError={event => { event.currentTarget.hidden = true; }} /> : <FallbackIcon />}</span>
            <span><span className="catalog-result-title">{item.kind === 'tag' ? '#' : ''}{item.title}</span><span className="catalog-result-detail">{item.description || item.kind}</span></span>
          </a>; })}
        </div>
        <a className="catalog-search-all" href={searchDestination(query)}>See all results<ArrowForwardIcon size="sm" /></a>
      </div>}
    </form>
    <SearchSuggestions />
  </div>;
}
