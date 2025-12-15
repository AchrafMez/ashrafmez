import React from 'react';
import portfolio from '../data/portfolio';
import PortfolioItem from './PortfolioItem';
import JourneyItem from './JourneyItem';
import journey from '../data/journey';
import Title from './Title';


function Portfolio() {
   return (
      <div id= "Projects" className="flex flex-col md:flex-row items-center justify-center">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.map(project => (
               <PortfolioItem   key={project.id}
                  imgUrl={project.imgUrl}
                  title={project.title}
                  details={project.details}
                  stack={project.stack}
                  link={project.link}
               />
            ))}
         </div>
      </div>
   )
}

export default Portfolio;