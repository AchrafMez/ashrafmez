import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import portfolio from '../data/portfolio';
import { motion } from 'framer-motion';

function ProjectDetails() {
   const { id } = useParams();
   const project = portfolio.find((p) => p.id === id);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   if (!project) {
      return (
         <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Project not found</h2>
            <Link to="/" className="text-blue-500 hover:underline">
               ← Back to Home
            </Link>
         </div>
      );
   }

   return (
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0 }}
         className="min-h-screen py-24 sm:py-32"
      >
         <Link 
            to="/" 
            className="inline-flex items-center gap-2 mb-8 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors group"
         >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
         </Link>

         <div className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-xl shadow-stone-200/20 dark:shadow-black/40 border border-stone-100 dark:border-stone-800">
            <div className="w-full h-[300px] sm:h-[450px] md:h-[600px] relative">
               <img 
                  src={project.imgUrl.replace('./', '/')} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                     {project.title}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                     {project.stack.map((item, index) => (
                        <span 
                           key={index}
                           className="px-4 py-1.5 text-sm font-medium rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30"
                        >
                           {item}
                        </span>
                     ))}
                  </div>
               </div>
            </div>

            <div className="p-8 sm:p-12 md:p-16">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                  <div className="lg:col-span-2">
                     <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-stone-900 dark:text-white">
                        Overview
                     </h2>
                     <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-10">
                        {project.longDescription || project.details}
                     </p>

                     {project.features && (
                        <>
                           <h3 className="text-xl sm:text-2xl font-bold mb-6 text-stone-900 dark:text-white">
                              Key Features
                           </h3>
                           <ul className="list-disc list-inside text-lg text-stone-600 dark:text-stone-400 space-y-3 mb-10 ml-4 marker:text-stone-400 dark:marker:text-stone-500">
                              {project.features.map((feature, idx) => (
                                 <li key={idx} className="leading-relaxed">{feature}</li>
                              ))}
                           </ul>
                        </>
                     )}

                     {project.extraImages && project.extraImages.length > 0 && (
                        <div className="mt-12 space-y-8">
                           <h3 className="text-xl sm:text-2xl font-bold mb-6 text-stone-900 dark:text-white">
                              DB Schema
                           </h3>
                           {project.extraImages.map((img, idx) => (
                              <div key={idx} className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm bg-white dark:bg-[#111]">
                                 <img 
                                    src={img.replace('./', '/')} 
                                    alt={`${project.title} detailed view ${idx + 1}`} 
                                    className="w-full h-auto object-contain"
                                 />
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                  
                  <div className="lg:col-span-1">
                     <div className="bg-stone-50 dark:bg-[#111] p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                        <h3 className="text-lg font-semibold mb-4 text-stone-900 dark:text-white">
                           Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                           {project.stack.map((item, index) => (
                              <span 
                                 key={index}
                                 className="px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-sm"
                              >
                                 {item}
                              </span>
                           ))}
                        </div>

                        <h3 className="text-lg font-semibold mb-4 text-stone-900 dark:text-white">
                           Links
                        </h3>
                        <a 
                           href={project.github} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-[0.85rem] hover:bg-black dark:hover:bg-stone-200 transition-colors w-fit font-medium text-sm sm:text-base group"
                        >
                           <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                           </svg>
                           View Repo
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
}

export default ProjectDetails;