import { useEffect, useRef, useState } from 'react';

/**
 * Returns true only if `isLoading` has been true for longer than `delay` ms.
 * If the operation finishes before the delay, the loader is never shown.
 */
export function useDelayedLoader(isLoading: boolean, delay = 2000): boolean {
  const [showLoader, setShowLoader] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      timerRef.current = setTimeout(() => setShowLoader(true), delay);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setShowLoader(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isLoading, delay]);

  return showLoader;
}
