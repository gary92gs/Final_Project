import React, {useState} from 'react';
import "../styles/SearchBar.css";

function SearchBar() {

    return (
        <div className='searchbar'>
            <form>
                <input className='searchbar' type="text" id='search'/>
            </form>
            <button className='searchbar__btn' type='submit'>
                <div className='searchbar__btn__text'>Search</div>
            </button>
        </div>
    );

}

export default SearchBar;