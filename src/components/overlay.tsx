import React, { useState } from 'react';
import '../css/overlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

interface overlay_data {
  className?: string;
  handleToggle: () => void;
}

function Overlay(data: overlay_data) {
  const [query,setQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const url = `https://localhost:5173/search?para=${query}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const responseData = await response.json();
      data.handleToggle();
      navigate('/shop', {state: {searchData: responseData }});
    } catch (error) {
      throw error;
    }
  };
  return(
    <React.Fragment>
      <div className="overlay">
        <div className="overlay data input">
          <button onClick={data.handleToggle} className="Xmark">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <input placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} className="navbar_search" />
          <button className="magnify" onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Overlay
