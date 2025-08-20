import React, { useCallback, RefObject, useEffect, useRef, useState } from 'react';
import Navbar from './navbar';

import ICard from './icard';
import "../css/home.css";
//@ts-ignore
// import Banner from './banner';
import { useFilterContext } from './context';
import { NavLink } from 'react-router-dom';
import BannerCombined from './bannerCombined';

function Home() {
  const { filters, setFilters } = useFilterContext();

  const [data, setData] = useState<any[]>([]);

  // const page: RefObject<number> = useRef(1);
  // const cluster: RefObject<number> = useRef(0);
  const isLoading: RefObject<boolean> = useRef(false);
  // const throllTimeout = useRef<any | null>(null);

  const [groupedItems, setGroupedItems] = useState<React.ReactNode[]>([]);


  const fetchData = useCallback(async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const endpoints = [
      `http://localhost:8080/api/home`,
      `http://192.168.1.76:8080/api/home`
      // `http://localhost:8080/api/home?limit=${50}&offset=${clusterValue * 50}`,
      // `http://192.168.1.76:8080/api/home?limit=50&offset=${clusterValue * 50}`
    ];
    for (const url of endpoints) {

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok)
          throw new Error(`Response Failed with status ${response.status}`);

        const responseData = await response.json();
        setData(prev => [...prev, ...responseData]);
        isLoading.current = false;
        return;
      } catch (e) {
        console.warn(`Failed: ${url}`, e);
      } finally {
        isLoading.current = false;
      }
    }
    return;
  }, []);

  const updateGroups = useCallback(() => {
    console.log("IN updateGroups");

    let group = [];
    for (let i = 0; i < data.length; i = i + 2) {
      group.push(
        <div key={`${i} - ${data[i].image_id}`} className='home group'>
          <NavLink
            to={'/product'}
            key={data[i].image_id}
            state={{ model_id: data[i].image_id }}>
            <ICard className='icard' img={data[i].image_id} type={data[i].image_id} />
          </NavLink>
          {data[i + 1] && (
            <NavLink
              key={data[i].iamge_id}
              to={'/product'}
              state={{ model_id: data[i].image_id }} >
              <ICard className='icard' img={data[i + 1].image_id} type={data[i + 1].image_id} />
            </NavLink>
          )}
        </div>
      );
    }
    // const itemsToShow = data.slice(0, page.current * 10);
    //
    // let group = [];
    // for (let i = 0; i < itemsToShow.length; i = i + 2) {
    //   group.push(
    //     <div key={`${i} - ${itemsToShow[i].image_id}`} className='home group'>
    //       <ICard className='icard' img={itemsToShow[i].image_id} type={itemsToShow[i].image_id} />
    //       {itemsToShow[i + 1] && (
    //         <ICard className='icard' img={itemsToShow[i + 1].image_id} type={itemsToShow[i + 1].image_id} />
    //       )}
    //     </div>
    //   );
    // }
    // console.log(group);
    //
    setGroupedItems(group);
  }, [data]);

  // const handlePage = useCallback(() => {
  //   if (isLoading.current)
  //     return;
  //
  //   if (throllTimeout.current)
  //     return;
  //
  //   throllTimeout.current = setTimeout(() => {
  //     throllTimeout.current = null;
  //     console.log("IN handlePage");
  //     console.log(page, cluster);
  //     console.log(window.scrollY, document.body.offsetHeight);
  //     if (window.scrollY > window.innerHeight + 100) {
  //       if (page.current >= 3) {
  //         cluster.current++;
  //         page.current = 1;
  //         console.log(fetchData(cluster.current));
  //       } else {
  //         page.current++;
  //         console.log("IN handlePage");
  //         updateGroups();
  //       }
  //     }
  //   }, 100);
  //
  // if (isLoading.current || window.scrollY < (window.innerHeight - 100)) {
  //   return;
  // }
  // if (page.current >= 3) {
  //   cluster.current++;
  //   page.current = 1;
  //   console.log(fetchData(cluster.current));
  // } else {
  //   page.current++;
  //   console.log("IN handlePage");
  //   updateGroups();
  // }

  // }, [fetchData, updateGroups]);


  useEffect(() => {
    updateGroups();

  }, [data, updateGroups]);
  //
  function nullOutObject<T extends Record<string, any>>(obj: T): T {
    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = null;
      }
    }
    return result;
  }

  useEffect(() => {
    console.log("In useEffct");

    setFilters(nullOutObject(filters));
    fetchData();
    // window.addEventListener("scroll", handlePage, {passive: true });
    // return () => {
    //   window.removeEventListener("scroll", handlePage);
    // }

  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <BannerCombined />
      <div className='home display'>
        {groupedItems}
      </div>
    </React.Fragment>
  );
}

export default Home;
