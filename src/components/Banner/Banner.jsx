import React, { useState, useEffect, useCallback } from "react";
import "./Banner.css";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import banner01 from "../../assets/images/banner01.png";
import banner02 from "../../assets/images/banner02.png";
import banner03 from "../../assets/images/banner03.png";
import banner04 from "../../assets/images/banner04.png";
import banner05 from "../../assets/images/banner05.png";
import side01 from "../../assets/images/side01.png";
import side02 from "../../assets/images/side02.png";

const sliderImages = [banner01, banner02, banner03, banner04, banner05];

const sideImage1 = side01;
const sideImage2 = side02;

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [nextSlide]);

  return (
    <section className="banner-section">
      <div className="banner__outer">
        <div className="banner__inner">
          <div className="banner-container">
            <div className="banner-slider">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {sliderImages.map((src, index) => (
                  <div className="slide" key={index}>
                    <img src={src} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
              </div>

              {/* Nút Prev */}
              <button className="slider-nav prev" onClick={prevSlide}>
                <LeftOutlined style={{ fontSize: 18, color: "#333" }} />
              </button>

              {/* Nút Next */}
              <button className="slider-nav next" onClick={nextSlide}>
                <RightOutlined style={{ fontSize: 18, color: "#333" }} />
              </button>

              {/* Pagination */}
              <div className="slider-pagination">
                {sliderImages.map((_, index) => (
                  <div
                    key={index}
                    className={`pagination-dot ${
                      currentIndex === index ? "active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div>
            </div>

            <div className="banner-side-images">
              <img src={sideImage1} alt="Side ad 1" />
              <img src={sideImage2} alt="Side ad 2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
