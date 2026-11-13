import React, { useState } from 'react';
import { ArrowForwardIcon } from '@/components/icons/material/ArrowForward';
import { Button } from '@/components/ui/Button';
import { ChannelCarousel } from '@/components/ui/ChannelCarousel';
import { useRssFeed } from '@/hooks/useRssFeed';
import { fetchBlogFeed, type BlogPost } from '@/utils/rssFeed';

function ArticleCard({ post }: { post: BlogPost }) {
  const [failed, setFailed] = useState(false);
  const published = new Date(post.pubDate);
  const date = Number.isNaN(published.getTime()) ? null : published;
  return <article className="journal-article">
    <a href={post.link} className="journal-article-link">
      <div className="journal-image">{post.image && !failed ? <img src={post.image} alt="" width="800" height="600" loading="lazy" onError={() => setFailed(true)} /> : <span className="journal-image-fallback" aria-hidden="true">BeatPass journal</span>}</div>
      <div className="journal-copy">
        <h3>{post.title}</h3>
        {post.description && <p>{post.description}</p>}
        <div className="journal-meta">{date && <time dateTime={date.toISOString()}>{date.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</time>}<span className="journal-read">Read article<ArrowForwardIcon size="xs" /></span></div>
      </div>
    </a>
  </article>;
}

export default function Journal() {
  const { data: posts, loading, error, retry } = useRssFeed<BlogPost[]>(fetchBlogFeed);
  return <section id="journal" className="landing-shell landing-section">
    <ChannelCarousel title="In the loop." description="Ideas, practical guides and news for your next release." label="articles"
      action={<Button href="https://blog.beatpass.ca" variant="link" color="primary" size="sm">Read the journal</Button>}>
      {loading && [0, 1, 2].map(index => <div key={index} className="journal-skeleton" aria-hidden="true" />)}
      {!loading && !error && posts?.map(post => <ArticleCard key={post.link} post={post} />)}
    </ChannelCarousel>
    {loading && <p role="status" className="sr-only">Loading articles…</p>}
    {error && <div className="landing-feed-message" role="status"><p>Articles couldn’t load. You can try again or visit the journal.</p><Button variant="outline" onClick={retry}>Try again</Button></div>}
    {!loading && !error && (!posts || posts.length === 0) && <p className="landing-feed-message">New articles are on the way. Explore more on the journal.</p>}
  </section>;
}
