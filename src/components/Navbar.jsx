function Navbar({ theme, toggleTheme, sun, moon }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20">
      <div
// className="max-w-5xl w-11/12 mx-auto flex justify-between items-center py-4 backdrop-blur-md bg-white/70 dark:bg-stone-900/70 border-b border-stone-200/40 dark:border-stone-700/40 shadow-sm"
className="max-w-5xl w-11/12 mx-auto flex justify-between items-center py-[8px] backdrop-blur-md bg-white/70 dark:bg-stone-900/70 border-b border-stone-200/25 dark:border-stone-700/25 shadow-sm"

>
        <div className="flex gap-8 text-stone-800 dark:text-stone-200 font-bold">
          {["About", "Journey", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="relative group"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-md bg-stone-900/90 dark:bg-yellow-300 text-white dark:text-black backdrop-blur-sm">
          {theme === "dark" ? sun : moon}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
