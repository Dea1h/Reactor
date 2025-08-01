import React from "react";
import "../css/banner.css";

interface Props {
  bannerText: string,
};

function Banner({ bannerText }: Props) {
  return (
    <React.Fragment>
      <div className="banner">
        <h2>{bannerText}</h2>
        {/* <img src={"/images/" + bannerImage} /> */}
      </div>
    </React.Fragment>
  );
}

export default Banner;
