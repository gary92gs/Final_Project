import DataTable from './DataTable'
import TopNavBar from './TopNavBar'
import ItemFavButton from './ItemFavButton'
import '../styles/SelectedStock.css'
import { useState } from 'react'
import WatchlistSidebar from './WatchlistSidebar'
import { Graph } from './Graph'

function SelectedStock() {

  const favStocks = [
    {
      id: 1,
      company_name: 'Samsung',
      industry_sector: 'Digital Technologies'
    },
    {
      id: 2,
      company_name: 'Sketchers',
      industry_sector: 'Apparel'
    },
    {
      id: 3,
      company_name: 'Bitcoin',
      industry_sector: 'Finance'
    },
    {
      id: 4,
      company_name: 'Litecoin',
      industry_sector: 'Finance'
    },
    {
      id: 5,
      company_name: 'Apple',
      industry_sector: 'Technology'
    },
    {
      id: 6,
      company_name: 'Google',
      industry_sector: 'Technology'
    }
  ];
const {selectedStock, setSelectedStock} = useState()

  return(
    <div>
      <TopNavBar/>
      <div className='selected-container'>
      <WatchlistSidebar favStocks={favStocks}/>
      <article className='stock-article'> 
        {/* <h1>{stock.name} {stock.current} - {stock.past} Hello </h1> */}
        <div className='stock-title-card'>
          <h1> Stock Title </h1>
          <span>2009 - 2024 </span>
        </div>
        <div className='stock-info'>
        <DataTable/>
          <h2> Stock Description/Summary </h2>
          <p> Apple Inc. stands out for its commitment to innovation, quality, and design. Its diverse product line and ecosystem offer seamless integration and a superior user experience. From revolutionizing personal computing with the Macintosh to redefining the smartphone with the iPhone, Apple continues to shape the future of technology and consumer electronics. </p>
          {/* Chart.js */}
          <Graph />
          <ItemFavButton />
        </div>
      </article>
      </div>
    </div>


  )
}

export default SelectedStock