import React from "react";
import "../css/icart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ICartProps {
  type: string;
  price: number;
  quantity: number;
  id: string;
}

function ICart({ type, price, quantity, id }: ICartProps) {

  return (
    <React.Fragment>
      <div className="icart content">
        <img src={`/images/${id}`} loading="lazy" alt="Product Image" />
        <h1>{type}</h1>
        <h1>{price}</h1>
        <h1>{price * quantity}</h1>
        <button>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </React.Fragment>
  )
}

export default ICart;
