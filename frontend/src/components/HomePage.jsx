import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain'
import '../styles/HomePage.css'

function HomePage({favStocks}) {
  return (
    <div className='home-page'>
      <div className='watchlist-sidebar'>
        <WatchlistSidebar favStocks={favStocks} />
      </div>
      <div className='watchlist-main'>
        <WatchlistMain favStocks={favStocks}/>
      </div>
    </div>
  )
}

export default HomePage