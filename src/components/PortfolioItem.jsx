import React from 'react';

function PortfolioItem({ title, imgUrl, stack, details, link }) {
   return (
      <a
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="group relative block rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
      >
         <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-stone-300 to-transparent dark:from-transparent dark:via-stone-500 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-spin" />

         <div className="relative rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/50 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-stone-200/40 dark:bg-white/[0.03] rounded-full blur-3xl" />
               <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-stone-100/40 dark:bg-white/[0.02] rounded-full blur-3xl" />
            </div>

            <div className="relative overflow-hidden">
               <img
                  src={imgUrl}
                  alt={title}
                  className="w-full h-40 sm:h-44 object-cover transition-all duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black dark:from-stone-800 via-transparent to-transparent opacity-40" />
            </div>

            <div className="relative p-4 sm:p-5">
               <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-white tracking-tight">
                     {title}
                  </h3>
                  <svg
                     className="w-4 h-4 text-stone-300 dark:text-stone-600 transition-all duration-300 group-hover:text-stone-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                        className="px-2.5 py-0.5 text-[10px] sm:text-xs font-medium rounded-full border border-stone-200 dark:border-stone-600/50 bg-stone-50 dark:bg-stone-700/50 text-stone-500 dark:text-stone-300 group-hover:border-stone-400 dark:group-hover:border-stone-500 group-hover:text-stone-900 dark:group-hover:text-white transition-all duration-300"
                     >
                        {item}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </a>
   );
}

export default PortfolioItem;

