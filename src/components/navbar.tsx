import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';
import Overlay from './overlay.tsx'

function Navbar() {
  const [toggle,setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(true);
  };

  return (
    <>
      <nav>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <FontAwesomeIcon icon={faHouse} />
        </NavLink>
        <button onClick={handleToggle}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <FontAwesomeIcon icon={faBars} />
        </NavLink>
      </nav>
      { toggle && <Overlay className="overlay"/>}
    </>
  )
}

export default Navbar;
