import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import '../css/product.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ProductProps {
  model_id: String;
}

function Product({model_id}: ProductProps) {

  const [quant,setQuant] = useState<number>(1);
  const [data,setData] = useState<any[]>([]);

  const Fetchdate = async (model_id: String,
    setData: React.Dispatch<React.SetStateAction<any[]>>) => {

    try {
      
      let url = `http://192.168.1.76/product?model=${model_id}`;

      let response  = await fetch(url,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(!response.ok) {
        throw new Error(`Reponse Failed: Status:${response.status}`);
      } 

      let responseData = await response.json();

      setData(responseData);

    } catch (e) {
      throw e;
    }
  }

  let group = [];
  for(let i = 0;i < data.length;i++) {
    group.push(
      <img src={data[i].model_image_id} loading="lazy"/>
    );
  }

  useEffect(() => {
    Fetchdate(model_id,setData);
  },[model_id,setData]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="product content">
        <button className='btn back'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className='btn forward'>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <img src="/images/1.jpg" loading="lazy"/>
        <div className="product desc">
          <h3>T-Shirt</h3>
          <h3>Size:</h3>
          <h4>XL,L,M,S</h4>
          <h3>Quantity</h3>
          <input 
            type="number" 
            className="quantity-in" 
            value={quant}
            onChange={(e) => setQuant(Number(e.target.value))}
          />
          <button className="cart-btn">
            ADD TO CART
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
