import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const scrollToTarget = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return false;
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      return true;
    };

    if (scrollToTarget()) return;

    const root = document.getElementById("root") ?? document.body;
    const observer = new MutationObserver(() => {
      if (scrollToTarget()) {
        observer.disconnect();
        window.clearTimeout(timeoutId);
      }
    });
    observer.observe(root, { childList: true, subtree: true });
    const timeoutId = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [pathname, hash]);

  return null;
}
