import React, { useRef, useState, useEffect } from "react";
import "./FlashSales.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ProductCard from "../ProductCard/ProductCard";
import imageProduct01 from "../../assets/images/imageProduct01.png";

const flashSaleProducts = [
  {
    id: 1,
    name: "Paracetamol",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 88,
    image: imageProduct01,
  },
  {
    id: 2,
    name: "Cetirizine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 65,
    image: imageProduct01,
  },
  {
    id: 3,
    name: "Diphenhydramine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 88,
    image: imageProduct01,
  },
  {
    id: 4,
    name: "Pseudoephedrine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 15,
    image: imageProduct01,
  },
  {
    id: 5,
    name: "Pseudoephedrine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 15,
    image: imageProduct01,
  },
  {
    id: 6,
    name: "Pseudoephedrine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 15,
    image: imageProduct01,
  },
  {
    id: 7,
    name: "Pseudoephedrine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 15,
    image: imageProduct01,
  },
  {
    id: 8,
    name: "Pseudoephedrine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 15,
    image: imageProduct01,
  },
  {
    id: 9,
    name: "Pseudoephedrine",
    price: 35.5,
    originalPrice: 160,
    discount: "-40%",
    rating: 15,
    image: imageProduct01,
  },
];

const FlashSales = () => {
  const scrollContainerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const initialTimeInSeconds = 3 * 24 * 3600 + 12 * 3600 + 30 * 60 + 60;
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = Math.floor(timeLeft % 60);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const scrollOptions = {
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      };
      scrollContainerRef.current.scrollBy(scrollOptions);
    }
  };

  const handleViewAll = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="flash-sales">
      <div className="flash-sales__outer">
        <div className="flash-sales__inner">
          {/* HEADER */}
          <div className="flash-sales-header">
            <div className="header-left-group">
              <div className="today-block">
                <div className="red-rectangle"></div>
                <span className="today-text">Today’s</span>
              </div>

              <div className="title-countdown-row">
                <h2 className="section-title">Flash Sales</h2>

                <div className="countdown-timer">
                  <div className="countdown-item">
                    <span className="countdown-label">Days</span>
                    <span className="countdown-number">
                      {formatNumber(days)}
                    </span>
                  </div>
                  <span className="colon">:</span>
                  <div className="countdown-item">
                    <span className="countdown-label">Hours</span>
                    <span className="countdown-number">
                      {formatNumber(hours)}
                    </span>
                  </div>
                  <span className="colon">:</span>
                  <div className="countdown-item">
                    <span className="countdown-label">Minutes</span>
                    <span className="countdown-number">
                      {formatNumber(minutes)}
                    </span>
                  </div>
                  <span className="colon">:</span>
                  <div className="countdown-item">
                    <span className="countdown-label">Seconds</span>
                    <span className="countdown-number">
                      {formatNumber(seconds)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {!isExpanded && (
              <div className="header-nav-arrows">
                <button
                  className="nav-arrow-btn"
                  onClick={() => handleScroll("left")}
                >
                  <LeftOutlined />
                </button>
                <button
                  className="nav-arrow-btn"
                  onClick={() => handleScroll("right")}
                >
                  <RightOutlined />
                </button>
              </div>
            )}
          </div>

          <div
            className={`flash-sales-container ${isExpanded ? "expanded" : ""}`}
            ref={scrollContainerRef}
          >
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="view-all-container">
            <button className="view-all-btn" onClick={handleViewAll}>
              {isExpanded ? "Hide Products" : "View All Products"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
