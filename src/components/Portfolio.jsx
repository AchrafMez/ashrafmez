import React from 'react';
import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';
import PortfolioItem from './PortfolioItem';
import Title from './Title';

const containerVariants = {
   hidden: {},
   visible: {
      transition: {
         staggerChildren: 0.12,
      },
   },
};

const cardVariants = {
   hidden: (index) => ({
      opacity: 0,
      y: 40,
      x: index % 2 === 0 ? -20 : 20,
      rotate: index % 2 === 0 ? -3 : 3,
      scale: 0.92,
   }),
   visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
         type: "spring",
         stiffness: 100,
         damping: 14,
         mass: 0.8,
      },
   },
};

function Portfolio() {
   return (
      <div id="Projects">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <Title>Projects</Title>
         </motion.div>
         <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
         >
            {portfolio.map((project, index) => (
               <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
               >
                  <PortfolioItem
                     imgUrl={project.imgUrl}
                     title={project.title}
                     details={project.details}
                     stack={project.stack}
                     link={project.link}
                  />
               </motion.div>
            ))}
         </motion.div>
      </div>
   )
}

export default Portfolio;