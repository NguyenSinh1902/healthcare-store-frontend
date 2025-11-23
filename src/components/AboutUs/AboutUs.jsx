import React from 'react';
import './AboutUs.css';
import { Truck, Headset, ShieldCheck } from 'lucide-react';
const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us__outer">
        <div className="about-us__inner">

          <div className="about-us-header">
            <h2 className="ab-section-title">About Us</h2>
            <p className="section-subtitle">Your trusted partner for safe and effective healthcare</p>
          </div>

          <div className="features-grid">

            <div className="feature-item">
              <div className="icon-circle">
                <div className="circle-bg"></div>
                <div className="circle-inner">
                    <Truck className="feature-icon" />
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">FREE AND FAST DELIVERY</h3>
                <p className="feature-desc">Free delivery for all orders over $140</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-circle">
                <div className="circle-bg"></div>
                <div className="circle-inner">
                    <Headset className="feature-icon" />
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">24/7 CUSTOMER SERVICE</h3>
                <p className="feature-desc">Friendly 24/7 customer support</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-circle">
                <div className="circle-bg"></div>
                <div className="circle-inner">
                    <ShieldCheck className="feature-icon" />
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">QUALITY ASSURANCE</h3>
                <p className="feature-desc">Safe and effective medicine</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;