import React, { useState } from 'react';
import '../css/overlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useFilterContext } from './context';

interface overlay_data {
  className?: string;
  handleToggle: () => void;
}

function Overlay(data: overlay_data) {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const { filters, setFilters } = useFilterContext();

  const handleSearch = () => {
    data.handleToggle();
    setFilters({ ...filters, type: query });
    navigate('/shop');
  }

  // const handleSearch = async () => {
  //   try {
  //     const url = `http://localhost:8080/api/search?term=${query}`;
  //
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  //
  //     const responseData = await response.json();
  //     console.log(responseData);
  //
  //     navigate('/shop');
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  return (
    <React.Fragment>
      <div className="overlay">
        <div className="overlay data input">
          <button onClick={data.handleToggle} className="Xmark">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}>
            <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="navbar_search" />
            <button className="magnify" >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Overlay
