import DataTable from './DataTable'
import TopNavBar from './TopNavBar'
import ItemFavButton from './ItemFavButton'
import '../styles/SelectedStock.css'
import { useState } from 'react'
import WatchlistSidebar from './WatchlistSidebar'
import { Graph } from './Graph'

function SelectedStock({ currentItemId, setCurrentItemId }) {

  const handleClick = () => {
    setCurrentItemId(null)
  }

  return(
    <div>
      <article className='stock-article'> 
        <div className='close-button'>
          <div onClick={handleClick}>X</div>
          </div>
        <div className='stock-title-card'>
          <h1> Stock Title </h1>
          <span>2009 - 2024 </span>
        </div>
        <ItemFavButton />
        <div className='stock-info'>
        <DataTable/>
          <h2> Stock Description/Summary </h2>
          <p> Apple Inc. stands out for its commitment to innovation, quality, and design. Its diverse product line and ecosystem offer seamless integration and a superior user experience. From revolutionizing personal computing with the Macintosh to redefining the smartphone with the iPhone, Apple continues to shape the future of technology and consumer electronics. </p>
          {/* Chart.js */}
          <Graph />
        </div>
      </article>
    </div>


  )
}

export default SelectedStock