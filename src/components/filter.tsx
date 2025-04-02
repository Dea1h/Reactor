import React, { useState } from 'react';
import '../css/filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { animated, SpringValue, useSpring } from '@react-spring/web';

interface Parameters {
  isOpen: Boolean,
  setOpen: () => void;
}

interface AnimatedDivProps {
  style: {
    opacity: SpringValue<number>;
    right: SpringValue<string>;
  };
  className: string;
  children?: React.ReactNode;
}

function Filter(parameters: Parameters) {
  const [max,setMax] = useState<number>(500);
  const [min,setMin] = useState<number>(500);
  const slideAnimation = useSpring({
    right: parameters.isOpen ? "0%": "-75%" ,
    opacity: parameters.isOpen ? 1 : 0.5, 
    config: { tension: 200, friction: 20},
  });

  const handleFilter = async () => {
    try {
      const url: string = `http://192.168.1.76:8080/filter?min=${min}&max=${max}`;
      const response = await fetch(url,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const responseData = await response.json();
      console.log(responseData);
      
      if(!response.ok) {
        throw new Error(`Response status. ${response.status}`);
      }
    } catch (e) {
      throw e;
    }
  }

  return (
    <React.Fragment>
      <button onClick={parameters.setOpen} className='filter-btn'>
        Filter
      </button>
      <animated.div 
        {...{
          style: slideAnimation,
          className: 'filter-content'
        } as AnimatedDivProps}>
        <button 
          onClick={parameters.setOpen} 
          className='x-btn'>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h3>Min Price :</h3>
        <input 
          type='range' 
          min={200} 
          max={2000} 
          value={min} 
          onChange={(e) => setMin(Number(e.target.value))}
          className='range min'/>
        <h3>Max Price :</h3>
        <input 
          type='range' 
          max={2000} 
          min={200} 
          value={max} 
          onChange={(e) => setMax(Number(e.target.value))}
          className='range max'/>                    
        <h3>Colour</h3>
        <select className='select colour'>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="white">White</option>
        </select>
        <h3>Size</h3>
        <select className='select size'>
          <option value="Small-Group">Small Group</option>
          <option value="Medium-Group">Medium Group</option>
          <option value="Large-Group">Large Group</option>
        </select>
        <button className='filter-search' onClick={handleFilter}>
        Filter Search
        </button>
      </animated.div>
    </React.Fragment>
  )
}

export default Filter;
