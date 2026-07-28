import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

/** Reads whatever the pre-paint script in index.html already decided. */
function readInitial() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.backgroundColor = theme === "dark" ? "#0a0a0a" : "#faf9f7";
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* private mode — the class swap above still works for this session */
    }
  }, [theme]);

  // Follow the OS only while the visitor has never made an explicit choice.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch (err) {
        /* ignore */
      }
      setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  return { theme, toggleTheme };
}
