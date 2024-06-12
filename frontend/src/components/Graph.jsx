import {React, useState} from 'react';
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
import faker from 'faker';

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
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export function Graph({ stockData }) {
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: []
  });

  if (stockData.stockData.historical_data && stockData.stockData.historical_data.length > 0) {
    // Access the historical_data array
    const historicalData = stockData.stockData.historical_data;

    // Get the values of the object
    const values = Object.values(historicalData);
    const reportQuarter = values.map(item => item.report_quarter);
    const reportYear = values.map(item => item.report_year);
    const bookValues = values.map(item => item.book_value);
    console.log("BV" , bookValues);
    console.log("RY", reportYear)
    console.log("RQ", reportQuarter)

    // Log the values to the console
    console.log("values", values);
    console.log("historical data", historicalData )
    
} else {
    console.log('historical_data is undefined or empty');
}


  return (

  <div className='graph-container'>
    <Line 
    options={options} 
    data={data}
    />
   </div>
  );
}