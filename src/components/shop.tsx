import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Filter from '../components/filter';
import '../css/shop.css';

function Shop() {
  const [open,setOpen] = useState(false);
  const handlFilter = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <Navbar />
      <Filter isOpen={open} setOpen={handlFilter} />
    </React.Fragment>
  );
}

export default Shop;
