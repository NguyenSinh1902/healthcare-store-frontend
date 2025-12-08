import React, { useState } from 'react';
import { Slider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import ReloadIcon from '../../assets/images/ReloadOutlined.png';

import './FilterSidebar.css';

const FilterSidebar = ({ onFilter }) => {

  const MAX_PRICE = 1000;
  const DEFAULT_RANGE = [0, MAX_PRICE];

  const priceOptions = [
    { label: 'Under $100', value: 'under_100', range: [0, 100] },
    { label: '$100 – $300', value: '100_300', range: [100, 300] },
    { label: '$300 – $500', value: '300_500', range: [300, 500] },
    { label: 'Above $500', value: 'above_500', range: [500, MAX_PRICE] },
  ];

  const brandOptions = ['Blackmores', 'Swisse', 'Centrum', 'Nature Made'];

  const [priceRange, setPriceRange] = useState(DEFAULT_RANGE);
  const [selectedPriceRadio, setSelectedPriceRadio] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleSliderChange = (value) => {
    setPriceRange(value);
    if (selectedPriceRadio !== null) {
      setSelectedPriceRadio(null);
    }
  };

  const handlePriceRadioClick = (option) => {
    if (selectedPriceRadio === option.value) {
      setSelectedPriceRadio(null);
      setPriceRange(DEFAULT_RANGE);
    } else {
      setSelectedPriceRadio(option.value);
      setPriceRange(option.range);
    }
  };

  const handleBrandClick = (brand) => {
    if (selectedBrand === brand) {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(brand);
    }
  };

  const handleConfirm = () => {
    const filterData = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      brand: selectedBrand,
    };
    console.log("Filter Confirm:", filterData);

    if (onFilter) {
      onFilter(filterData);
    }
  };

  const handleReset = () => {
    setPriceRange(DEFAULT_RANGE);
    setSelectedPriceRadio(null);
    setSelectedBrand(null);
    if (onFilter) {
      onFilter({ minPrice: 0, maxPrice: MAX_PRICE, brand: null });
    }
  };

  return (
    <div className="filter-sidebar">

      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <div className="filter-reset-btn" onClick={handleReset} title="Reset Filter">
          <img src={ReloadIcon} style={{ width: '24px', height: '24px' }} alt='Reload' />
        </div>
      </div>

      <div className="filter-container">

        <div className="filter-section">
          <h4 className="section-title-filter">Price</h4>

          <div className="price-slider-wrapper">
            <Slider
              range
              min={0}
              max={MAX_PRICE}
              value={priceRange}
              onChange={handleSliderChange}
              trackStyle={[{ backgroundColor: '#2859C5' }]}
              handleStyle={[
                { borderColor: '#2859C5', backgroundColor: '#2859C5' },
                { borderColor: '#2859C5', backgroundColor: '#2859C5' }
              ]}
            />
          </div>

          <div className="price-inputs">
            <div className="price-box">${priceRange[0]}</div>
            <ArrowRightOutlined style={{ color: '#2859C5' }} />
            <div className="price-box">${priceRange[1]}</div>
          </div>

          <div className="filter-options">
            {priceOptions.map((option) => (
              <label key={option.value} className="custom-radio">
                <input
                  type="radio"
                  name="price_group"
                  checked={selectedPriceRadio === option.value}
                  onClick={() => handlePriceRadioClick(option)}
                  onChange={() => { }}
                />
                <span className="radio-mark"></span>
                <span className="radio-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4 className="section-title-filter">Brand</h4>
          <div className="filter-options">
            {brandOptions.map((brand) => (
              <label key={brand} className="custom-radio">
                <input
                  type="radio"
                  name="brand_group"
                  checked={selectedBrand === brand}
                  onClick={() => handleBrandClick(brand)}
                  onChange={() => { }}
                />
                <span className="radio-mark"></span>
                <span className="radio-label">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="btn-confirm" onClick={handleConfirm}>
          Confirm Filter
        </button>

      </div>
    </div>
  );
};

export default FilterSidebar;