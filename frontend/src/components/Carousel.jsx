import React, { useState } from 'react';
import "../styles/Carousel.css";

function Carousel({ trendingStocks, setCurrentItemId, fetchSelectedStockData }) {

  const carouselSlides = trendingStocks.map((element, index) => {
    let tickerSymbol = { tickerSymbol: element.ticker_symbol}

    return (
      <article key={index} className='featured-item' onClick={() => fetchSelectedStockData(tickerSymbol)}>
        <img src={element.image_url} alt={`${element.company_name} logo`} />
        <div>
          <p>{element.ticker_symbol}</p>
          <p>{element.company_name}</p>
        </div>
      </article >
    );
  });

return (
  <div className="carousel-container">
    <h2>Portfolio Prophets Top Picks</h2>
    <div className="carousel">
      <div className='carousel-slide'>
        {carouselSlides}
      </div>
      <div className='carousel-slide'>   {/*Duplicate div is for seamless slide */}
        {carouselSlides}
      </div>
    </div>
  </div>
);
}

export default Carousel;