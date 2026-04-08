import React from 'react';
import { useRssFeed } from '@/hooks/useRssFeed';
import { fetchYouTubeFeed, YouTubeVideo } from '@/utils/rssFeed';

const RecentVideos: React.FC = () => {
  const { data: videos, loading, error } = useRssFeed<YouTubeVideo[]>(fetchYouTubeFeed);

  if (loading) {
    return (
      <section className="py-48 md:py-64 relative z-10">
        <div className="max-w-6xl mx-auto px-16 md:px-24">
          <div className="text-center mb-32 md:mb-48">
            <span className="section-label mb-16 md:mb-20">Recent Videos</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">From Our YouTube</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-panel bg-alt border border-divider animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 mt-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-panel bg-alt border border-divider animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !videos || videos.length === 0) return null;

  return (
    <section className="py-48 md:py-64 relative z-10" aria-labelledby="videos-heading">
      <div className="max-w-6xl mx-auto px-16 md:px-24">
        <div className="text-center mb-32 md:mb-48">
          <span className="section-label mb-16 md:mb-20">Recent Videos</span>
          <h2 id="videos-heading" className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">From Our YouTube</h2>
          <p className="text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">Fresh beats and tutorials from the BeatPass channel.</p>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden -mx-16 px-16">
          <div className="flex gap-12 overflow-x-auto pb-24 snap-x snap-mandatory" role="region" aria-label="Recent videos">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} className="flex-shrink-0 w-[280px] snap-center" />
            ))}
          </div>
        </div>

        {/* Desktop: top row 2 featured + bottom row 3 */}
        <div className="hidden md:block space-y-16">
          <div className="grid grid-cols-2 gap-16">
            {videos.slice(0, 2).map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
          {videos.length > 2 && (
            <div className="grid grid-cols-3 gap-16">
              {videos.slice(2, 5).map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-32">
          <a href="https://www.youtube.com/@beatpasswav" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-md rounded-button">
            View Channel
            <svg className="svg-icon icon-end icon-sm" viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

const VideoCard: React.FC<{ video: YouTubeVideo; className?: string }> = ({ video, className = '' }) => (
  <a
    href={video.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group block ${className}`}
  >
    <div className="rounded-panel overflow-hidden border border-divider hover:border-primary/30 transition-all duration-300 bg-paper">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-48 h-48 rounded-full bg-white/90 flex items-center justify-center">
            <svg className="svg-icon text-black" style={{ fontSize: 24, marginLeft: 2 }} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
      <div className="p-12">
        <h3 className="text-sm font-semibold text-main leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {video.title}
        </h3>
      </div>
    </div>
  </a>
);

export default RecentVideos;
