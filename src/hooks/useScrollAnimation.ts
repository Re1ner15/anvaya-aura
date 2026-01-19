import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): [RefObject<T>, boolean, 'up' | 'down' | null] => {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px', triggerOnce = false } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce && hasAnimated) return;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) setHasAnimated(true);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return [ref, isVisible, scrollDirection];
};

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

export const useCounter = (
  end: number,
  duration: number = 2000,
  start: number = 0,
  isVisible: boolean = true
) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!isVisible) {
      setCount(start);
      return;
    }

    const startTime = performance.now();
    const diff = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      countRef.current = start + diff * eased;
      setCount(Math.round(countRef.current));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start, isVisible]);

  return count;
};
