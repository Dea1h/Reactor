import React, { useState } from "react";
import '../css/icard.css';

interface ICardProps {
  className?: string;
  img: string;
  type: string;
}

function ICard({img,type}: ICardProps) {
  const [_isLoaded,_setLoaded] = useState<boolean>(false);
  const handleLoad = () => {
    _setLoaded(true);
  }
  
  return (
    <React.Fragment>
      <div className={`icard content ${_isLoaded ? 'loaded' : 'unloaded'}`} >
        <img src={`/images/${img}`} alt="Description" loading="lazy" onLoad={handleLoad}/>
          <div className={`icard desc ${_isLoaded ? 'loaded' : 'unloaded'}`} >
          <h3>{type}</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ICard;
