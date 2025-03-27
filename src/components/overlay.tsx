import React from 'react';
import '../css/overlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Overlay() {
  return(
    <React.Fragment>
      <div className="overlay">
        <div className="overlay data input">
          <button onClick={1+1} className="Xmark">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <input placeholder="Search"/>
          <button className="magnify">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Overlay
