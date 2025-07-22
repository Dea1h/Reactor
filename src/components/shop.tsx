import React, {
  useEffect,
  useState
} from 'react';

import {
  NavLink,
} from 'react-router-dom'

import { useFilterContext } from './context';

import Navbar from '../components/navbar';
import Filter from '../components/filter';
import ICard from './icard';
import '../css/shop.css';


/* Standard State Across shop.tsx, filter.tsx and overlay.tsx to aid State Transfer*/
// interface State {
//   maxPrice?: number | null;
//   minPrice?: number | null;
//   minAge?: number | null;
//   maxAge?: number | null;
//   colour?: string | null;
//   gender?: string | null;
//   size?: string | null;
//   filter?: boolean | null;
// }

interface filterSettings {
  maxPrice?: number | null;
  minPrice?: number | null;
  minAge?: number | null;
  maxAge?: number | null;
  colour?: string | null;
  gender?: string | null;
  size?: string | null;
}

function Shop() {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const { filters, setFilters: _ } = useFilterContext();
  // const [filters, setFilters] = useState<filterSettings>({
  //   maxPrice: null,
  //   minPrice: null,
  //   minAge: null,
  //   maxAge: null,
  //   colour: null,
  //   gender: null,
  //   size: null,
  // });
  // const _URLbuilder = (filters: filterSettings, baseURL: string) => {
  //   const params = new URLSearchParams({
  //     maxPrice: String(filters.maxPrice),
  //     minPrice: String(filters.minPrice),
  //     minAge: String(filters.minAge),
  //     maxAge: String(filters.maxAge),
  //     colour: String(filters.colour),
  //     gender: String(filters.gender),
  //     size: String(filters.size),
  //   })
  //   return `${baseURL}/api/shop?${params.toString()}`;
  // }

  const _URLbuilder = (_baseURL: string, params: Record<string, any>) => {
    let url = "";
    for (const [key, value] of Object.entries(params)) {
      if (value != null) {
        url = url + key.toString() + "=" + value.toString() + "&";
      }
    }
    return _baseURL + "?" + url.slice(0, -1);
  };
  /* Function To Open Filter Overlay On Shop. */
  const handlFilter = () => {
    setOpen(!open);
  };

  // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  /* Function To Fetch Image Data and Associated Product Data from Express Backend. */
  const fetchData = async (filters: filterSettings) => {
    try {

      setOpen(false);

      // const url: string = `http://localhost:8080/api/shop?minPrice=${filters?.minPrice}&maxPrice=${filters?.maxPrice}&minAge=${filters?.minAge}&maxAge=${filters?.maxAge}&gender=${filters?.gender}&colour=${filters?.colour}&size_group=${filters?.size}`;
      console.log(filters);

      const url: string = _URLbuilder("http://localhost:8080/api/shop", filters);
      console.log(url);



      const resposne = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!resposne.ok) {
        throw new Error(`Response Status: ${resposne.status} `);
      }

      const responseData = await resposne.json();


      console.log(responseData);
      setData(responseData);

    } catch (e) {
      try {
        setOpen(false);

        const url: string = `http://192.168.1.76:8080/api/shop?minPrice=${filters?.minPrice}&maxPrice=${filters?.maxPrice}&minAge=${filters?.minAge}&maxAge=${filters?.maxAge}&gender=${filters?.gender}&colour=${filters?.colour}&size_group=${filters?.size}`;


        const resposne = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!resposne.ok) {
          throw new Error(`Response Status: ${resposne.status} `);
        }

        const responseData = await resposne.json();


        console.log(responseData);
        setData(responseData);
      } catch (e) {
        if (e instanceof TypeError) {
          console.error("TypeError In Fetch Function In Shop.tsx", e.message);
        } else if (e instanceof SyntaxError) {
          console.error("SyntaxError In Fetch Function In Shop.tsx", e.message);
        }
      }
    }
  }

  useEffect(() => {
    // if (location.state != null) {
    //
    //   setFilters(location.state)
    // }

    fetchData(filters);

  }, [filters]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadData();
      }
    }
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  /* To Dynamically Add Images On The Shop Every Time Users Scrolls To Bottom*/
  const groups = [];

  for (let i = 0; i < data.length; i = i + 2) {
    groups.push(
      <div key={i} className={`shop group`}>
        <NavLink
          key={data[i].image_id}
          to={`/product`}
          state={{ model_id: data[i].image_id }}>
          <ICard className='icard' img={data[i].image_id} type={data[i].type} />
        </NavLink>
        {data[i + 1] && (
          <NavLink
            key={data[i + 1].image_id}
            to={`/product`}
            state={{ model_id: data[i + 1].image_id }}>
            <ICard className='icard' img={data[i + 1].image_id} type={data[i + 1].type} />
          </NavLink>
        )}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <Filter isOpen={open} setOpen={handlFilter} />
      <div className='shop display'>
        {groups}
        {/*{data.map((item, index) =>
          index % 2 === 0 ? (
            <NavLink
              key={item.image_id}
              to={'/product'}
              state={{ model_id: item.image_id }}
            >
              <ICard className='icard' img={item.image_id} type={item.type} />
            </NavLink>
            {
            data[index + 1] && (
              <NavLink
                key={data[index + 1]}
                to={'/product'}
                state={{ model_id: data[index + 1].image_id }}>
                <ICard className='icard' img={data[index + 1].image_id type={data[index + 1].type}}
              </NavLink>
            )
          }
        ) : null
        )} */}
      </div>
    </React.Fragment >
  );
}

export default Shop;
