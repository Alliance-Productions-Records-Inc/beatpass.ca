import React from 'react';
import { useRssFeed } from '@/hooks/useRssFeed';
import { fetchBlogFeed, BlogPost } from '@/utils/rssFeed';

const FromTheBlog: React.FC = () => {
  const { data: posts, loading, error } = useRssFeed<BlogPost[]>(fetchBlogFeed);

  if (loading) {
    return (
      <section className="py-48 md:py-64 relative z-10">
        <div className="max-w-6xl mx-auto px-16 md:px-24">
          <div className="text-center mb-32 md:mb-48">
            <span className="section-label mb-16 md:mb-20">Blog</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">From the Blog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 rounded-panel bg-alt border border-divider animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-48 md:py-64 relative z-10" aria-labelledby="blog-heading">
      <div className="max-w-6xl mx-auto px-16 md:px-24">
        <div className="text-center mb-32 md:mb-48">
          <span className="section-label mb-16 md:mb-20">Blog</span>
          <h2 id="blog-heading" className="text-2xl md:text-4xl font-bold mb-12 md:mb-16 text-main leading-tight">From the Blog</h2>
          <p className="text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">Tips, insights, and updates for artists and producers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {displayPosts.map((post) => (
            <BlogCard key={post.link} post={post} />
          ))}
        </div>

        <div className="text-center mt-32">
          <a href="https://blog.beatpass.ca" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-md rounded-button">
            Read More
            <svg className="svg-icon icon-end icon-sm" viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const date = post.pubDate
    ? new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="h-full rounded-panel bg-paper border border-divider hover:border-primary/30 transition-all duration-300 overflow-hidden">
        {post.image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-col h-full p-20">
          {date && <span className="text-xs text-muted mb-8">{date}</span>}
          <h3 className="text-base font-semibold text-main leading-snug mb-8 group-hover:text-primary transition-colors duration-300 line-clamp-3">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-sm text-muted leading-relaxed mb-12 line-clamp-2">{post.description}</p>
          )}
          <div className="mt-auto flex items-center gap-6 text-sm font-semibold text-primary">
            Read article
            <svg className="svg-icon icon-sm group-hover:translate-x-4 transition-transform duration-300" viewBox="0 0 24 24"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>
          </div>
        </div>
      </div>
    </a>
  );
};

export default FromTheBlog;
