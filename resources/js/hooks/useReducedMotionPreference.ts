import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (notify: () => void) => {
  const preference = window.matchMedia(query);
  preference.addEventListener('change', notify);
  return () => preference.removeEventListener('change', notify);
};
const getSnapshot = () => window.matchMedia(query).matches;

// Framer Motion 10's hook snapshots the preference at mount; follow runtime changes too.
export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
