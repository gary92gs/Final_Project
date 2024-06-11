import SearchResultItem from '../components/SearchResultItem'
import '../styles/SearchResultList.css'
const SearchResultList = ({ searchResults = [], setCurrentItemId, currentItemId, setStockData}) => {

  const handleClick = (id) => {
    setCurrentItemId(id);
    console.log("Current Item Id " , currentItemId)
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
          />
        ))}
    </div>
  );
};

export default SearchResultList;