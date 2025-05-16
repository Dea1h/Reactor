import React, { useState } from 'react';
import '../css/overlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom';

interface overlay_data {
  className?: string;
  handleToggle: () => void;
}

function Overlay(data: overlay_data) {
  const [query, setQuery] = useState('');
  // const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const url = `http://localhost:8080/api/search?term=${query}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // data.handleToggle();

      // navigate('/shop', { state: { searchData: responseData } });
    } catch (error) {
      throw error;
    }
  };
  return (
    <React.Fragment>
      <div className="overlay">
        <div className="overlay data input">
          <button onClick={data.handleToggle} className="Xmark">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <form onSubmit={handleSearch}>
            <input placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} className="navbar_search" />
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
