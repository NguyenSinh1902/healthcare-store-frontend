import React, { useState, useEffect, useCallback } from "react";
import "./Banner.css";

// --- Mảng chứa các ảnh của bạn cho slider ---
// Thay thế bằng đường dẫn ảnh thực tế của bạn
const sliderImages = [
  "https://placehold.co/819x310/2859C5/white?text=Slide+1",
  "https://placehold.co/819x310/F9FCFF/black?text=Slide+2",
  "https://placehold.co/819x310/1D50C5/white?text=Slide+3",
  "https://placehold.co/819x310/4C82E3/white?text=Slide+4",
  "https://placehold.co/819x310/13324F/white?text=Slide+5",
];

// --- Mảng chứa các ảnh phụ (bên phải) ---
const sideImage1 = "https://placehold.co/335x148/FF0000/white?text=Small+Ad+1";
const sideImage2 = "https://placehold.co/335x148/FF0000/white?text=Small+Ad+2";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm next slide (sử dụng useCallback để tối ưu)
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  // Hàm prev slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  // Hàm nhảy tới 1 slide cụ thể (cho pagination dots)
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // --- Logic tự động chuyển slide sau 3 giây ---
  useEffect(() => {
    // Đặt hẹn giờ
    const timer = setInterval(() => {
      nextSlide();
    }, 3000); // 3000ms = 3 giây

    // Xóa hẹn giờ khi component bị unmount (rời khỏi)
    // Điều này RẤT QUAN TRỌNG để tránh memory leak
    return () => {
      clearInterval(timer);
    };
  }, [nextSlide]); // Chạy lại effect khi hàm nextSlide thay đổi

  return (
    <section className="banner-section">
      <div className="banner__outer">
        <div className="banner__inner">
          <div className="banner-container">
            {/* === Slider chính === */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="24"
                  viewBox="0 0 9 17"
                >
                  <path
                    fill="black"
                    d="M8.34 1.34L7 0L0 7.5L7 15l1.34-1.34L2.68 7.5L8.34 1.34z"
                  />
                </svg>
              </button>

              {/* Nút Next */}
              <button className="slider-nav next" onClick={nextSlide}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="24"
                  viewBox="0 0 9 17"
                >
                  <path
                    fill="black"
                    d="M0.66 1.34L2 0l7 7.5L2 15l-1.34-1.34L5.32 7.5L0.66 1.34z"
                  />
                </svg>
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

            {/* === Ảnh quảng cáo bên phải === */}
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
