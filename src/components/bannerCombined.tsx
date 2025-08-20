import React from "react";
import '../css/bannerCombined.css';
import { useFilterContext } from './context';
import { useNavigate } from "react-router-dom";

function BannerCombined() {
  const { filters, setFilters } = useFilterContext();
  const navigate = useNavigate();
  const handleBanner = (index: number) => {
    const genderMap = { 0: "M", 1: "U", 2: "F" } as const;
    setFilters({
      ...filters,
      gender: genderMap[index as keyof typeof genderMap],
    });
    navigate('/shop');
  };
  return (
    <React.Fragment>
      <div className="banner-container">
        <div className="banner-element" onClick={() => handleBanner(0)}>
          <p>Boys</p>
        </div>
        <div className="banner-element" onClick={() => handleBanner(1)}>
          <p>Mixed</p>
        </div>
        <div className="banner-element" onClick={() => handleBanner(2)}>
          <p>Girls</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BannerCombined;
