
import React from "react";
import "../styles/WatchlistMainItem.css";

const WatchlistMainItem = ({
  setCurrentItemId,
  tickerSymbol,
  companyName,
  stockImage,
  description,
  industrySector,
  country,
  intrinsicValue,
  marketValue,
  returnOnEquity,
  peRatio,
  historicalPerformance,
  profit,
  id
}) => {
 const handleClick = () => {
  setCurrentItemId(id)
 }

  return (
    <div className="watchlist-main-item" onClick={handleClick}>
      <img src={stockImage} alt={`${companyName} logo`} className="stock-image" />
      <div className="stock-details">
        <h2> {tickerSymbol} </h2>
        <h3> {companyName} </h3>
        <p> {description} </p>
        <p><strong>Sector:</strong> {industrySector}</p>
        <p><strong>Country:</strong> {country}</p>
      </div>
      <div className="stock-data">
        <p> <strong>Intrinsic Value:</strong> ${intrinsicValue}</p>
        <p> <strong>Market Value:</strong> ${marketValue}</p>
        <p> <strong>Return on Equity:</strong> {returnOnEquity}%</p>
        <p> <strong>P/E Ratio:</strong> {peRatio}</p>
        <p ><strong>Historical Performance:</strong> {historicalPerformance.join(', ')}</p>
        <p> <strong>Profit:</strong> ${profit}M</p>
      </div>
    </div>
  );
};

export default WatchlistMainItem;