import React from 'react';
import "../css/cart.css";
import Navbar from './navbar';

function Cart() {
  return (
  <React.Fragment>
      <Navbar />
      <div className='cart content'>
        <h1>My Cart</h1>
        <div>
          <img src='#'/>
        </div>
      </div>
  </React.Fragment>
  )
}

export default Cart;
