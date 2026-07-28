import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "../data/site";

const SECTIONS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
];

const EXTERNAL = [
  { label: "GitHub", href: "https://github.com/AchrafMez" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ashrafmeziouni" },
  { label: "Résumé", href: site.resume },
];

function ThemeToggle({ theme, toggleTheme }) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="link"
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      aria-pressed={dark}
      className="relative h-7 w-[3.25rem] rounded-full border border-line bg-surface transition-colors duration-300"
      style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
    >
      <span
        className="absolute top-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-fg transition-transform duration-500 ease-out"
        style={{
          left: "3px",
          transform: `translate3d(${dark ? "1.5rem" : "0"}, -50%, 0)`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgb(var(--bg))"
          strokeWidth="2"
          className="h-3 w-3"
          aria-hidden="true"
        >
          {dark ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1.5m6.364 1.136-1.06 1.06M21 12h-1.5m-1.136 6.364-1.06-1.06M12 19.5V21m-5.303-3.697-1.061 1.061M4.5 12H3m3.697-5.303-1.061-1.06M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z"
            />
          )}
        </svg>
      </span>
    </button>
  );
}

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet whenever navigation happens.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Lock the page behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Link
        to="/work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-fg focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bg"
      >
        Skip to content
      </Link>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          <Link
            to="/"
            data-cursor="link"
            className="font-display text-lg font-semibold tracking-tightest"
            aria-label={`${site.name} — home`}
          >
            {site.initials}
            <span className="text-faint">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {SECTIONS.map((item) => (
              /* Link, not <a> — a plain href to a real path would reload the app
                 before the scroll could happen. */
              <Link
                key={item.label}
                to={item.href}
                data-cursor="link"
                className="link-underline font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}

            <span className="h-4 w-px bg-line" aria-hidden="true" />

            {EXTERNAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                className="link-underline font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-7 w-7 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className="block h-px w-5 bg-fg transition-transform duration-300"
                style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-px w-5 bg-fg transition-transform duration-300"
                style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-bg transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col justify-center gap-2 pb-20">
          {SECTIONS.map((item, i) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-display text-4xl font-semibold tracking-tightest transition-all duration-500"
              style={{
                transform: open ? "translateY(0)" : "translateY(14px)",
                opacity: open ? 1 : 0,
                transitionDelay: `${80 + i * 45}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {EXTERNAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}