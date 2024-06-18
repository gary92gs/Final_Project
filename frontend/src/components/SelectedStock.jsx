import DataTable from './DataTable'
import ItemFavButton from './ItemFavButton'
import StatBadgeContainer from './StatBadgeContainer'
import '../styles/SelectedStock.css'
import { useState, useEffect } from 'react'
import { Graph } from './Graph'
import '../styles/BackgroundImage.css'

function SelectedStock({ currentItemId, setCurrentItemId, isMobile, stockData, setFavStocks, favStocks, fetchFavData }) {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {

    setAnimate(true);

    const timer = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, [stockData]);
  
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

  return (

    <article className='stock-article'>
    <div
      className={`selected-stock-header ${animate ? 'animate' : ''}`}
      style={{ backgroundImage: `url(${stockData.stocks.image_url})` }}
      aria-label="Company Logo"
    >
    <div className='stock-title-card'>
      <div className='stock-title-card-left'>
        <h1> {stockData.stocks.company_name} </h1>
    </div>
      </div>
      <div className='stock-title-card-right'>
        <div className='close-button'>
          <div onClick={handleClick}>X</div>
        </div>
        <ItemFavButton
          setFavStocks={setFavStocks}
          favStocks={favStocks}
          currentItemId={currentItemId}
          setCurrentItemId={setCurrentItemId}
          fetchFavData={fetchFavData}
        />
      </div>
    </div>
    <div className='market-details-container'>
      <h2>Market Details</h2>

      <StatBadgeContainer stockData={stockData} />
    </div>

    <div className='selected-stock-summary-container'>
      {/* Datatable only rendered on desktop */}
    </div>
    <div className='stock-info'>
      {/* Chart.js */}
      <Graph stockData={stockData} />
      {!isMobile() ? (
        <DataTable stockData={stockData} />
      ) : undefined}
      <div className="selected-stock-description">
        <h2> Company Summary </h2>
        <p> {stockData.stocks.description} </p>
      </div>
    </div>
  </article>
  )
}

export default SelectedStock