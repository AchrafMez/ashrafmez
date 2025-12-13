import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import Journey from './components/Journey';
import Contact from './components/Contact';
import MMarqueeWrapper from './components/MMarqueeWrapper';

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  }, []);

  useEffect(() => {
    if (!theme) return;

    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === 'dark' ? 'light' : 'dark');

  const sun = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
      className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );

  const moon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" strokeWidth={1.5} stroke="white"
      className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 
           0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25 
           C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );

  return (
    <>
	  <nav className="fixed top-0 left-0 w-full z-30 backdrop-blur-xl bg-white/40 dark:bg-stone-900/40 border-b border-white/20 dark:border-stone-700/30">
  <div className="max-w-5xl mx-auto w-11/12 flex justify-between items-center py-4">

    <div className="font-semibold tracking-wide text-lg text-stone-800 dark:text-stone-200">
      Achraf Mez
    </div>
    <div className="flex gap-8 text-stone-700 dark:text-stone-300 font-medium">

      <a
        href="#about"
        className="relative group"
      >
        About
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
      </a>

      {/* <a
        href="#projects"
        className="relative group"
      >
        Projects
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
      </a> */}
	    <a
        href="#Journey"
        className="relative group"
      >
        Journey
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
      </a>

      <a
        href="#contact"
        className="relative group"
      >
        Contact
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
      </a>

    </div>

    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-md bg-stone-900 dark:bg-yellow-300 text-white dark:text-black"
    >
      {theme === 'dark' ? sun : moon}
    </button>

  </div>
</nav>

      <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-300 min-h-screen font-inter pt-24">

        <div className="max-w-5xl w-11/12 mx-auto">

          <div id="about">
            <Intro />
          </div>

          {/* <MMarqueeWrapper /> */}

          <div id="projects">
            <Portfolio />
          </div>

		<div id="Journey">
          <Journey />
		  </div>

          <div id="contact">
            <Contact />
          </div>

          <div id="footer">
            <Footer />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;


