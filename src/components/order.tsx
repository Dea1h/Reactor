import React, { useEffect, useState } from "react";
import '../css/order.css';

//@ts-ignore
interface OrderTypes {
  type: string,
  quantity: number,
  total: number,
  order_id: number,
  hasPayed: boolean,
};

function Order() {
  const [data, setData] = useState<any[]>([]);
  const [refresh, setReferesh] = useState<boolean>(false);

  const fetchOrderData = async () => {
    const endpoints = [
      "http://localhost:8080/admin/order",
      "http://192.168.1.76:8080/admin/order",
    ];

    try {
      for (const endpoint of endpoints) {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) {
          throw new Error("Error In Response Of fetchOrderData function");
        }
        setData(await response.json());
      }
    } catch (e: any) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    fetchOrderData();
  }, [refresh]);
  return (
    <React.Fragment>
      <div className="headers">
        <p>S.N</p>
        <p>Type</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>
      <div className="order-container">
        {
          data.map((_) => {
            return (
              <div className="orders">
                <p>item.order_id</p>
                <p></p>
              </div>
            );
          })
        }
      </div>
      <button onClick={() => setReferesh(!refresh)}>Refresh</button>
    </React.Fragment >
  );
}

export default Order;
