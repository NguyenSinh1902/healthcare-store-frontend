import React from "react";
import "./Footer.css";

import iconFacebook from "../../assets/images/Icon-Facebook.png";
import iconTwitter from "../../assets/images/Icon-Twitter.png";
import iconInstagram from "../../assets/images/Group-Instagram.png";
import iconLinkedIn from "../../assets/images/Icon-Linkedin.png";
import iconSend from "../../assets/images/icon-send-email.png";

import qrCode from "../../assets/images/Qrcode 1.png";
import appStore from "../../assets/images/download-appstore.png";
import googlePlay from "../../assets/images/google-play-store-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__outer">
        <div className="footer__inner">
          <div className="footer-main-content">
            <div className="footer-col footer-col-exclusive">
              <h3 className="footer-title footer-title-exclusive">Exclusive</h3>
              <p className="footer-link-title">Subscribe</p>
              <p className="footer-text">Get 10% off your first order</p>
              <div className="subscribe-input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="subscribe-email-input"
                />
                <img src={iconSend} alt="Send" className="subscribe-icon" />
              </div>
            </div>

            <div className="footer-col">
              <h3 className="footer-title">Support</h3>
              <div className="footer-links-group">
                <p className="footer-text">
                  Ho Chi Minh City, Vietnam
                </p>
                <a href="mailto:sinhle@gmail.com" className="footer-link">
                  sinhle@gmail.com
                </a>
                <a href="tel:+84039888889999" className="footer-link">
                  +84-039-88888-9999
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3 className="footer-title">Account</h3>
              <div className="footer-links-group">
                <a href="#" className="footer-link">
                  My Account
                </a>
                <a href="#" className="footer-link">
                  Login / Register
                </a>
                <a href="#" className="footer-link">
                  Cart
                </a>
                <a href="#" className="footer-link">
                  Wishlist
                </a>
                <a href="#" className="footer-link">
                  Shop
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3 className="footer-title">Quick Link</h3>
              <div className="footer-links-group">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
                <a href="#" className="footer-link">
                  Terms Of Use
                </a>
                <a href="#" className="footer-link">
                  FAQ
                </a>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </div>
            </div>

            <div className="footer-col footer-col-download">
              <h3 className="footer-title">Download App</h3>
              <p className="footer-text-small">
                Save $3 with App New User Only
              </p>

              <div className="app-download-section">
                <img src={qrCode} alt="QR Code" className="qr-code-img" />
                <div className="app-store-links">
                  <a href="#">
                    <img
                      src={googlePlay}
                      alt="Google Play"
                      className="app-icon google-play-icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={appStore}
                      alt="App Store"
                      className="app-icon app-store-icon"
                    />
                  </a>
                </div>
              </div>

              <div className="social-icons">
                <a href="#">
                  <img
                    src={iconFacebook}
                    alt="Facebook"
                    className="social-icon"
                  />
                </a>
                <a href="#">
                  <img
                    src={iconTwitter}
                    alt="Twitter"
                    className="social-icon"
                  />
                </a>
                <a href="#">
                  <img
                    src={iconInstagram}
                    alt="Instagram"
                    className="social-icon"
                  />
                </a>
                <a href="#">
                  <img
                    src={iconLinkedIn}
                    alt="LinkedIn"
                    className="social-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">
          Copyright 2025 Dr. Orion Knight, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
