import { useEffect, useRef, useCallback } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  root?: Element | null;
  threshold?: number | number[];
  rootMargin?: string;
}

const useIntersect = <T extends HTMLElement>(
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void,
  option: IntersectionOptions = {}
): React.RefObject<T> => {
  const ref = useRef<T>(null);

  const defaultOption: IntersectionOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
  };

  const checkIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(checkIntersect, {
      ...defaultOption,
      ...option
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [option.root, option.threshold, option.rootMargin, checkIntersect]);

  return ref;
};

export default useIntersect;
