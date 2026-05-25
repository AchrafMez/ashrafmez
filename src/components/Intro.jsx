import React from "react"
import { motion } from "framer-motion"
import MMarqueeWrapper from "./MMarqueeWrapper.jsx"

function Intro() {
  return (
    <section id="About" className="min-h-[100dvh] flex flex-col items-center justify-start pt-24 md:pt-0 md:justify-center w-full relative">
      <div className="flex-1 flex flex-col justify-center items-center px-4 pt-16 pb-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                       font-bold mb-4 sm:mb-6 dark:text-white leading-tight"
          >
            Achraf Meziouni
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl 
                       mb-6 sm:mb-8 font-light text-stone-600 dark:text-stone-400 
                       tracking-wide px-2"
          >
            Software Engineer Student at{" "}
            <a
              href="https://www.1337.ma"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <svg
                width="75"
                height="20"
                viewBox="0 0 76 20"
                fill="none"
                className="inline-block align-middle text-black dark:text-white 
                          w-12 h-3 xs:w-16 xs:h-4 sm:w-20 sm:h-5"
              >
                <path d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z" fill="currentColor" />
                <path d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z" fill="currentColor" />
                <path d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z" fill="currentColor" />
                <path d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z" fill="currentColor" />
              </svg>
            </a>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 
                       max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto 
                       font-light leading-relaxed text-stone-900 dark:text-stone-300 
                       px-4"
          >
            Dedicated software engineering student with strong problem-solving skills
            and hands-on experience in systems programming and algorithms.
            Building clean, efficient, and genuinely useful solutions.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pb-8 sm:pb-12 md:pb-16 lg:pb-20"
      >
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <MMarqueeWrapper />
          <a
            href="#Projects"
            className="flex flex-col items-center"
          >
            {/* <motion.svg
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-6 text-stone-400 dark:text-stone-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </motion.svg> */}
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Intro
