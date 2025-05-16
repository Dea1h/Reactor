import React from "react";
import "../css/icart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ICartProps {
  type?: string;
  ppu?: number;
  quantity?: number;
}

function ICart(props: ICartProps) {
  console.log(props);

  return (
    <React.Fragment>
      <div className="icart content">
        <img src="/images/1.jpg" loading="lazy" alt="Product Image" />
        <h1>Type</h1>
        <h1>Price Per Unit</h1>
        <h1>Total</h1>
        <button>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </React.Fragment>
  )
}

export default ICart;
