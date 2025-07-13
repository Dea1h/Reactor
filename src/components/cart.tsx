import React, { useEffect, useState } from "react";
import "../css/cart.css";
import Navbar from "./navbar";
import ICart from "./icart";

function Cart() {
  //@ts-ignore
  const [record, setRecord] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const cart = stored ? JSON.parse(stored) : [];
    setRecord(cart);
  }, []);

  // let icart = [];
  // for (let i = 0; i < record.length; i++) {
  //   icart.push(
  //     <ICart
  //       type={record[i].type}
  //       quantity={record[i].quantity}
  //       ppu={record[i].ppu}
  //       id={record[i].model_image_id}
  //     />,
  //   );
  // }

  return (
    <React.Fragment>
      <Navbar />
      <div className="cart content">
        <h1>Cart</h1>
        {record.map((item, index) => (
          <ICart
            key={index}
            id={item.id}
            type={item.type}
            price={item.price}
            quantity={item.quantity} />
        ))
        }
      </div>
    </React.Fragment>
  );
}

export default Cart;
