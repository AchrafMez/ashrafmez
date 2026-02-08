import { useState } from "react";

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["About", "Journey", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-stone-900/80 border-b border-stone-200/30 dark:border-stone-700/30">
      <div className="max-w-5xl w-11/12 mx-auto flex justify-between items-center py-2.5">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-base font-bold tracking-tight text-stone-900 dark:text-white"
          >
            AM<span className="text-stone-400">.</span>
          </button>
          <a href="#About" className="hidden sm:block text-base font-bold tracking-tight text-stone-900 dark:text-white">
            AM<span className="text-stone-400">.</span>
          </a>
          <div className="hidden sm:flex gap-8 text-sm text-stone-700 dark:text-stone-300 font-medium">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative group py-1"
              >
                {item}
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-stone-900 dark:bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="relative w-14 h-7 rounded-full bg-stone-200 dark:bg-stone-700 transition-colors duration-150 ease-out focus:outline-none"
          aria-label="Toggle theme"
          style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-stone-900 shadow-sm flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
              theme === "dark" ? "translate-x-7" : "translate-x-0"
            }`}
            style={{ transform: `translateX(${theme === "dark" ? "1.75rem" : "0"}) translateZ(0)` }}
          >
            <svg
              className={`w-3.5 h-3.5 text-yellow-400 absolute transition-opacity duration-150 ${
                theme === "dark" ? "opacity-100" : "opacity-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg
              className={`w-3.5 h-3.5 text-stone-600 absolute transition-opacity duration-150 ${
                theme === "dark" ? "opacity-0" : "opacity-100"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white/90 dark:bg-stone-900/90 border-b border-stone-200/30 dark:border-stone-700/30">
          <div className="max-w-5xl w-11/12 mx-auto py-3 flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors py-1"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
