import React from 'react';

function PortfolioItem({ title, imgUrl, stack, details, link }) {
   return (
      <a
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="group block rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 transition-all duration-300 hover:shadow-lg hover:shadow-stone-300/40 dark:hover:shadow-black/30 hover:-translate-y-1"
      >
         <div className="relative overflow-hidden">
            <img
               src={imgUrl}
               alt={title}
               className="w-full h-40 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-105"
            />
         </div>
         <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
               <h3 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-white tracking-tight">
                  {title}
               </h3>
               <svg
                  className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
               </svg>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-3 sm:mb-4">
               {details}
            </p>
            <div className="flex flex-wrap gap-1.5">
               {stack.map((item, index) => (
                  <span
                     key={index}
                     className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                  >
                     {item}
                  </span>
               ))}
            </div>
         </div>
      </a>
   );
}

export default PortfolioItem;

