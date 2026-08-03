import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean: element becomes `true` once it enters the viewport.
 * Uses a single IntersectionObserver per call (very cheap).
 */
export function useReveal<T extends Element = HTMLDivElement>(
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px"
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect(); // fire once
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible] as const;
}
