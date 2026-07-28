import { useEffect, useState } from "react";

/**
 * Subscribes to a media query and re-renders on change.
 * SSR/first-paint safe: reads synchronously during the initial state.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the visitor has asked the OS to minimise animation. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True only for precise pointers (mouse/trackpad) on a wide viewport.
 * Gates every cursor-driven flourish so touch devices get the calm version.
 */
export function usePointerFine() {
  const fine = useMediaQuery("(pointer: fine)");
  const wide = useMediaQuery("(min-width: 1024px)");
  return fine && wide;
}
