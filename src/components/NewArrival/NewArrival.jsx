import React from 'react';
import './NewArrival.css';
import newArrival01 from '../../assets/images/newArrival01.png';
import newArrival02 from '../../assets/images/newArrival02.png';
import newArrival03 from '../../assets/images/newArrival03.png';
import newArrival04 from '../../assets/images/newArrival04.png';

const NewArrival = () => {
  return (
    <section className="new-arrival">
      <div className="new-arrival__outer">
        <div className="new-arrival__inner">

          <div className="new-arrival-header">
            <div className="header-content">

                <div className="label-block">
                    <div className="red-rectangle"></div>
                    <span className="label-text">Featured</span>
                </div>
                
                <h2 className="section-title">New Arrival</h2>
            </div>
          </div>

          <div className="new-arrival-grid">

            <div className="grid-item item-large-left">
                <img src={newArrival01} alt="New Arrival 1" className="grid-image" />
                <div className="overlay-content bottom-left">
                    <h3 className="overlay-title">Social Fruit</h3>
                    <p className="overlay-desc">"Be fresh, be yourself!"</p>
                    <button className="shop-now-btn glass-dark">Shop now</button>
                </div>
            </div>

            <div className="grid-column-right">

                <div className="grid-item item-large-top">
                    <img src={newArrival02} alt="New Arrival 2" className="grid-image" />
                     <div className="overlay-content bottom-left text-dark">
                        <h3 className="overlay-title text-orange">Sanus</h3>
                        <p className="overlay-desc text-orange-dark">“Trusted respiratory relief”</p>
                        <button className="shop-now-btn glass-dark">Shop now</button>
                    </div>
                </div>

                <div className="grid-row-bottom">
                    
                    <div className="grid-item item-small">
                        <img src={newArrival03} alt="New Arrival 3" className="grid-image" />
                         <div className="overlay-content bottom-center">
                            <button className="shop-now-btn glass-dark">Shop now</button>
                        </div>
                    </div>

                    <div className="grid-item item-small">
                        <img src={newArrival04} alt="New Arrival 4" className="grid-image" />
                         <div className="overlay-content bottom-center">
                            <button className="shop-now-btn glass-dark">Shop now</button>
                        </div>
                    </div>

                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default NewArrival;