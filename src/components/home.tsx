import { useEffect, useState } from 'react';
import Navbar from './navbar';
import ICard from './icard';
import "../css/home.css";

function Home() {
  const [data,setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8080/api/home`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        }
      });

      if(!response.ok) {
        throw new Error(`Response Failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData)
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  let group = [];
  for(let i = 0;i < data.length;i = i + 2) {
    group.push(
      <div key={i} className='home group'>
        <ICard className='icard' img={data[i].model_image_id} type={data[i].type} />
        <ICard className='icard' img={data[i + 1].model_image_id} type={data[i + 1].type} />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className='home display'>
        {group}
      </div>
    </>
  );
}

export default Home;
