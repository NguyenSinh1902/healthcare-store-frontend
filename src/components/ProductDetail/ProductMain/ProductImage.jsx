import React, { useState } from 'react';
import './ProductImage.css';

const images = [
    "https://placehold.co/500x600/png?text=Front+View",
    "https://placehold.co/500x600/png?text=Side+View",
    "https://placehold.co/500x600/png?text=Back+View",
    "https://placehold.co/500x600/png?text=Detail"
];

const ProductImage = () => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="pi-product-image-container">
            <div className="thumbnail-list">
                {images.map((img, index) => (
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