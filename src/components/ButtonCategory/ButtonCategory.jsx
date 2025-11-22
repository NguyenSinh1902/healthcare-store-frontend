import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonCategory.css';
import { RightOutlined } from '@ant-design/icons';

const placeholderIcon = "https://placehold.co/50x50";
const placeholderSubImage = "https://placehold.co/131x88";

const categoriesData = [
  {
    id: 'medicine',
    label: 'Medicine',
    icon: placeholderIcon,
    subCategories: [
      { id: 'brain', label: 'Brain supplements', image: placeholderSubImage },
      { id: 'eye', label: 'Eye health supplements', image: placeholderSubImage },
    ]
  },
  {
    id: 'functional-food',
    label: 'Functional Food',
    icon: placeholderIcon,
    subCategories: [
      { id: 'brain', label: 'Brain supplements', image: placeholderSubImage },
      { id: 'eye', label: 'Eye health supplements', image: placeholderSubImage },
      { id: 'liver', label: 'Liver support supplements', image: placeholderSubImage },
      { id: 'immune', label: 'Immune system boosters', image: placeholderSubImage },
      { id: 'joint', label: 'Joint & bone supplements', image: placeholderSubImage },
    ]
  },
  {
    id: 'medical-equipment',
    label: 'Medical equipment',
    icon: placeholderIcon,
    subCategories: []
  },
  {
    id: 'beauty-care',
    label: 'Beauty care',
    icon: placeholderIcon,
    subCategories: []
  }
];

const ButtonCategory = ({ onClose }) => { 
  const [activeCategoryId, setActiveCategoryId] = useState(categoriesData[0].id);
  const navigate = useNavigate();

  const activeCategory = categoriesData.find(cat => cat.id === activeCategoryId);
  const subCategories = activeCategory ? activeCategory.subCategories : [];

  const handleNavigate = (id) => {
    navigate('/category');

    if (onClose) {
        onClose();
    }
  };

  return (
    <div className="category-dropdown">
      <div className="category-triangle"></div>
      <div className="category-container">

        <div className="category-sidebar">
          {categoriesData.map((category) => (
            <div 
              key={category.id}
              className={`category-item ${category.id === activeCategoryId ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategoryId(category.id)}

              onClick={() => handleNavigate(category.id)}
            >
              <div className="category-item-content">
                <img src={category.icon} alt={category.label} className="cat-icon" />
                <span className="cat-label">{category.label}</span>
              </div>
              {category.id === activeCategoryId && <RightOutlined className="arrow-icon" />}
            </div>
          ))}
        </div>

        <div className="category-content">
          <div className="sub-category-grid">
            {subCategories.length > 0 ? (
              subCategories.map((sub) => (
                <div 
                    key={sub.id} 
                    className="sub-category-card"

                    onClick={() => handleNavigate(sub.id)} 
                >
                  <div className="sub-image-wrapper">
                    <img src={sub.image} alt={sub.label} className="sub-image" />
                  </div>
                  <p className="sub-label">{sub.label}</p>
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