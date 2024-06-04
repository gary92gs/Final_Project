import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain'
import SearchResultList from './SearchResultList';
import SelectedStock from './SelectedStock';
import '../styles/HomePage.css'


function HomePage({favStocks, searchResults, currentItemId, setCurrentItemId}) {
  
  return (
    <div className='home-page-container'>
      <div className='home-page-container2'>
          <WatchlistSidebar favStocks={favStocks} setCurrentItemId={setCurrentItemId}/>
          {searchResults.length > 0 ? (
            <SearchResultList searchResults={searchResults} />
          ) : (
            <WatchlistMain favStocks={favStocks} setCurrentItemId={setCurrentItemId}/>
          )}
      </div>   
    </div>
  )
}

export default HomePage