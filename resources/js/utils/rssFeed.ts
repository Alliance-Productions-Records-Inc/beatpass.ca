export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  published: string;
}

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

export async function fetchYouTubeFeed(): Promise<YouTubeVideo[]> {
  const res = await fetch('/api/youtube-feed');
  if (!res.ok) throw new Error('Failed to fetch YouTube feed');
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  const entries = xml.querySelectorAll('entry');

  const videos: YouTubeVideo[] = [];
  entries.forEach((entry) => {
    const id = entry.querySelector('yt\\:videoId, videoId')?.textContent ?? '';
    const title = entry.querySelector('title')?.textContent ?? '';
    const published = entry.querySelector('published')?.textContent ?? '';
    const linkEl = entry.querySelector('link[rel="alternate"]');
    const href = linkEl?.getAttribute('href') ?? '';

    // Filter Shorts: primary check is the URL containing /shorts/, secondary is #shorts in title
    if (href.includes('/shorts/') || title.toLowerCase().includes('#shorts')) return;

    videos.push({
      id,
      title,
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      url: href || `https://www.youtube.com/watch?v=${id}`,
      published,
    });
  });

  // Sort chronologically (newest first)
  videos.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

  return videos.slice(0, 10);
}

export async function fetchBlogFeed(): Promise<BlogPost[]> {
  const res = await fetch('/api/blog-feed');
  if (!res.ok) throw new Error('Failed to fetch blog feed');
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  const items = xml.querySelectorAll('item');

  const posts: BlogPost[] = [];
  items.forEach((item) => {
    const encoded = item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0]?.textContent ?? '';
    const description = item.querySelector('description')?.textContent ?? '';

    // Extract featured image from <media:content url="..." medium="image"/>
    const mediaContent = item.querySelector('content[medium="image"]');
    let image = mediaContent?.getAttribute('url') ?? '';

    // Fallback: parse first <img src> from <content:encoded>
    if (!image) {
      const imgMatch = encoded.match(/<img[^>]+src=["']([^"']+)["']/);
      if (imgMatch) image = imgMatch[1];
    }

    // Strip HTML tags from description for clean display
    const cleanDescription = description.replace(/<[^>]+>/g, '').trim();

    posts.push({
      title: item.querySelector('title')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
      pubDate: item.querySelector('pubDate')?.textContent ?? '',
      description: cleanDescription,
      image: image || undefined,
    });
  });

  return posts.slice(0, 6);
}
