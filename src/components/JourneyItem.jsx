import React from 'react';

function JourneyItem({ year, title, duration, details }) {
   return (
      <div className="relative border-l border-stone-200 dark:border-stone-700 ml-1.5">
         <div className="mb-8 sm:mb-10 ml-6">
            <div className="absolute w-3 h-3 bg-stone-300 dark:bg-stone-600 rounded-full -left-1.5 mt-1.5 ring-4 ring-white dark:ring-stone-900" />
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
               <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-white dark:text-stone-900 bg-stone-900 dark:bg-white rounded-md">
                  {year}
               </span>
               <h3 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-white">
                  {title}
               </h3>
            </div>
            <span className="text-xs text-stone-400 dark:text-stone-500">
               {duration}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
               {details}
            </p>
         </div>
      </div>
   )
}

export default JourneyItem;