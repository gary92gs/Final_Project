import {React, useState, useEffect} from 'react';
import '../styles/Graph.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Historical Stock Data',
    },
  },
};


export function Graph({ stockData }) {
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (stockData.historical_data && stockData.historical_data.length > 0) {
      const historicalData = stockData.historical_data;

    // Get the values of the object
    const values = Object.values(historicalData);

    const reportQuarters = values.map(item => item.report_quarter);

    let years = values.map(item => item.report_year);
    const reportYears = years.reverse();

    const bookValues = values.map(item => item.book_value);

    const netIncome = values.map(item => item.net_income);

    const quarterlyDividend = values.map(item => item.quarterly_dividend);

    const totalDividend = values.map(item => item.total_dividend_payout);

    const quarterlyPriceMedian = values.map(item => item.quarterly_price_median);

    const outstandingShares = values.map(item => item.outstanding_shares);

    const shareholdersEquity = values.map(item => item.shareholders_equity);

    const m1Open = values.map(item => item.m1_open);
    const m1Low = values.map(item => item.m1_low);
    const m1High = values.map(item => item.m1_high);
    const m1Close = values.map(item => item.m1_close);

    const m2Open = values.map(item => item.m2_open);
    const m2Low = values.map(item => item.m2_low);
    const m2High = values.map(item => item.m2_high);
    const m2Close = values.map(item => item.m2_close);

    const m3Open = values.map(item => item.m3_open);
    const m3Low = values.map(item => item.m3_low);
    const m3High = values.map(item => item.m3_high);
    const m3Close = values.map(item => item.m3_close);
    
    const reportedEps = values.map(item => item.reported_eps)

    setLineData({
      labels: reportYears, 
      datasets: [
        {
          label: "Quarterly Price Median",
          data: quarterlyPriceMedian,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Book Value',
          data: bookValues,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: "Net Income",
          data: netIncome,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        { 
          label: "Outstanding Shares",
          data: outstandingShares,
          borderColor: 'rgb(139,69,19)',
          backgroundColor: 'rgba(139,69,19,0.5)',
        },
        { 
          label: "Shareholders Equity",
          data: shareholdersEquity,
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
        {
          label: "Reported EPS",
          data: reportedEps,
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        {
          label: "Quarterly Dividend",
          data: quarterlyDividend,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
        {
          label: "Total Dividends",
          data: totalDividend,
          borderColor: 'rgb(99, 255, 132)',
          backgroundColor: 'rgba(99, 255, 132, 0.5)',
        },
      ]
    });
  } else {
    console.log('historical_data is undefined or empty');
  }
}, [stockData]);

  return (

  <div className='graph-container'>
    <Line 
    options={options} 
    data={lineData}
    />
   </div>
  );

}