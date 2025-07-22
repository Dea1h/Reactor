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

  const handleChange = (direction: number, len: number) => {
    if (direction == 0) {
      if (index == -1) {
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

  const [quant, setQuant] = useState<number>(1);
  // const [color, setColor] = useState<string>("Blue");
  // const [size, setSize] = useState<string>("M");
  const [data, setData] = useState<any[]>([]);

  const location = useLocation();

  let state = location.state;

  // const Fetchdate = async (
  //   state: any,
  //   setData: React.Dispatch<React.SetStateAction<any[]>>,
  // ) => {
  //   try {
  //     let url: string = `http://localhost:8080/api/product?model=${state.model_id}`;
  //     console.log(url);
  //
  //     let response: Response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error(`Reponse Failed: Status:${response.status}`);
  //     }
  //
  //     let responseData = await response.json();
  //
  //
  //     setData(responseData);
  //
  //     console.log("HELLO");
  //     console.log(data[0]);
  //   } catch (e: any) {
  //     try {
  //
  //       let url: string = `http://192.168.1.76:8080/api/product?model=${state.model_id}`;
  //
  //       let response: Response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //
  //       if (!response.ok) {
  //         throw new Error(`Reponse Failed: Status:${response.status}`);
  //       }
  //
  //       let responseData = await response.json();
  //
  //       setData(responseData);
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  // };


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

  useEffect(() => {
    if (location.state == null) {
      console.log("ERROR LOCATED");
    }
    const Fetchdate = async (
      state: any,
      setData: React.Dispatch<React.SetStateAction<any[]>>,
    ) => {
      try {
        let url: string = `http://localhost:8080/api/product?model=${state.model_id}`;
        console.log(url);

        let response: Response = await fetch(url, {
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

        console.log("HELLO");
        console.log(data[0]);
      } catch (e: any) {
        try {

          let url: string = `http://192.168.1.76:8080/api/product?model=${state.model_id}`;

          let response: Response = await fetch(url, {
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
      }
    };
    Fetchdate(state, setData);
  }, [state]);


  // const handleProduct = (product: { id: string, stock: number, type: string, price: number, size_group: string, }) => {
  //   let cart = JSON.parse(localStorage.getItem('cart') || []);
  //
  //   let existIndex = cart.findIndex((item: any) => item.id === product.id);
  //
  //   if (existIndex !== -1) {
  //     cart[existIndex].stock += product.stock;
  //   } else {
  //     cart.push(product);
  //   }
  //
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // };

  return (
    <React.Fragment>
      <Navbar />
      <div className="product content">
        <button
          className="btn back"
          onClick={() => handleChange(0, data.length)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          className="btn forward"
          onClick={() => handleChange(1, data.length)}
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
          {data.length > 0 && <h1>{data[0].type}</h1>}
          <input
            type="number"
            className="quantity-in"
            value={quant}
            min={1}
            onChange={(e) => setQuant(Number(e.target.value))}
          />
          <select name="colour" className="colour">
            {colour_option}
          </select>
          <select name="size_group" className="size_group">
            {size_option}
          </select>
          {size}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
