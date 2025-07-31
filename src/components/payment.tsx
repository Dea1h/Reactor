import React from "react"
import Navbar from "./navbar";
import '../css/payment.css';

function Payment() {
  return (
    <React.Fragment>
      <div className="payment">
        <Navbar />
        <img src='/images/frame.png' />
      </div>
    </React.Fragment>
  )
}

export default Payment;
