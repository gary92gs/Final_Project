import React from "react";
import "../styles/DataTable.css";
import "../styles/global.css";

function DataTable({ stockData }) {
  const dataRows = stockData.historical_data.map((dataRow, index) => {
    const rowClass = index % 2 === 0 ? 'even-row' : 'odd-row';
    return (
      <React.Fragment key={index}>
        <div className={`data-row-value ${rowClass}`}>{dataRow.report_year}</div>
        <div className={`data-row-value report-quarter ${rowClass}`}>{dataRow.report_quarter}</div>
        <div className={`data-row-value ${rowClass}`}>{dataRow.quarterly_price_median}</div>
        <div className={`data-row-value ${rowClass}`}>{dataRow.book_value}</div>
        <div className={`data-row-value net-income ${rowClass}`}>{dataRow.net_income}</div>
        <div className={`data-row-value outstanding-shares ${rowClass}`}>{dataRow.outstanding_shares}</div>
        <div className={`data-row-value shareholders-equity ${rowClass}`}>{dataRow.shareholders_equity}</div>
        <div className={`data-row-value ${rowClass}`}>{dataRow.reported_eps}</div>
        <div className={`data-row-value ${rowClass}`}>{dataRow.quarterly_dividend}</div>
        <div className={`data-row-value ${rowClass}`}>{dataRow.total_dividend_payout}</div>
      </React.Fragment>
    );
  });

  return (
    <div className='data-table'>
      <div className="data-row-value header">Year</div>
      <div className="data-row-value header report-quarter">Quarter</div>
      <div className="data-row-value header ">Price Median</div>
      <div className="data-row-value header ">Book Value</div>
      <div className="data-row-value header ">Net Income</div>
      <div className="data-row-value header ">Otsd. Shares</div>
      <div className="data-row-value header ">Shld. Equity</div>
      <div className="data-row-value header ">EPS</div>
      <div className="data-row-value header ">Div/Share</div>
      <div className="data-row-value header ">Total Div</div>

      {dataRows}
    </div>
  );
}

export default DataTable;