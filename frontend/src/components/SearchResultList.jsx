import SearchResultItem from '../components/SearchResultItem'
import '../styles/SearchResultList.css'
const SearchResultList = ({ searchResults = [] }) => {
  return (
    <div className='search-results'>
        {searchResults.map((stock, index) => (
          <SearchResultItem
            key={index}
            symbol={stock.symbol}
            name={stock.name}
          />
        ))}
    </div>
  );
};

export default SearchResultList;