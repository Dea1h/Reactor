import React from 'react';
import "../css/cart.css";
import Navbar from './navbar';
import ICart from './icart';

function Cart() {
  let icart = [];
  let record: string[] = [];
  for (let i = 0; i < record.length; i++) {
    icart.push(
      <ICart type={record[i].type} quantity={record[i].quantity} ppu={record[i].ppu} />
    )
  }
  return (
    <React.Fragment>
      <Navbar />
      <div className='cart content'>
        <h1>Cart</h1>
        <ICart />
        {icart}
      </div>
    </React.Fragment>
  )
}

export default Cart;
