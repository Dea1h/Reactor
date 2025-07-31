import React from "react";
import "../css/icart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ICartProps {
  type: string;
  price: number;
  quantity: number;
  id: number;
  deleteItem: (index: number) => void;
}

function ICart({ type, price, quantity, id, deleteItem }: ICartProps) {

  return (
    <React.Fragment>
      <div className="icart content">
        {/* <img src={`/images/${id}`} loading="lazy" alt="Product Image" /> */}
        <h3>{id}</h3>
        <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <h3>{price}</h3>
        <h3>{quantity}</h3>
        <h3>{price * quantity}</h3>
        <button onClick={() => deleteItem(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </React.Fragment>
  )
}

export default ICart;
