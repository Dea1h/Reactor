import React, { useState } from 'react';
import '../css/filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { animated, SpringValue, useSpring } from '@react-spring/web';
import { useFilterContext } from './context';

/* Standard State Across shop.tsx, filter.tsx and overlay.tsx to aid State Transfer*/
/* State in filter.tsx comes from shop.tsx and */
// interface State {
//   maxPrice?: number;
//   minPrice?: number;
//   minAge?: number;
//   maxAge?: number;
//   colour?: string;
//   gender?: string;
//   size?: string;
// }

interface FilterSettings {
  maxPrice?: number | null;
  minPrice?: number | null;
  minAge?: number | null;
  maxAge?: number | null;
  colour?: string | null;
  gender?: string | null;
  size?: string | null;
}

interface Parameters {
  isOpen: boolean,
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

function Filter({ isOpen, setOpen }: Parameters) {
  const { setFilters, filters: _ } = useFilterContext();
  const slideAnimation = useSpring({
    right: isOpen ? "0%" : "-75%",
    opacity: isOpen ? 1 : 0.5,
    config: { tension: 200, friction: 20 },
  });
  const [localFilters, setLocalFilters] = useState<FilterSettings>({
    minPrice: 500,
    maxPrice: 2000,
    minAge: 0,
    maxAge: 15,
    gender: "M",
    size: "S"
  });

  const handleFilters = () => {
    console.log("FILTERED");
    setFilters(localFilters);
  }

  // const [filterState, setState] = useState<State>({
  //   minPrice: 500,
  //   maxPrice: 2000,
  //   minAge: 1,
  //   maxAge: 10,
  //   colour: 'white',
  //   gender: 'M',
  //   size: 'S',
  //   filter: true,
  // });

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
        <h3>Min Price : Rs.{localFilters.minPrice || 500}</h3>
        <input
          type='range'
          min={200}
          max={2000}
          value={localFilters.minPrice || 500}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) }))}
          className='range min' />
        <h3>Max Price : Rs.{localFilters.maxPrice || 2000}</h3>
        <input
          type='range'
          max={2000}
          min={200}
          value={localFilters.maxPrice || 2000}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className='range max' />
        <h3>Colour</h3>
        <select
          className='select colour'
          value={localFilters.colour || "orange"}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, colour: e.target.value }))}>
          <option value=""></option>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="white">White</option>
        </select>
        <h3>Gender</h3>
        <select
          className='select gender'
          value={localFilters.gender || 'G'}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, colour: e.target.value }))}>
          <option value="U">Mixed</option>
          <option value="F">Girl</option>
          <option value="M">Boy</option>
        </select>
        <h3>Size</h3>
        <select className='select size'
          value={localFilters.size || "S"}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, size: e.target.value }))}>
          <option value=""></option>
          <option value="S">Small Group</option>
          <option value="M">Medium Group</option>
          <option value="L">Large Group</option>
          <option value="XL">Extra Large Group</option>
        </select>
        <h3>Age Group</h3>
        <h3>Min Age: {localFilters.minAge || 0}</h3>
        <input
          type='range'
          min={0}
          max={15}
          value={localFilters.minAge || 0}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, minAge: Number(e.target.value) }))}
          className="range min-age" />
        <h3>Max Age: {localFilters.maxAge}</h3>
        <input
          type='range'
          min={0}
          max={15}
          value={localFilters.maxAge || 15}
          onChange={(e) => setLocalFilters((prev) => ({ ...prev, maxAge: Number(e.target.value) }))}
          className='range max-age' />
        {/* <button */}
        {/*   type='button' */}
        {/*   className='filter-search' */}
        {/*   onChange={() => setLocalFilters((prev) => ({ ...prev, filter: true }))}> */}
        {/*   Filter */}
        {/* </button> */}
        <button
          type='button'
          className='filter-search'
          onClick={() => handleFilters()}>
          Filter
        </button>
      </animated.div>
    </React.Fragment>
  )
}

export default Filter;
