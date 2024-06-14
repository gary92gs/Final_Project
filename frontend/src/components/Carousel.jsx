import React, { useState } from 'react';
import "../styles/Carousel.css";

function Carousel() {

  return (
    <div className="carousel">
      <div className='carousel-slide'>
        <div className='featured-item'> Item 1</div>
        <div className='featured-item'> Item 2</div>
        <div className='featured-item'> Item 3</div>
        <div className='featured-item'> Item 4</div>
        <div className='featured-item'> Item 5</div>
        <div className='featured-item'> Item 6</div>
        <div className='featured-item'> Item 7</div>
        <div className='featured-item'> Item 8</div>
        <div className='featured-item'> Item 9</div>
        <div className='featured-item'> Item 10</div>
      </div>
     <div className='carousel-slide'>   {/*Duplicate div is for seamless slide */}
        <div className='featured-item'> Item 1</div>
        <div className='featured-item'> Item 2</div>
        <div className='featured-item'> Item 3</div>
        <div className='featured-item'> Item 4</div>
        <div className='featured-item'> Item 5</div>
        <div className='featured-item'> Item 6</div>
        <div className='featured-item'> Item 7</div>
        <div className='featured-item'> Item 8</div>
        <div className='featured-item'> Item 9</div>
        <div className='featured-item'> Item 10</div>
      </div>
    </div>
  );
}

export default Carousel;