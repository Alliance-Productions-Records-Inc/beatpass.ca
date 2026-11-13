export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

export interface ChangelogEntry {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  contentHtml: string;
}

export async function fetchBlogFeed(): Promise<BlogPost[]> {
  const res = await fetch('/api/blog-feed');
  if (!res.ok) throw new Error('Failed to fetch blog feed');
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  if (xml.querySelector('parsererror')) throw new Error('Feed contains invalid XML');
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

  return posts.slice(0, 12);
}

export async function fetchChangelogFeed(): Promise<ChangelogEntry[]> {
  const res = await fetch('/api/changelog-feed');
  if (!res.ok) throw new Error('Failed to fetch changelog feed');
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'application/xml');
  if (xml.querySelector('parsererror')) throw new Error('Feed contains invalid XML');
  const items = xml.querySelectorAll('item');

  const entries: ChangelogEntry[] = [];
  items.forEach((item) => {
    const categories: string[] = [];
    item.querySelectorAll('category').forEach((cat) => {
      if (cat.textContent) categories.push(cat.textContent);
    });

    const rawHtml =
      item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0]?.textContent ?? '';

    // Rewrite relative hrefs to point to docs.beatpass.ca (both quote styles)
    const contentHtml = rawHtml.replace(/href=(["'])\//g, 'href=$1https://docs.beatpass.ca/');

    entries.push({
      title: item.querySelector('title')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
      pubDate: item.querySelector('pubDate')?.textContent ?? '',
      categories,
      contentHtml,
    });
  });

  return entries.slice(0, 20);
}
