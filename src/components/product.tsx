import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import "../css/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useSpring, animated, SpringValue } from "@react-spring/web";
import Notification from "./notification";

interface AnimatedTypes {
  style: {
    right: SpringValue<string>;
  };
  className?: string;
  children?: React.ReactNode;
}

interface ProductTypes {
  colour: string,
  design_name: string,
  gender: string,
  max_age: number,
  min_age: number,
  price: number,
  product_id: number,
  season: string,
  size: string,
  size_group: string,
  stock: number,
  type: string,
  image_id: string,
  data_added: string,
  variant_name: string,
}

function Product() {
  const [pos, setPos] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [sizeIndex, setSizeIndex] = useState<number>(0);
  const [designIndex, setDesignIndex] = useState<number>(0);
  const [notificationText, setText] = useState<string>("");
  const [isNoti, setNoti] = useState<boolean>(false);

  const spring = useSpring({
    right: `${pos}%`,
    config: {
      duration: 100,
    },
  });

  const handleChange = (direction: number) => {
    let len = data.length;

    if (direction == 0) {
      if (index == 0) {
        return;
      }
      let change: number = Math.floor(100 / len);
      setPos(pos - change * 2);
      setIndex(index - 1);
    } else if (direction == 1) {
      if (index == len - 1) {
        return;
      }
      let change: number = Math.floor(100 / len);
      setPos(pos + change * 2);
      setIndex(index + 1);
    }
  };

  const [quant, setQuant] = useState<string>("1");
  // const [color, setColor] = useState<string>("Blue");
  // const [size, setSize] = useState<string>("M");
  const [data, setData] = useState<ProductTypes[]>([]);

  const location = useLocation();

  let state = location.state;

  let colour_option: React.ReactNode[] = [];
  let size_option: React.ReactNode[] = [];
  let group: React.ReactNode[] = [];
  let size: React.ReactNode[] = [];
  for (let i = 0; i < data.length; i++) {
    group.push(<img src={`/images/${data[i].image_id}`} />);
    colour_option.push(<option value={data[i].colour}>{data[i].colour}</option>);
    size_option.push(<option value={data[i].size_group}>{data[i].size_group}</option>);
    size.push(<h1>{data[i].size}</h1>);
  }

  const Fetchdata = async (
    state: any,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    const endpoints = [
      `http://localhost:8080/api/product?model=${state.model_id}`,
      `http://192.168.1.76:8080/api/product?model=${state.model_id}`
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok)
          throw "Error While Fetching In Product";

        setData(await response.json());
        return;
      } catch (e: any) {
        console.error(e.message);
      }
    }
  }

  useEffect(() => {
    if (location.state == null) {
      console.log("ERROR LOCATED");
    }
    Fetchdata(state, setData);
  }, [state]);

  useEffect(() => {
    console.log(data);
    if (data.length > 0)
      setText(data[0].type.charAt(0).toUpperCase() + data[0].type.slice(1) + " has been added to cart");
  }, [data]);


  //@ts-ignore
  const handleProduct = async (
    quantity: number,
    color: string,
    design: string,
    size_group: string,
    product_id: number,
    type: string,
    model_id: string,
    price: number
  ) => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {

      let cartjson = localStorage.getItem('cart');
      let cart: any;
      try {
        const parsed = cartjson ? JSON.parse(cartjson) : [];
        cart = Array.isArray(parsed) ? parsed : [];

      } catch (e) {
        cart = [];
      }
      const product = {
        quantity: quantity,
        color: color,
        design: design,
        size_group: size_group,
        id: product_id,
        type: type,
        model_id: model_id,
        price: price,
      };

      let existIndex = cart.findIndex((item: any) => item.id === product.id);
      if (existIndex !== -1)
        cart[existIndex].quantity += product.quantity;
      else
        cart.push(product);

      localStorage.setItem('cart', JSON.stringify(cart));
      setNoti(true);

      await sleep(1000);
      setNoti(false);
    } catch (e: any) {
      console.error("Bad Things happend in handleProduct.Hide Now " + e.message);
      setNoti(true);
      await sleep(1000);
      setNoti(false);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Notification notiText={notificationText} isNotified={isNoti} />
      <div className="product content">
        <button
          className="btn back"
          onClick={() => handleChange(0)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          className="btn forward"
          onClick={() => handleChange(1)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <animated.div
          {...({
            style: spring,
            className: "img container",
          } as AnimatedTypes)}
        >
          {group}
        </animated.div>
        <div className="product desc">
          <h2>Price: {data.length > 0 && data[0].price} </h2>
          <div className="color selection">
            {data.map((item, index) => {

              console.log(index);
              return <span
                key={index}
                style={{ background: item.colour }}
                onClick={() => setColorIndex(index)}
                className={colorIndex === index ? "color selection selected" : ""}
              >
              </span>
            })}
          </div>
          <h2>Size Groups Available:</h2>
          <div className="size selection">
            {
              data.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => setSizeIndex(index)}
                    className={sizeIndex === index ? "size selection selected" : ""}
                  >{item.size_group}
                  </span>
                )
              })
            }
          </div>
          <h2> Design Selection:</h2>
          <div className="design selection">
            {
              data.map((item, index) => {
                return (
                  <img
                    key={index}
                    onClick={() => setDesignIndex(index)}
                    className={designIndex === index ? "design selection selected" : ""}
                    src={`/images/${item.image_id}`}
                    alt={`Design ${index}`
                    }
                  />
                );
              })
            }
          </div>
          <input
            type="number"
            className="quantity-in"
            value={quant}
            min={0}
            onChange={(e) => setQuant(e.target.value)}
          />
          <h2>Available Sizes:</h2>
          {size}
          <button className="cart-btn" onClick={() => handleProduct(Number(quant), data[colorIndex].colour, data[designIndex].design_name, data[sizeIndex].size_group, data[designIndex].product_id, data[designIndex].type, data[designIndex].image_id, data[designIndex].price)}>
            Add To Cart
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
