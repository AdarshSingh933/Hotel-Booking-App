"use client";

// import { useEffect, useState } from "react";

// interface PriceRangeFilterProps {
//   onPriceRangeChange: (min: number, max: number) => void;
// }

export default function PriceRangeFilter() {
  // const [minPrice, setMinPrice] = useState(3000);
  // const [maxPrice, setMaxPrice] = useState(4500);
  // const [currentMin, setCurrentMin] = useState(minPrice);
  // const [currentMax, setCurrentMax] = useState(maxPrice);

  // useEffect(() => {
  //   onPriceRangeChange(currentMin, currentMax);
  // }, [currentMin, currentMax, onPriceRangeChange]);

  // const handleRangeChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   type: "min" | "max"
  // ) => {
  //   const value = Number(e.target.value);
  //   if (type === "min") {
  //     if (value <= currentMax) setCurrentMin(value);
  //   } else {
  //     if (value >= currentMin) setCurrentMax(value);
  //   }
  // };

  // const resetFilter = () => {
  //   setCurrentMin(minPrice);
  //   setCurrentMax(maxPrice);
  //   onPriceRangeChange(minPrice, maxPrice);
  // };

  return (
    <>
      <div className="sidebar-header">
        <div className="filters-heading">
          <span>Filters</span>
        </div>
        <button className="clear-all-btn">
          <span>Clear All</span>
        </button>
      </div>
      <div className="filters">
        <div className="filter-wrapper">
          <div className="filter-item">
            <div className="rangepicker">
              <h4>Price</h4>
              <div className="input-range">
                <div className="input-range__values">
                  <span>₹ 3300</span>
                  <span>₹ 4500</span>
                </div>
                <div className="input-range__sliders">
                  <input
                    type="range"
                    className="input-range__slider"
                    min='3300'
                    max='4500'
                    value='3300'
                    // onChange={(e) => handleRangeChange(e, "min")}
                  />
                  <input
                    type="range"
                    className="input-range__slider"
                    min='3300'
                    max='4500'
                    value='3300'
                    // onChange={(e) => handleRangeChange(e, "max")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
