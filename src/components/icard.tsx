import React from "react";
import '../css/icard.css';

interface ICardProps {
  className?: string;
  img: string;
  type: string;
}

function ICard(data: ICardProps) {
  return (
  <React.Fragment>
      <div className="icard content">
        <img src={`/images/${data.img}`} alt="Description"/>
        <div className="icard desc">
          <h3>{data.type}</h3>
        </div>
      </div>
  </React.Fragment>
  );
}

export default ICard;
