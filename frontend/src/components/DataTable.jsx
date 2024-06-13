import React from "react";
import "../styles/DataTable.css";
import "../styles/global.css";


function DataTable({ stockData }) {
  const dataRows = stockData.historical_data.map((dataRow, index) => {
    return (
      <>
        <div className="data-row-value">{dataRow.report_year}</div>
        <div className="data-row-value report-quarter">{dataRow.report_quarter}</div>
        <div className="data-row-value">{dataRow.quarterly_price_median}</div>
        <div className="data-row-value">{dataRow.book_value}</div>
        <div className="data-row-value net-income">{dataRow.net_income}</div>
        <div className="data-row-value outstanding-shares">{dataRow.outstanding_shares}</div>
        <div className="data-row-value shareholders-equity">{dataRow.shareholders_equity}</div>
        <div className="data-row-value">{dataRow.reported_eps}</div>
        <div className="data-row-value">{dataRow.quarterly_dividend}</div>
        <div className="data-row-value">{dataRow.total_dividend_payout}</div>
      </>
    )
  });
  return (
    <div className='data-table'>

        <div className="data-row-value">Year</div>
        <div className="data-row-value report-quarter">Quarter</div>
        <div className="data-row-value">Price Median</div>
        <div className="data-row-value">Book Value</div>
        <div className="data-row-value">Net Income</div>
        <div className="data-row-value">Otsd. Shares</div>
        <div className="data-row-value">Shld. Equity</div>
        <div className="data-row-value">EPS</div>
        <div className="data-row-value">Div/Share</div>
        <div className="data-row-value">Total Div</div>

      {dataRows}
    </div>
  )
}

export default DataTable;