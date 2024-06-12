
import React from "react";
import "../styles/WatchlistMain.css";
import WatchlistMainItem from "../components/WatchlistMainItem";

function WatchlistMain({ setCurrentItemId, currentItemId, favStocks }) {
  const handleClick = (id) => { //WORKING HANDLER FOR SETTING STATE FOR GETTIGN SELECTED STOCK
    setCurrentItemId(id);
    console.log("Current Item Id " , currentItemId)
  }
  
  return (
    <div className="watchlist-container">

       { favStocks.map((favStock, index) => ( /* Map through the favStocks array */
            <WatchlistMainItem
              key={index} /* Use index as key since id might not be unique */
              favStock={favStock}
              setCurrentItemId={setCurrentItemId}
              currentItemId={currentItemId}
              onClick={() => handleClick(favStock.id)}
            />
         ))
      }
    </div>
  )
}

export default WatchlistMain;