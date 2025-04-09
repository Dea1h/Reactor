import React, { useState } from 'react';
import '../css/filter.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { animated, SpringValue, useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

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
  const [minAge,setMinAge] = useState<number>(10);
  const [maxAge,setMaxAge] = useState<number>(10);
  const [colour,setColour] = useState<string>('orange');
  const [size,setSize] = useState<string>('small');
  const slideAnimation = useSpring({
    right: parameters.isOpen ? "0%": "-75%" ,
    opacity: parameters.isOpen ? 1 : 0.5, 
    config: { tension: 200, friction: 20},
  });

  const navigate = useNavigate();

  const handleFilter = async () => {
    try {
      const url: string = `http://192.168.1.76:8080/filter?min=${min}&max=${max}&size=${size}&colour=${colour}&maxAge=${maxAge}&minAge=${minAge}`;
      const response = await fetch(url,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const responseData = await response.json();
      
      if(!response.ok) {
        throw new Error(`Response status. ${response.status}`);
      }
      navigate('/shop',{ state: { responseData } });
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
        <h3>Min Price : Rs.{min}</h3>
        <input 
          type='range' 
          min={200} 
          max={2000} 
          value={min} 
          onChange={(e) => setMin(Number(e.target.value))}
          className='range min'/>
        <h3>Max Price : Rs.{max}</h3>
        <input 
          type='range' 
          max={2000} 
          min={200} 
          value={max} 
          onChange={(e) => setMax(Number(e.target.value))}
          className='range max'/>                    
        <h3>Colour</h3>
        <select className='select colour' value={colour} onChange={(e) => setColour(e.target.value)}>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="white">White</option>
        </select>
        <h3>Size</h3>
        <select className='select size' value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="small">Small Group</option>
          <option value="medium">Medium Group</option>
          <option value="large">Large Group</option>
        </select>
        <h3>Age Group</h3>
        <h3>Min Age: {minAge}</h3>
        <input 
          type='range'
          min={0}
          max={15}
          value={minAge}
          onChange={(e) => setMinAge(parseInt(e.target.value))}
          className="range min-age"/>
        <h3>Max Age: {maxAge}</h3>
        <input
          type='range'
          min={0}
          max={15}
          value={maxAge}
          onChange={(e) => setMaxAge(parseInt(e.target.value))}
          className='range max-age'/>
        <button className='filter-search' onClick={handleFilter}>
        Filter Search
        </button>
      </animated.div>
    </React.Fragment>
  )
}

export default Filter;
