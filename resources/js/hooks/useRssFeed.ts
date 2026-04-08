import { useState, useEffect } from 'react';

type FeedState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useRssFeed<T>(fetcher: () => Promise<T>): FeedState<T> {
  const [state, setState] = useState<FeedState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
