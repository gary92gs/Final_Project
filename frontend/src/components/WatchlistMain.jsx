
import React from "react";
import "../styles/WatchlistMain.css";
import WatchlistMainItem from "../components/WatchlistMainItem";

function WatchlistMain({ setCurrentItemId, currentItemId }) {

  
  const handleClick = (id) => { //WORKING HANDLER FOR SETTING STATE FOR GETTIGN SELECTED STOCK
    setCurrentItemId(id);
    console.log("Current Item Id " , currentItemId)
  }


  const stockData = {
    id: 1,
    tickerSymbol: 'GME',
    companyName: 'GameStop Corp.',
    stockImage: 'https://styles.redditmedia.com/t5_3nimn/styles/communityIcon_cho9chd8ug431.jpg?format=pjpg&s=e4500f8195a317b675dabd11d245047ac400aa8b',
    description: 'GameStop Corp. operates as a multi-channel video game, consumer electronics, and collectibles retailer.',
    industrySector: 'Consumer Cyclical',
    country: 'United States',
    intrinsicValue: 150.00,
    marketValue: 180.00,
    returnOnEquity: 12.5,
    peRatio: 15.2,
    historicalPerformance: [140, 150, 160, 170, 180],
    profit: 20.5
  };

  return (
    <div className="watchlist-container">

        <WatchlistMainItem
          onClick={() => handleClick(stockData.id)}
          // setCurrentItemId={setCurrentItemId}
          // id={stockData.id}
          tickerSymbol={stockData.tickerSymbol}
          companyName={stockData.companyName}
          stockImage={stockData.stockImage}
          description={stockData.description}
          industrySector={stockData.industrySector}
          country={stockData.country}
          intrinsicValue={stockData.intrinsicValue}
          marketValue={stockData.marketValue}
          returnOnEquity={stockData.returnOnEquity}
          peRatio={stockData.peRatio}
          historicalPerformance={stockData.historicalPerformance}
          profit={stockData.profit} />
    </div>
  )
}

export default WatchlistMain;