import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { searchProducts } from '../../services/productService';

const Search = ({ query, onClose }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || query.trim() === '') {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await searchProducts(query);
        if (response && response.success) {
          setResults(response.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error searching products:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // SỬA LẠI HÀM NÀY
  const handleItemClick = (e, id) => {
    e.stopPropagation(); // <--- Dòng quan trọng: Ngăn chặn click lan ra header__search

    navigate(`/product-detail/${id}`);
    if (onClose) {
      onClose();
    }
  };

  if (!query) return null;

  return (
    <div className="search-dropdown">
      {loading ? (
        <div className="search-loading">Loading...</div>
      ) : results.length > 0 ? (
        results.map((item) => (
          <div
            key={item.idProduct}
            className="search-item"
            // Truyền event (e) vào hàm xử lý
            onClick={(e) => handleItemClick(e, item.idProduct)}
          >
            <img
              src={item.imageProduct || "https://placehold.co/50x50"}
              alt={item.nameProduct}
              className="search-item-img"
              onError={(e) => { e.target.src = "https://placehold.co/50x50" }}
            />
            <div className="search-item-info">
              <div className="search-item-name">{item.nameProduct}</div>
              <div className="search-item-price">${item.price}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="search-no-results">No results found for "{query}"</div>
      )}
    </div>
  );
};

export default Search;