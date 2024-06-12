import {React, } from "react";
import "../styles/WatchlistMainItem.css";

const WatchlistMainItem = ({
  onClick, //PASSED DOWN HANDLER
  favStock,
  fetchSelectedStockData,
}) => {
  
  let tickerSymbol = { tickerSymbol: favStock.ticker_symbol}
  
  return (
    <div className="watchlist-main-item" onClick={() => fetchSelectedStockData(tickerSymbol)}>
      <img src={favStock.image_url} alt={`${favStock.company_name} logo`} className="stock-image" />
      <div className="stock-details">
        <h2> {favStock.ticker_symbol} </h2>
        <h3> {favStock.company_name} </h3>
        <p> {favStock.description} </p>
        <p><strong>Sector:</strong> {favStock.sector}</p>
        <p><strong>Country:</strong> {favStock.country}</p>
        <p><strong>Currency:</strong> {favStock.currency}</p>
      </div>
    </div>
  );
};


export default WatchlistMainItem;