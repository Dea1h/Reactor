import React from 'react';
import '../css/filter.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { animated, SpringValue, useSpring } from '@react-spring/web';

interface State {
  maxPrice?: number;
  minPrice?: number;
  minAge?: number;
  maxAge?: number;
  colour?: string;
  gender?: string;
  size?: string;
}

interface Parameters {
  isOpen: boolean,
  state: State | null,
  setState: React.Dispatch<React.SetStateAction<State | null>>;
  setOpen: () => void;
  fetchData: () => void
}

interface AnimatedDivProps {
  style: {
    opacity: SpringValue<number>;
    right: SpringValue<string>;
  };
  className: string;
  children?: React.ReactNode;
}

function Filter({ isOpen, state, setState, setOpen, fetchData }: Parameters) {
  const slideAnimation = useSpring({
    right: isOpen ? "0%": "-75%" ,
    opacity: isOpen ? 1 : 0.5, 
    config: { tension: 200, friction: 20},
  });

  return (
    <React.Fragment>
      <button onClick={setOpen} className='filter-btn'>
        Filter
      </button>
      <animated.div 
        {...{
          style: slideAnimation,
          className: 'filter-content'
        } as AnimatedDivProps}>
        <button 
          onClick={setOpen} 
          className='x-btn'>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h3>Min Price : Rs.{state?.minPrice}</h3>
        <input 
          type='range' 
          min={200} 
          max={2000} 
          value={state?.minPrice} 
          onChange={(e) => setState((prev) => ({...prev, minPrice: Number(e.target.value )}))}
          className='range min'/>
        <h3>Max Price : Rs.{state?.maxPrice}</h3>
        <input 
          type='range' 
          max={2000} 
          min={200} 
          value={state?.maxPrice} 
          onChange={(e) => setState((prev) => ({...prev, maxPrice: Number(e.target.value )}))}
          className='range max'/>                    
        <h3>Colour</h3>
        <select 
          className='select colour' 
          value={state?.colour} 
          onChange={(e) => setState((prev) => ({...prev, colour: e.target.value }))}>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="white">White</option>
        </select>
        <h3>Size</h3>
        <select className='select size'
          value={state?.size}
          onChange={(e) => setState((prev) => ({...prev, size: e.target.value }))}>
          <option value="small">Small Group</option>
          <option value="medium">Medium Group</option>
          <option value="large">Large Group</option>
        </select>
        <h3>Age Group</h3>
        <h3>Min Age: {state?.minAge}</h3>
        <input 
          type='range'
          min={0}
          max={15}
          value={state?.minAge}
          onChange={(e) => setState((prev) => ({...prev, minAge: Number(e.target.value) }))}
          className="range min-age"/>
        <h3>Max Age: {state?.maxAge}</h3>
        <input
          type='range'
          min={0}
          max={15}
          value={state?.maxAge}
          onChange={(e) => setState((prev) => ({...prev, maxAge: Number(e.target.value) }))}
          className='range max-age'/>
        <button className='filter-search' onClick={fetchData}>
        Filter Search
        </button>
      </animated.div>
    </React.Fragment>
  )
}

export default Filter;
