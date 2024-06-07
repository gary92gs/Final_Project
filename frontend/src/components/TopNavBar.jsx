import React from 'react';
import SearchBar from './SearchBar';
import "../styles/TopNavBar.css";
import "../styles/SignUp.css";
import LogoBrickLight from './icons/LogoBrickLight';
import { Link } from 'react-router-dom';
import MobileDropdown from './MobileDropdown'
import MobileSearchBar from './MobileSearchBar'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function TopNavBar ({ setSearchResults, searchValue, setSearchValue, currentItemId, setCurrentItemId, isMobile}) {

const handleClick = () => {
  setCurrentItemId(null);
  setSearchResults([]);
}

const navigate = useNavigate(); //Redirects

const handleLogout = async () => {
  try {
    await axios.delete('/api/sessions');
    // Optionally, clear any client-side cookies if needed
    // deleteAllCookies(); 
    navigate('/login');
  } catch (error) {
    console.error('Logout error:');
  }
};

if (isMobile()){

return (
  <div className="top-nav-bar-span">
    <span className="top-nav-bar">

        <div className='dropdown-container'>
          <MobileDropdown/>
        </div>
      
        <div className="top-nav-bar__logo" onClick={handleClick}>
        <Link to='/' className='custom-link'><LogoBrickLight/></Link>
        </div>
      
        <div>
          <MobileSearchBar setSearchResults={setSearchResults} searchValue={searchValue} setSearchValue={setSearchValue} setCurrentItemId={setCurrentItemId} />
        </div>


    </span>
  </div>
);
} else {
  return (
    <div className="top-nav-bar-span">
      <span className="top-nav-bar">
        
          <div className="top-nav-bar__logo" onClick={handleClick}>
          
          <Link to='/' className='custom-link'><LogoBrickLight/></Link>
          </div>
        
          <div>
            <SearchBar setSearchResults={setSearchResults} searchValue={searchValue} setSearchValue={setSearchValue} setCurrentItemId={setCurrentItemId} />
          </div>
          <div className="top-nav-bar__icons">
            <div onClick={handleLogout} > Logout </div>
            <div><Link to='/aboutus' className="custom-link"> About Us </Link> </div>
          </div>
  
      </span>
    </div>
  );
}
}

export default TopNavBar;