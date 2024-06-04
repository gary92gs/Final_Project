import React from 'react';
import SearchBar from './SearchBar';
import "../styles/TopNavBar.css";
import "../styles/SignUp.css";
import LogoBrickLight from './icons/LogoBrickLight';
import { Link } from 'react-router-dom';

function TopNavBar ({ setSearchResults}) {

return (
  <div className="top-nav-bar-span">
    <span className="top-nav-bar">
        <div className="top-nav-bar__logo" >
        <LogoBrickLight/>
        </div>
      
        <div>
          <SearchBar setSearchResults={setSearchResults} />
        </div>
        <div className="top-nav-bar__icons">
          <div><Link to='/' className='custom-link'>Home Page</Link></div>
          <div><Link to='/signup' className="custom-link"> Logout </Link> </div>
          <div><Link to='/signup' className="custom-link"> Signup </Link> </div>
          <div><Link to='/aboutus' className="custom-link"> About Us </Link> </div>
        </div>

    </span>
  </div>
);
}

export default TopNavBar;