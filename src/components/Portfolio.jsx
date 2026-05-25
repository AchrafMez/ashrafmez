import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import portfolio from '../data/portfolio';
import Title from './Title';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Portfolio() {
   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      const timer = setInterval(() => {
         setCurrentIndex((prev) => (prev + 1) % portfolio.length);
      }, 6000);
      return () => clearInterval(timer);
   }, [currentIndex]);

   const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % portfolio.length);
   };

   const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
   };

   const slideVariants = {
      hidden: {
         x: "100%"
      },
      visible: {
         x: 0,
         transition: {
            duration: 0.6,
            ease: "easeOut"
         }
      },
      exit: {
         x: "-100%",
         transition: {
            duration: 0.6,
            ease: "easeIn"
         }
      }
   };

   return (
      <div id="Projects" className="py-12 sm:py-20">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
            >
               <Title>Projects</Title>
            </motion.div>
         </div>
         
         <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait">
               <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center"
               >
                  {/* Image Section */}
                  <div className="lg:col-span-7 h-[280px] sm:h-[400px] lg:h-[550px] relative overflow-hidden group rounded-2xl sm:rounded-[2rem]">
                     <img 
                        src={portfolio[currentIndex].imgUrl} 
                        alt={portfolio[currentIndex].title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="lg:col-span-5 flex flex-col justify-center relative p-2 sm:p-4 lg:p-0">
                     <h3 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111] dark:text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                        {portfolio[currentIndex].title}
                     </h3>
                     <p className="text-base sm:text-lg text-stone-500 dark:text-stone-400 mb-6 sm:mb-8 leading-relaxed">
                        {portfolio[currentIndex].details}
                     </p>
                     
                     <div className="flex flex-wrap gap-2.5 mb-8 sm:mb-10">
                        {portfolio[currentIndex].stack.map((item, index) => (
                           <span 
                              key={index} 
                              className="px-4 py-2 text-sm font-medium rounded-full bg-[#f4f4f5] dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                           >
                              {item}
                           </span>
                        ))}
                     </div>
                     
                     {portfolio[currentIndex].link.startsWith('/') ? (
                        <Link 
                           to={portfolio[currentIndex].link}
                           className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-[0.85rem] hover:bg-black dark:hover:bg-stone-200 transition-colors w-fit font-medium text-sm sm:text-base group"
                        >
                           View Project Details
                           {/* <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> */}
                              {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /> */}
                           {/* </svg> */}
                        </Link>
                     ) : (
                        <a 
                           href={portfolio[currentIndex].link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-[0.85rem] hover:bg-black dark:hover:bg-stone-200 transition-colors w-fit font-medium text-sm sm:text-base group"
                        >
                           View Project
                           <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                           </svg>
                        </a>
                     )}
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>
            
         {/* Indicators */}
         <div className="flex justify-center mt-8">
            <div className="flex gap-2 sm:gap-3 px-4 py-2 rounded-full bg-[#1a1a1a] dark:bg-[#1a1a1a]">
               {portfolio.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => setCurrentIndex(index)}
                     className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                           ? "w-6 sm:w-8 bg-white" 
                           : "w-1.5 sm:w-2 bg-stone-500 hover:bg-stone-400"
                     }`}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}

export default Portfolio;