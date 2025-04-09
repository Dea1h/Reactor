import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Filter from '../components/filter';
import { useLocation } from 'react-router-dom';
import '../css/shop.css';
import ICard from './icard';

function Shop() {
  const [open,setOpen] = useState(false);
  const [data,setData] = useState<any[]>([]);
  const handlFilter = () => {
    setOpen(!open);
  };

  const location = useLocation();
  let state = location.state || null;

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
      } catch (e) {
        throw e;
      }
    }

    if(state != null) {
      setData(state);
    } else {
      fetchData();
    }
  }, []);

  const groups = [];
  for(let i = 0;i < data.length;i = i + 2) {
    groups.push(
      <div key={i} className='group'>
        <ICard className='icard' img={data[i].model_image_id} type={data[i].type} />
        <ICard className='icard' img={data[i+1].model_image_id} type={data[i].type} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <Filter isOpen={open} setOpen={handlFilter} />
      <div className='display'>
        {groups}
      </div>
    </React.Fragment>
  );
}

export default Shop;
