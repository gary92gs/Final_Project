import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain'
import '../styles/HomePage.css'

function HomePage({favStocks}) {
  return (
    <div className='home-page-container'>
          <WatchlistSidebar favStocks={favStocks} />
          <WatchlistMain favStocks={favStocks}/>
    </div>
  )
}

export default HomePage