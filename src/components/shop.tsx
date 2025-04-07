import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Filter from '../components/filter';
import '../css/shop.css';
import ICard from './icard';

function Shop() {
  const [open,setOpen] = useState(false);
  const [data,setData] = useState<any[]>([]);
  const handlFilter = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url: string = `http://192.168.1.76:8080/shop`;
        const resposne = await fetch(url, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });
        if(!resposne.ok) {
          throw new Error(`Response Status: ${resposne.status} `);
        }

        const responseData = await resposne.json();
        setData(responseData);
        console.log(responseData);
      } catch (e) {
        throw e;
      }
    }

    fetchData();
  }, []);

  //(async () => {
  //
  //  try {
  //    const url = "http://192.168.1.76:8080/shop";
  //    const response = await fetch(url, {
  //      method: 'GET',
  //      headers: { 'Content-Type': 'application/json' },
  //    });
  //
  //    if(!response.ok) {
  //      throw new Error(`Response Status: ${response.status}`);
  //    }
  //
  //    const responseData = await response.json();
  //    console.log(responseData);
  //  } catch (e) {
  //    throw e;
  //  }
  //})();

  return (
    <React.Fragment>
      <Navbar />
      <Filter isOpen={open} setOpen={handlFilter} />
      <div className='display'>
        {data.map((item,index) => (
          <div key={index} className={index % 2 === 0 ? '' : 'group'}>
            <ICard className='icard' img={item.model_image_id} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Shop;
