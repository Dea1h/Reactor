import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';
import Overlay from './overlay'

function Navbar() {
  const [toggle,setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
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
        <NavLink to='/shop' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          <FontAwesomeIcon icon={faBars} />
        </NavLink>
      </nav>
      { toggle && <Overlay className="overlay" handleToggle={handleToggle} />}
    </>
  )
}

export default Navbar;
