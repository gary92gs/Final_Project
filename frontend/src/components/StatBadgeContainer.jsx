import React from 'react';
import '../styles/StatBadgeContainer.css';
import '../styles/BackgroundImage.css';


const StatBadgeContainer = (props) => {
  const { stockData } = props;

  return (
    <div className="stat-badge-grid">
      <div className='stat-badge'>
          <p>Current Stock Price</p>
          <h3>${stockData.current_stock_price}</h3>
      </div>
      <div className='stat-badge'>
          <p>Intrinsic Value</p>
          <h3>${stockData.intrinsic_value}</h3>
      </div>
      <div className='stat-badge'>
          <p>IV/Price Ratio</p>
          <h3>{stockData.iv_to_price_ratio}</h3>
      </div>
      <div className='stat-badge'>
          <p>Beta</p>
          <h3>{stockData.current_data.investment_beta}</h3>
      </div>
      <div className='stat-badge'>
          <p>EPS</p>
          <h3>${stockData.current_data.eps}</h3>
      </div>
      <div className='stat-badge'>
          <p>P/E Ratio</p>
          <h3>{stockData.current_data.pe_ratio}</h3>
      </div>
      <div className='stat-badge'>
          <p>Dividend Per Share</p>
          <h3>${stockData.current_data.dividend_per_share}</h3>
      </div>
      <div className='stat-badge'>
          <p>Dividend Yield</p>
          <h3>{stockData.current_data.dividend_yield}%</h3>
      </div>
    </div>
  )
}

export default StatBadgeContainer;