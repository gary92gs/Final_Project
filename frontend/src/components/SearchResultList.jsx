import SearchResultItem from '../components/SearchResultItem'
import '../styles/SearchResultList.css'

const SearchResultList = ({ 
  searchResults = [], 
  setCurrentItemId, 
  setStockData, 
  fetchSelectedStockData}) => {

  const handleClick = (id) => {
    setCurrentItemId(id);
  }

  return (
    <div className='search-results'>
        {searchResults.map((stock, index) => (
          <SearchResultItem
            key={stock.id}
            symbol={stock.symbol}
            name={stock.name}
            onClick={() => handleClick(stock.id)}
            setCurrentItemId={setCurrentItemId}
            setStockData={setStockData}
            fetchSelectedStockData={fetchSelectedStockData}
          />
        ))}
    </div>
  );
};

export default SearchResultList;