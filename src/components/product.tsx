import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import "../css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useSpring, animated, SpringValue } from "@react-spring/web";

interface AnimatedProps {
  style: {
    right: SpringValue<string>;
  };
  className?: string;
  children?: React.ReactNode;
}

function Product() {
  const [pos, setPos] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  const spring = useSpring({
    right: `${pos}%`,
    config: {
      duration: 100,
    },
  });

  const handeChange = (direction: number, len: number) => {
    console.log(direction, len, index);

    if (direction == 0) {
      if (index == 0) {
        return;
      }
      let change: number = Math.floor(100 / len);
      console.log(change * 2);
      setPos(pos - change * 2);
      setIndex(index - 1);
    } else if (direction == 1) {
      if (index == len - 1) {
        return;
      }
      let change: number = Math.floor(100 / len);
      console.log(change * 2);
      setPos(pos + change * 2);
      setIndex(index + 1);
    }
  };

  const [quant, setQuant] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);

  const location = useLocation();
  let state = location.state;

  const Fetchdate = async (
    state: any,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    try {
      let url = `http://localhost:8080/api/product?model=${state.model_id}`;

      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Reponse Failed: Status:${response.status}`);
      }

      let responseData = await response.json();

      setData(responseData);
    } catch (e) {
      throw e;
    }
  };

  let group = [];
  for (let i = 0; i < data.length; i++) {
    group.push(<img src={`/images/${data[i].model_image_id}`} />);
  }

  useEffect(() => {
    Fetchdate(state, setData);
  }, [state, setData]);

  let option = [];
  for (let i = 0; i < data.length; i++) {
    option.push(<option value={data[i].colour}>{data[i].colour}</option>);
  }
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].colour);
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="product content">
        <button
          className="btn back"
          onClick={() => handeChange(0, data.length)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          className="btn forward"
          onClick={() => handeChange(1, data.length)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <animated.div
          {...({
            style: spring,
            className: "img container",
          } as AnimatedProps)}
        >
          {group}
        </animated.div>
        <div className="product desc">
          <h3>T-Shirt</h3>
          <h3>Size:XL,L,M,S</h3>
          <h3>Quantity</h3>
          <input
            type="number"
            className="quantity-in"
            value={quant}
            min={1}
            onChange={(e) => setQuant(Number(e.target.value))}
          />
          <select name="colour" className="colour">
            {option}
          </select>
          <button className="cart-btn">ADD TO CART</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
