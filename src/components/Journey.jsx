import React from 'react';
import journey from '../data/journey';
import JourneyItem from './JourneyItem';
import Title from './Title';

function Journey() {
   return (
      <div className="flex flex-col md:flex-row justify-center my-20">
         <div className="w-full md:w-7/18">
            <Title>Journey</Title>
            {journey.map(item => (
               <JourneyItem 
                  year={item.year}
                  title={item.title}
                  duration={item.duration}
                  details={item.details}
               />))}
         </div>
      </div>
   )
}

export default Journey;