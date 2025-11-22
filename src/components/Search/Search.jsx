import React from 'react';
import './Search.css';

const searchResultData = [
  {
    id: 1,
    name: "Ginkgo Biloba Extract – Brain Circulation and Memory Support",
    price: 35.7,
    image: "https://placehold.co/50x50",
  },
  {
    id: 2,
    name: "Omega-3 Fish Oil – Brain and Heart Health Support",
    price: 46.2,
    image: "https://placehold.co/50x50",
  },
  {
    id: 3,
    name: "Neurobion – Vitamin B Complex for Nerve Health",
    price: 89.5,
    image: "https://placehold.co/50x50",
  },
];

const Search = () => {
  return (
    <div className="search-dropdown">
      {searchResultData.map((item) => (
        <div key={item.id} className="search-item">
          <img src={item.image} alt={item.name} className="search-item-img" />
          <div className="search-item-info">
            <div className="search-item-name">{item.name}</div>
            <div className="search-item-price">${item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;