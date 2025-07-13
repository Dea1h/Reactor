import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import ICard from './icard';
import "../css/home.css";
import Banner from './banner';
import { useFilterContext } from './context';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState<any[]>([]);
  const { filters, setFilters } = useFilterContext();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const url = `http://localhost:8080/api/home`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (!response.ok) {
        throw new Error(`Response Failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      setData(responseData);
    } catch (e) {
      try {

        const url = `http://192.168.1.76:8080/api/home`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Response Failed with status ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (e) {
        throw e
      }
    }
  }

  useEffect(() => {
    function nullOutObject<T extends Record<string, any>>(obj: T): T {
      const result: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = null;
        }
      }
      return result;
    }
    setFilters(nullOutObject(filters));
    fetchData();
  }, []);

  let group = [];
  for (let i = 0; i < data.length; i = i + 2) {
    console.log(data[i].image_id);

    group.push(
      <div key={i} className='home group'>
        <ICard className='icard' img={data[i].image_id} type={data[i].type} />
        {data[i + 1] && (
          <ICard className='icard' img={data[i + 1].image_id} type={data[i + 1].type} />
        )}
      </div>
    );
    console.log(group);
  }

  const handleBanner = (index: number) => {
    if (index == 0) {
      setFilters({
        ...filters,
        gender: "M",
      });
    } else if (index == 1) {
      setFilters({
        ...filters,
        gender: "U",
      });
    }
    else if (index == 2) {
      setFilters({
        ...filters,
        gender: "F",
      });
    }
    navigate('/shop');
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className='banner display'>
        <span onClick={() => handleBanner(0)}>
          <Banner bannerText='Boy' />
        </span>
        <span onClick={() => handleBanner(1)}>
          <Banner bannerText='Mixed' />
        </span>
        <span onClick={() => handleBanner(2)}>
          <Banner bannerText='Girl' />
        </span>
      </div>
      <div className='home display'>
        {group}
      </div>
    </React.Fragment>
  );
}

export default Home;
