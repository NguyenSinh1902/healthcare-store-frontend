import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo-GreenPlus.png';
import iconSearch from '../../assets/images/icon_search.png';
import iconCategory from '../../assets/images/tabler_category.png';
import iconBell from '../../assets/images/icon-otification.png';
import iconCart from '../../assets/images/icon-cart.png';
import iconAccount from '../../assets/images/icon-account.png';
import bxMap from '../../assets/images/bx_map.png';
import weuiBack from '../../assets/images/weui_back-outlined.png';


const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="GreenPlus" className="logo-img" />
        <h2 className="logo-text">GreenPlus</h2>
      </div>

      <div className="header__category">
        <img src={iconCategory} alt="Category" className="icon" />
        <span>Category</span>
        <img src={weuiBack} alt="weuiBack" className="icon_show" />
      </div>

      <div className="header__search">
        <img src={iconSearch} alt="Search" className="icon-search" />
        <input type="text" placeholder="What are you looking for?" />
      </div>

      <div className="header__location">
        <img src={bxMap} alt="Location" className="icon" />
        <span>TP.HCM</span>
        <img src={weuiBack} alt="weuiBack" className="icon_show" />
      </div>

      <div className="header__actions">
        <img src={iconBell} alt="Notification" />
        <img src={iconCart} alt="Cart" />
        <img src={iconAccount} alt="User" />
      </div>
    </header>
  );
};

export default Header;
