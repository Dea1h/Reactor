import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Filter from '../components/filter';
import '../css/shop.css';
import ICard from './icard';

function Shop() {
  const [open,setOpen] = useState(false);
  const handlFilter = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <Navbar />
      <Filter isOpen={open} setOpen={handlFilter} />
      <div className='display'>
        <div className='group'>
          <ICard className="icard"/>
          <ICard className="icard"/>
        </div>
        <div className='group'>
          <ICard className="icard"/>
          <ICard className="icard"/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Shop;
