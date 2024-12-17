import { useState, useEffect, useCallback } from 'react';

// 옵션 타입
interface IntersectionOptions {
  root?: Element | null;
  threshold?: number | number[];
  rootMargin?: string;
}

// 커스텀 훅의 반환 타입

type UseIntersectReturn<T extends HTMLElement> = [
  T | null,
  (node: T | null) => void
];

// 커스텀 훅
const useIntersect = <T extends HTMLElement>(
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void,
  option: IntersectionOptions = {}
): UseIntersectReturn<T> => {
  const [ref, setRef] = useState<T | null>(null);

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
    let observer: IntersectionObserver;

    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
        ...option
      });
      observer.observe(ref);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);

  return [ref, setRef];
};

export default useIntersect;
