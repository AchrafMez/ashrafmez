import React from 'react';
import { motion } from 'framer-motion';
import journey from '../data/journey';
import JourneyItem from './JourneyItem';
import Title from './Title';

function Journey() {
   return (
      <div id='Journey'>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <Title>Journey</Title>
         </motion.div>
         <div className="mt-8 max-w-2xl">
            {journey.map((item, index) => (
               <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                  <JourneyItem
                     year={item.year}
                     title={item.title}
                     duration={item.duration}
                     details={item.details}
                  />
               </motion.div>
            ))}
         </div>
      </div>
   )
}

export default Journey;