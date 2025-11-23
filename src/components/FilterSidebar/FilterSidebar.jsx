import React, { useState } from 'react';
import { Slider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import ReloadIcon from '../../assets/images/ReloadOutlined.png'

import './FilterSidebar.css';

const FilterSidebar = () => {

  const [priceRange, setPriceRange] = useState([15, 56]);

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="filter-sidebar">

      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <div className="filter-reset-btn">
             <img src={ReloadIcon} style={{width: '30px', height:'30px'}} alt='ReloadIcon'/>
        </div>
      </div>

      <div className="filter-container">

        <div className="filter-section">
          <h4 className="section-title-filter">Price</h4>

          <div className="price-slider-wrapper">
            <Slider 
                range 
                min={0} 
                max={100} 
                defaultValue={[15, 56]} 
                value={priceRange}
                onChange={handleSliderChange}
                trackStyle={[{ backgroundColor: '#2859C5' }]} // Màu xanh của thanh kéo
                handleStyle={[{ borderColor: '#2859C5', backgroundColor: '#2859C5' }, { borderColor: '#2859C5', backgroundColor: '#2859C5' }]}
            />
          </div>

          <div className="price-inputs">
            <div className="price-box">${priceRange[0]}</div>
            <ArrowRightOutlined style={{ color: '#2859C5' }} />
            <div className="price-box">${priceRange[1]}</div>
          </div>

          <button className="btn-confirm">Confirm</button>

          <div className="filter-options">
            <label className="custom-radio">
              <input type="radio" name="price_group" defaultChecked />
              <span className="radio-mark"></span>
              <span className="radio-label">Under $100</span>
            </label>
            <label className="custom-radio">
              <input type="radio" name="price_group" />
              <span className="radio-mark"></span>
              <span className="radio-label">$100 – $300</span>
            </label>
            <label className="custom-radio">
              <input type="radio" name="price_group" />
              <span className="radio-mark"></span>
              <span className="radio-label">$300 – $500</span>
            </label>
            <label className="custom-radio">
              <input type="radio" name="price_group" />
              <span className="radio-mark"></span>
              <span className="radio-label">Above $500</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h4 className="section-title-filter">Brand</h4>
          <div className="filter-options">
            <label className="custom-radio">
              <input type="radio" name="brand_group" />
              <span className="radio-mark"></span>
              <span className="radio-label">Blackmores</span>
            </label>
            <label className="custom-radio">
              <input type="radio" name="brand_group" />
              <span className="radio-mark"></span>
              <span className="radio-label">Swisse</span>
            </label>
            <label className="custom-radio">
              <input type="radio" name="brand_group" />
              <span className="radio-mark"></span>
              <span className="radio-label">Centrum</span>
            </label>
            <label className="custom-radio">
              <input type="radio" name="brand_group" />
              <span className="radio-mark"></span>
              <span className="radio-label">Nature Made</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterSidebar;