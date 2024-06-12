import DataTable from './DataTable'
import TopNavBar from './TopNavBar'
import ItemFavButton from './ItemFavButton'
import '../styles/SelectedStock.css'
import { useState } from 'react'
import WatchlistSidebar from './WatchlistSidebar'
import { Graph } from './Graph'

function SelectedStock({ currentItemId, setCurrentItemId, isMobile, stockData, setFavStocks, favStocks, fetchFavData }) {
  console.log("in Selected stock, current Item id:", currentItemId)

  const handleClick = () => {
    setCurrentItemId(null)
  }

  let firstReportYear = null;
  let lastReportYear = null;

  if (stockData.historical_data && stockData.historical_data.length > 0) {
    const years = stockData.historical_data.map(data => data.report_year);
    firstReportYear = Math.min(...years);
    lastReportYear = Math.max(...years);
  }

  return(

      <article className='stock-article'> 
        <div className='close-button'>
          <div onClick={handleClick}>X</div>
          </div>
        <div className='stock-title-card'>
          <h1> {stockData.stocks.company_name} </h1>
          <span> {firstReportYear} - {lastReportYear} </span>
        </div>
        <ItemFavButton setFavStocks={setFavStocks} favStocks={favStocks} currentItemId={currentItemId} setCurrentItemId={setCurrentItemId} fetchFavData={fetchFavData}/>
        <div className='stock-info'>
          {/* Datatable only rendered on desktop */}
          <h2> Stock Description/Summary </h2>
          <p> {stockData.stocks.description} </p>
          {/* Chart.js */}
          <Graph stockData={stockData}/>
        {!isMobile() ? (
            <DataTable stockData={stockData}/> 
          ) : undefined}
        </div>
      </article>


  )
}

export default SelectedStock