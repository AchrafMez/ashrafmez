import React from 'react';
import MMarqueeWrapper from './MMarqueeWrapper';

function Intro() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl dark:text-white mb-6 font-bold">
          Achraf Meziouni
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light text-stone-600 dark:text-stone-400 tracking-wide">
          Software Engineer Student at{' '}
          <a
            href="https://1337.ma"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <svg
              width="75"
              height="20"
              viewBox="0 0 76 20"
              fill="none"
              className="inline-block align-middle text-black dark:text-white"
            >
              <path d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z" fill="currentColor" />
              <path d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z" fill="currentColor" />
              <path d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z" fill="currentColor" />
              <path d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z" fill="currentColor" />
            </svg>
          </a>
        </p>

        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed text-stone-700 dark:text-stone-300">
          Dedicated software engineering student with strong problem-solving skills
          and hands-on experience in systems programming and algorithms.
          Building clean, efficient, and genuinely useful solutions.
        </p>

        <div className="w-full">
          <MMarqueeWrapper />
        </div>

        <div>
          <a
            href="#projects"
            className="inline-block text-sm tracking-widest uppercase text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            View Projects ↓
          </a>
        </div>

      </div>
    </div>
  );
}

export default Intro;
