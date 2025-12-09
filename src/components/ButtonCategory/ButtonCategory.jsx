import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonCategory.css';
import { RightOutlined } from '@ant-design/icons';
import { getParentCategories, getSubCategories } from '../../services/categoryService';

const placeholderIcon = "https://placehold.co/50x50";
const placeholderSubImage = "https://placehold.co/131x88";

const ButtonCategory = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch parent categories on mount
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await getParentCategories();
        if (response && response.success) {
          setCategories(response.data);
          // Set first category as active by default if available
          if (response.data.length > 0) {
            setActiveCategoryId(response.data[0].idCategory);
          }
        }
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };
    fetchParents();
  }, []);

  // Fetch subcategories when activeCategoryId changes
  useEffect(() => {
    const fetchSubs = async () => {
      if (!activeCategoryId) return;

      try {
        setLoading(true);
        const response = await getSubCategories(activeCategoryId);
        if (response && response.success) {
          setSubCategories(response.data);
        } else {
          setSubCategories([]);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setSubCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubs();
  }, [activeCategoryId]);

  const handleNavigate = (id) => {
    // Navigate to category page with ID
    navigate(`/category/${id}`);

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="category-dropdown">
      <div className="category-triangle"></div>
      <div className="category-container">

        <div className="category-sidebar">
          {categories.map((category) => (
            <div
              key={category.idCategory}
              className={`category-item ${category.idCategory === activeCategoryId ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategoryId(category.idCategory)}
              onClick={() => handleNavigate(category.idCategory)}
            >
              <div className="category-item-content">
                <img
                  src={category.imageCategory || placeholderIcon}
                  alt={category.nameCategory}
                  className="cat-icon"
                  onError={(e) => { e.target.src = placeholderIcon }}
                />
                <span className="cat-label">{category.nameCategory}</span>
              </div>
              {category.idCategory === activeCategoryId && <RightOutlined className="arrow-icon" />}
            </div>
          ))}
        </div>

        <div className="category-content">
          <div className="sub-category-grid">
            {loading ? (
              <p className="loading-text">Loading...</p>
            ) : subCategories.length > 0 ? (
              subCategories.map((sub) => (
                <div
                  key={sub.idCategory}
                  className="sub-category-card"
                  onClick={() => handleNavigate(sub.idCategory)}
                >
                  <div className="sub-image-wrapper">
                    <img
                      src={sub.imageCategory || placeholderSubImage}
                      alt={sub.nameCategory}
                      className="sub-image"
                      onError={(e) => { e.target.src = placeholderSubImage }}
                    />
                  </div>
                  <p className="sub-label">{sub.nameCategory}</p>
                </div>
              ))
            ) : (
              <p className="no-data-text">No sub-categories available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonCategory;