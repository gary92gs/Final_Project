import '../styles/SearchResultList.css'
import axios from 'axios';

function SearchResultItem ({symbol, name, setCurrentItemId, }) {

  const fetchData = async () => { //fetch's datat
    try {
      const response = await axios.get('/api/dashboard-analysis', {params: { tickerSymbol: symbol}});
      setCurrentItemId(response.data.allAnalysisData.current_data.stock_id)
      console.log(response);
      console.log('Current Item Id', setCurrentItemId)
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  return (
    <div className='search-result-item' onClick={fetchData}>
      <span className='search-result-symbol'>{symbol}</span> - <span className='search-result-name'>{name}</span>
    </div>
  )
  
}

export default SearchResultItem;