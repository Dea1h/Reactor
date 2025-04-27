import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Filter from '../components/filter';
import ICard from './icard';
import '../css/shop.css';

interface State {
  maxPrice?: number;
  minPrice?: number;
  minAge?: number;
  maxAge?: number;
  colour?: string;
  gender?: string;
  size?: string;
}

function Shop() {

  const [open,setOpen] = useState(false);
  const [data,setData] = useState<any[]>([]);
  
  const [state,setState] = useState<State | null>({
    minAge: 0,
    maxAge: 10,
    minPrice: 200,
    maxPrice: 2000,
    colour: 'white',
    size: 'small',
    gender: 'male',
  });

  const handlFilter = () => {
    setOpen(!open);
  };
  
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const fetchData = async () => {
    try {

      setOpen(false);
      await sleep(200);
      
      const url: string = `http://192.168.1.76:8080/shop?
                                    minPrice=${state?.minPrice}
                                    &maxPrice=${state?.maxPrice}
                                    &minAge=${state?.minAge}
                                    &maxAge=${state?.maxAge}
                                    &gender=${state?.gender}
                                    &colour=${state?.colour}
                                    &size=${state?.size}`;

      const resposne = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
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

  useEffect(() => {
    fetchData();
  }, []);

  const groups = [];

  for(let i = 0;i < data.length;i = i + 2) {
    groups.push(
      <div key={i} className={`shop group`}>
        <ICard className='icard' img={data[i].model_image_id} type={data[i].type} />
        <ICard className='icard' img={data[i+1].model_image_id} type={data[i].type} />
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Navbar />
      <Filter isOpen={open} setOpen={handlFilter} state={state} setState={setState} fetchData={fetchData}/>
      <div className='shop display'>
        {groups}
      </div>
    </React.Fragment>
  );
}

export default Shop;
