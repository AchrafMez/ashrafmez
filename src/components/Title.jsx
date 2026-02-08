import React from 'react';

function Title({ children, id }) {
   return (
      <h2
         id={id && id}
         className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white"
      >
         {children}
      </h2>
   )
}

export default Title;