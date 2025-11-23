import React from 'react';

import iconAuth01 from '../../assets/images/icon-auth01.png';
import iconAuth02 from '../../assets/images/icon-auth02.png';
import iconAuth03 from '../../assets/images/icon-auth03.png';
import { Color } from 'antd/es/color-picker';

const SocialLogin = () => {

  const iconWrapperStyle = {
    backgroundColor: '#656ED3',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    overflow: 'hidden'
  };

  const imgStyle = {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
    display: 'block',
  };

  return (
    <div className="social-login-container" style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>

      <div style={iconWrapperStyle}>
        <img src={iconAuth01} alt="Social Icon 1" style={imgStyle} />
      </div>

      <div style={iconWrapperStyle}>
        <img src={iconAuth02} alt="Social Icon 2" style={imgStyle} />
      </div>

      <div style={iconWrapperStyle}>
        <img src={iconAuth03} alt="Social Icon 3" style={imgStyle} />
      </div>

    </div>
  );
};

export default SocialLogin;