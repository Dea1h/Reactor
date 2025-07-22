import React, { useEffect, useState } from "react";
import "../css/cart.css";
import Navbar from "./navbar";
import ICart from "./icart";
import { NavLink } from "react-router-dom";

function Cart() {
  const [record, setRecord] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const parsed = JSON.parse(stored || "[]");
    const cart = Array.isArray(parsed) ? parsed : [parsed];
    setRecord(cart);
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="cart content">
        <h1>Cart</h1>
        {record.length === 0 ? (
          <p>Your Cart Is Empty</p>
        ) : (
          record.map((item, index) => (
            <ICart
              key={index}
              id={item.model_image_id}
              type={item.type}
              price={item.price}
              quantity={item.quantity} />
          ))
        )}
        <NavLink
          to={"/payment"}
        >Pay</NavLink>
      </div>
    </React.Fragment >
  );
}

export default Cart;
