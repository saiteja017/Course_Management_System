import React, { useState, useEffect } from 'react';
import home1 from '../assets/home1.png';

const Home = () => {
  
  return (
    <div className="h-[89.5vh]" style={{
      backgroundImage: `url(${home1})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      
    </div>
  );
};

export default Home;

