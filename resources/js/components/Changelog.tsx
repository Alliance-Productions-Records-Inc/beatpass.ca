import React from 'react';
import DOMPurify from 'dompurify';
import { useRssFeed } from '@/hooks/useRssFeed';
import { fetchChangelogFeed, ChangelogEntry } from '@/utils/rssFeed';
import { useThemeContext } from '@/contexts/ThemeContext';
import Footer from './landing/Footer';
import { ArrowBackIcon } from '@/components/icons/material/ArrowBack';
import { ArrowForwardIcon } from '@/components/icons/material/ArrowForward';
import { DarkModeIcon } from '@/components/icons/material/DarkMode';
import { LightbulbIcon } from '@/components/icons/material/Lightbulb';

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
        <ArrowForwardIcon size="xs" />
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
      <div className="landing-shell py-48 md:py-64">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <a
            href="/"
            className="inline-flex items-center gap-6 text-sm text-muted hover:text-main transition-colors"
          >
            <ArrowBackIcon size="xs" />
            Back to home
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-36 h-36 rounded-full flex items-center justify-center text-muted hover:text-main hover:bg-hover transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <DarkModeIcon size="sm" />
            ) : (
              <LightbulbIcon size="sm" />
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
      <Footer />
    </div>
  );
};

export default Changelog;
