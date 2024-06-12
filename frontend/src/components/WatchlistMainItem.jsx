import {React, } from "react";
import "../styles/WatchlistMainItem.css";

const WatchlistMainItem = ({
  onClick, //PASSED DOWN HANDLER
  favStock,
  fetchSelectedStockData,
}) => {
  
  let tickerSymbol = { tickerSymbol: favStock.ticker_symbol}
  
  return (
      <div className="stock-details">
    <div className="watchlist-main-item" onClick={() => fetchSelectedStockData(tickerSymbol)}>
          <h2> {favStock.company_name} </h2>
          <div className='watchlist-main-body'>
        <div className='watchlist-main-item-headers'>    
      <img src={favStock.image_url} alt={`${favStock.company_name} logo`} className="stock-image" />
          <h3> {favStock.ticker_symbol} </h3>
          <h4>Country: {favStock.country}</h4> 
        </div>
        {/* <h3> Company Description </h3> */}
        <div className="stock-description">
        <p> {favStock.description} </p>
        </div>
        </div>
      </div>
    </div>
  );
};


export default WatchlistMainItem;