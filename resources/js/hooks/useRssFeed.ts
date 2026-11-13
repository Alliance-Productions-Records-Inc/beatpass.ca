import { useState, useEffect, useCallback } from 'react';

type FeedState<T> = { data: T | null; loading: boolean; error: string | null; retry: () => void };

export function useRssFeed<T>(fetcher: () => Promise<T>): FeedState<T> {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<Omit<FeedState<T>, 'retry'>>({ data: null, loading: true, error: null });
  const retry = useCallback(() => {
    setState(previous => ({ ...previous, loading: true, error: null }));
    setAttempt(previous => previous + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch(error => { if (!cancelled) setState(previous => ({ ...previous, loading: false, error: error instanceof Error ? error.message : 'Feed unavailable' })); });
    return () => { cancelled = true; };
  }, [fetcher, attempt]);

  return { ...state, retry };
}
