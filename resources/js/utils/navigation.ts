export const APP_URLS = {
  discover: 'https://open.beatpass.ca/discover',
  pricing: 'https://open.beatpass.ca/pricing',
  producers: 'https://open.beatpass.ca/producer-program',
  register: 'https://open.beatpass.ca/register',
  login: 'https://open.beatpass.ca/login',
} as const;

export function searchDestination(query: string): string {
  const normalized = query.trim();
  return normalized ? `https://open.beatpass.ca/search/${encodeURIComponent(normalized)}` : APP_URLS.discover;
}
