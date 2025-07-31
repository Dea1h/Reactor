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

  const deleteItem = (index: number) => {
    setRecord(record.slice(index, 1));
  }
  return (
    <React.Fragment>
      <Navbar />
      <div className="cart content">
        <h1>Cart</h1>
        <div className="cart desc">
          <h2>No.</h2>
          <h2>Type</h2>
          <h2>Price</h2>
          <h2>Quantity</h2>
          <h2>Sub</h2>
        </div>
        {record.length === 0 ? (
          <p>Your Cart Is Empty</p>
        ) : (
          record.map((item, index) => (
            <ICart
              key={index}
              id={index + 1}
              type={item.type}
              price={item.price}
              quantity={item.quantity}
              deleteItem={deleteItem}
            />
          ))
        )}
        <NavLink
          to={"/payment"}
          className={"checkout"}
        >Pay</NavLink>
      </div>
    </React.Fragment >
  );
}

export default Cart;
