import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';

function Navbar() {
  return (
    <>
      <nav>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <FontAwesomeIcon icon={faHouse} />
        </NavLink>
        <button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <NavLink to='/cart' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
        <NavLink to='/shop' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <FontAwesomeIcon icon={faBars} />
        </NavLink>
      </nav>
    </>
  )
}

export default Navbar;
