import React from 'react';
import "../styles/SearchBar.css";
import axios from 'axios';

function SearchBar({ setSearchResults, setSearchValue, searchValue, setCurrentItemId}) {

  const updateSearchBarValue = (e) => {
    setSearchValue(e.target.value);
  };

  const submitStockSearch = async (e, searchValue) => {

    e.preventDefault();
    setCurrentItemId(null);
    
    try {
      const response = await axios.get('/api/search', { params: { searchTerm: searchValue } });
      const response1 = response.data.data
      const searchResult = response1.map(element => {
        const values = Object.values(element)
        return{
          symbol: values[0],
          name: values[1],
        }
      })
          
      // console.log('searchResults:', searchResult);
      setSearchResults(searchResult)
    } catch (error) {
      console.log(`Error Fetching Data: ${error}`);
    }

  };


  return (
    <div className='searchbar'>
      <form onSubmit={(e) => submitStockSearch(e, searchValue)} >
        <input
          className='searchbar'
          type="text"
          id='search'
          value={searchValue}
          onChange={updateSearchBarValue}
        />
          <button className='searchbar__btn' type='submit'>
            <div className='searchbar__btn__text'>Search</div>
          </button>
      </form>
    </div>
  );

}

export default SearchBar;