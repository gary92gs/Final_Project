import React, { useState } from 'react';
import "../styles/SearchBar.css";
import axios from 'axios';

function SearchBar() {

  const [searchValue, setSearchValue] = useState('');

  const updateSearchBarValue = (e) => {
    setSearchValue(e.target.value);
  };

  const submitStockSearch = async (e, searchValue) => {

    e.preventDefault();

    try {
      const searchResults = await axios.get('/api/search', { params: {searchTerm: searchValue} });
      console.log('searchResults:', searchResults.data);
    } catch (error) {
      console.log(`Error Fetching Data: ${error}`);
    }

  };

  return (
    <div className='searchbar'>
      <form onSubmit={(e) => submitStockSearch(e, searchValue)}>
        <input
          className='searchbar'
          type="text"
          id='search'
          value={searchValue}
          onChange={updateSearchBarValue}
        />
      </form>
      <button className='searchbar__btn' type='submit'>
        <div className='searchbar__btn__text'>Search</div>
      </button>
    </div>
  );

}

export default SearchBar;