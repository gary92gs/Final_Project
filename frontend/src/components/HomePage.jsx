import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain'
import SearchResultList from './SearchResultList';
import SelectedStock from './SelectedStock';
import '../styles/HomePage.css'


function HomePage({favStocks, searchResults, currentItemId, setCurrentItemId}) {
  console.log("Current Item Id " , currentItemId)

  return (
    <div className='home-page-container'>
      <div className='home-page-container2'>
          <WatchlistSidebar favStocks={favStocks} setCurrentItemId={setCurrentItemId} currentItemId={currentItemId} />

          {searchResults.length > 0 ? (
          <SearchResultList searchResults={searchResults} setCurrentItemId={setCurrentItemId} />
        ) : currentItemId !== null ? (
          <SelectedStock currentItemId={currentItemId} />
        ) : (
          <WatchlistMain favStocks={favStocks} setCurrentItemId={setCurrentItemId} />
        )}

      </div>   
    </div>
  )
}

export default HomePage