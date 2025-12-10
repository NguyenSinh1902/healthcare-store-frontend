import React, { useState } from 'react';
import './ProductImage.css';

// images prop is an array of image URLs for the product
const ProductImage = ({ images = [] }) => {
    const defaultImages = ['https://placehold.co/500x600?text=No+Image'];
    const imgList = images.length > 0 ? images : defaultImages;
    const [selectedImage, setSelectedImage] = useState(imgList[0]);

    return (
        <div className="pi-product-image-container">
            <div className="thumbnail-list">
                {imgList.map((img, index) => (
                    <div
                        key={index}
                        className={`thumbnail-item ${selectedImage === img ? 'active' : ''}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt={`view-${index}`} />
                    </div>
                ))}
            </div>

            <div className="main-image-display">
                <img src={selectedImage} alt="Main Product" />
            </div>
        </div>
    );
};

export default ProductImage;