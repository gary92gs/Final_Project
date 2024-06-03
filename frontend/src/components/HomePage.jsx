import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain'
import SearchResultList from './SearchResultList';
import '../styles/HomePage.css'


function HomePage({favStocks, searchResults}) {
  
  return (
    <div className='home-page-container'>
          <WatchlistSidebar favStocks={favStocks} />
          {searchResults.length > 0 ? (
            <SearchResultList searchResults={searchResults} />
          ) : (
            <WatchlistMain favStocks={favStocks}/>
          )}
    </div>
  )
}

export default HomePage