import DataTable from './DataTable'
import TopNavBar from './TopNavBar'
import ItemFavButton from './ItemFavButton'
import { useState } from 'react'

function SelectedStock() {

const {selectedStock, setSelectedStock} = useState()

  return(
    <div>
      <TopNavBar/>
      <article> 
        {/* <h1>{stock.name} {stock.current} - {stock.past} Hello </h1> */}
        <h1> Stock Title </h1>
        <ItemFavButton />
        <DataTable/>
        <h2> Stock Description/Summary </h2>
        <p> ```````````````````````````````````````````````````````````````` </p>
        {/* Chart.js */}
      </article>
    </div>


  )
}

export default SelectedStock