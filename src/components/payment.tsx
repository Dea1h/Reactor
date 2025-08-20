import React, { useState } from "react"
import Navbar from "./navbar";
import '../css/payment.css';
import Vat from "./vatBill";

function Payment() {
  const [isVat, toggleVat] = useState<boolean>(false);
  const handleOrder = async () => {
    let cartjson = localStorage.getItem('cart');
    let cart: any;
    try {
      const parsed = cartjson ? JSON.parse(cartjson) : [];
      cart = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      cart = [];
    }

    const endpoints = [
      "http://localhost:8080/order/postOrder",
      "http://192.168.1.76:8080/order/postOrder",
    ];
    console.log("1");
    for (const endpoint of endpoints) {
      console.log("2");
      try {
        console.log("3");
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(cart)
        });
        console.log("4");
        if (!response.ok)
          throw 42;
        console.log("5");
        localStorage.setItem('cart', JSON.stringify([]));
        console.log("6");
        return;
      } catch (e) {
        console.error("POST request failed to /order api: Endpoint is " + endpoint);
      }
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="payment">
        <img src='/images/frame.png' />
        <p>Vat Bill?</p>
        <input
          type="checkbox"
          onChange={(e) => toggleVat(e.target.checked)}
        />
      </div>
      {
        isVat &&
        <Vat />
      }
      <button onClick={() => handleOrder()}>
        CheckOut
      </button>
    </React.Fragment>
  )
}

export default Payment;
