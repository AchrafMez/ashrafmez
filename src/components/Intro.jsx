import React from 'react';

function Intro() {
   return (
      <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
         <h1 className="text-4xl md:text-6xl dark:text-white mb-1 md:mb-3 font-bold">Achraf Meziouni</h1>
         <p className="text-base md:text-xl mb-3 font-medium">
            Software Engineer Student at {' '}
            <a 
               href="https://1337.ma" 
               target="_blank"
               rel="noreferrer noopener"
               className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
               <svg 
                  width="75" 
                  height="20" 
                  viewBox="0 0 76 20" 
                  fill="none"
                  className="inline-block align-middle text-black dark:text-white"
               >
                  <path d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z" fill="currentColor"></path>
                  <path d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z" fill="currentColor"></path>
                  <path d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z" fill="currentColor"></path>
                  <path d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z" fill="currentColor"></path>
               </svg>
            </a>
         </p>
         <p className="text-sm max-w-xl mb-6 font-bold">
            I'm a Dedicated software Engineering Student with strong problem
            solving skills and hands on experience in systems programming and 
            algorithms.
            Overall, I like building things that are clean, efficient, and genuinely useful.
            <br />
            
         </p>
      </div>
   )
}

export default Intro;