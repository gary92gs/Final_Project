
import React from "react";
import "../styles/WatchlistMain.css";
import WatchlistMainItem from "../components/WatchlistMainItem";

function WatchlistMain({ setCurrentItemId, currentItemId, favStocks, fetchSelectedStockData }) {

  return (
    <div className="watchlist-container">

       { favStocks.map((favStock, index) => ( /* Map through the favStocks array */
            <WatchlistMainItem
              key={index} /* Use index as key since id might not be unique */
              favStock={favStock}
              setCurrentItemId={setCurrentItemId}
              currentItemId={currentItemId}
              fetchSelectedStockData={fetchSelectedStockData}
            />
         ))
      }
    </div>
  )
}

export default WatchlistMain;