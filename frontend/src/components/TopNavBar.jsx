import React, {useState} from 'react';
import SearchBar from './SearchBar';
import "../styles/TopNavBar.css";
import "../styles/SignUp.css";
import LogoBrickLight from './icons/LogoBrickLight';
function TopNavBar() {

return (
  <div className="top-nav-bar-span">
    <span className="top-nav-bar">
        <div className="top-nav-bar__logo" >
        <LogoBrickLight/>
        </div>
      
        <div>
          <SearchBar/>
        </div>
        <div className="top-nav-bar__icons">
          <div> Login </div>
          <div> Logout </div>
          <div> About Us </div>
        </div>

    </span>
  </div>
);
}

export default TopNavBar;