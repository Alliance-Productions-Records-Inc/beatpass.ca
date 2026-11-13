import React, { useId, useState } from 'react';
import { KeyboardArrowDownIcon } from '@/components/icons/material/KeyboardArrowDown';
import { SEARCH_CHIPS } from '@/config/search-chips';

export default function SearchSuggestions() {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const genres = SEARCH_CHIPS.filter(chip => chip.type === 'genre');
  const tags = SEARCH_CHIPS.filter(chip => chip.type === 'tag');
  const chip = (item: typeof SEARCH_CHIPS[number]) => <a key={item.href} href={item.href}><span className="search-chip-face">{item.type === 'tag' && <span aria-hidden="true">#</span>}{item.label}</span></a>;
  return <nav aria-label="Explore genres and tags" className="search-chips" data-expanded={expanded}>
    {genres.map(chip)}{tags.slice(0, 3).map(chip)}
    <span id={id} className="search-extra-tags">{tags.slice(3).map(chip)}</span>
    <button type="button" className="search-tags-toggle" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)}>
      {expanded ? 'Fewer tags' : 'More tags'}<KeyboardArrowDownIcon size="xs" />
    </button>
  </nav>;
}
