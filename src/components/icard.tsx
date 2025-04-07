import React from "react";
import '../css/icard.css';

interface ICardProps {
  className?: string;
  img: string;
}

function ICard(data: ICardProps) {
  return (
  <React.Fragment>
      <div className="icard content">
        <img src="#" />
        <div className="icard desc">
          <h1>HI MOM</h1>
        </div>
      </div>
  </React.Fragment>
  );
}

export default ICard;
