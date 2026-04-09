import React from 'react';
import DOMPurify from 'dompurify';
import { useRssFeed } from '@/hooks/useRssFeed';
import { fetchChangelogFeed, ChangelogEntry } from '@/utils/rssFeed';
import { useThemeContext } from '@/contexts/ThemeContext';

const CATEGORY_COLORS: Record<string, string> = {
  Feature: 'bg-emerald-500/15 text-emerald-400',
  'Bug Fix': 'bg-red-500/15 text-red-400',
  Improvement: 'bg-blue-500/15 text-blue-400',
  Security: 'bg-amber-500/15 text-amber-400',
  Platform: 'bg-purple-500/15 text-purple-400',
  'UI/UX': 'bg-pink-500/15 text-pink-400',
  Producer: 'bg-cyan-500/15 text-cyan-400',
  Billing: 'bg-orange-500/15 text-orange-400',
  Notifications: 'bg-indigo-500/15 text-indigo-400',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getCategoryClass(cat: string): string {
  return CATEGORY_COLORS[cat] ?? 'bg-white/10 text-muted';
}

const EntryCard: React.FC<{ entry: ChangelogEntry }> = ({ entry }) => (
  <article className="relative pl-24 md:pl-32">
    {/* Timeline dot */}
    <div className="absolute left-0 top-[6px] w-10 h-10 rounded-full bg-primary ring-4 ring-background" />

    <div className="pb-32">
      <time className="block text-xs text-muted mb-6">{formatDate(entry.pubDate)}</time>

      {/* Category badges */}
      {entry.categories.length > 0 && (
        <div className="flex flex-wrap gap-6 mb-10">
          {entry.categories.map((cat) => (
            <span
              key={cat}
              className={`inline-block text-[11px] font-medium px-8 py-2 rounded-full ${getCategoryClass(cat)}`}
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div
        className="changelog-content prose prose-sm prose-invert max-w-none text-muted"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.contentHtml) }}
      />

      <a
        href={entry.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-6 mt-12 text-sm text-primary hover:underline"
      >
        View on docs
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </a>
    </div>
  </article>
);

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-32 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="pl-24 md:pl-32">
        <div className="h-12 w-[120px] bg-white/5 rounded mb-8" />
        <div className="flex gap-6 mb-12">
          <div className="h-20 w-[60px] bg-white/5 rounded-full" />
          <div className="h-20 w-[50px] bg-white/5 rounded-full" />
        </div>
        <div className="h-20 w-3/4 bg-white/5 rounded mb-6" />
        <div className="h-14 w-full bg-white/5 rounded mb-4" />
        <div className="h-14 w-5/6 bg-white/5 rounded" />
      </div>
    ))}
  </div>
);

const Changelog: React.FC = () => {
  const { data: entries, loading, error } = useRssFeed(fetchChangelogFeed);
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <div className="bg-background text-main antialiased min-h-screen">
      <div className="landing-container py-48 md:py-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <a
            href="/"
            className="inline-flex items-center gap-6 text-sm text-muted hover:text-main transition-colors"
          >
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            Back to home
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-36 h-36 rounded-full flex items-center justify-center text-muted hover:text-main hover:bg-hover transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-18 h-18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.43 2.3c-2.38-.59-4.68-.29-6.63.64-.35.17-.37.66-.04.86C7.55 5 8.7 6.74 9.15 8.78c.94 4.2-1.63 8.39-5.72 9.58-.37.11-.53.54-.32.86C4.63 21.35 7.26 23 10.35 23c5.24 0 9.5-4.26 9.5-9.5 0-5.19-4.18-10.2-7.42-11.2zM10.35 21c-1.9 0-3.64-.78-4.97-2.04 3.77-1.53 6.31-5.29 5.92-9.51-.18-1.92-1-3.63-2.25-4.95 1.4-.23 2.86-.03 4.19.55C16.09 6.42 17.85 10 17.85 13.5c0 4.13-3.37 7.5-7.5 7.5z" />
              </svg>
            ) : (
              <svg className="w-18 h-18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
              </svg>
            )}
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">Changelog</h1>
        <p className="text-muted mb-32 md:mb-48 max-w-[540px]">
          All BeatPass platform updates, new features, and improvements in one place.
        </p>

        {/* Timeline */}
        {loading && <LoadingSkeleton />}

        {error && (
          <p className="text-red-400 text-sm">Failed to load changelog. Please try again later.</p>
        )}

        {entries && entries.length > 0 && (
          <div className="relative border-l border-divider ml-4 md:ml-4">
            {entries.map((entry, i) => (
              <EntryCard key={`${entry.link}-${i}`} entry={entry} />
            ))}
          </div>
        )}

        {entries && entries.length === 0 && (
          <p className="text-muted text-sm">No changelog entries yet.</p>
        )}

        {/* Footer link */}
        <div className="mt-48 pt-24 border-t border-divider text-center">
          <a
            href="https://docs.beatpass.ca/release-notes/changelog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View full changelog on docs →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
