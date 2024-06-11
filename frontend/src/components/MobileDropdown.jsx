import { useState } from "react";
import "../styles/MobileDropdown.css";
import { Link } from 'react-router-dom';

function MobileDropdown ({ setCurrentItemId }) {

  const handleClick = () => {
    setCurrentItemId(null);
  }

return (
<div>
<div class="dropdown">
  <button class="dropbtn"><i class="fa-solid fa-bars fa-lg"></i></button>
  <div class="dropdown-content">
  <div><Link to='/signup' className="custom-link"> Logout </Link> </div>
  <div><Link to='/aboutus' className="custom-link"> About Us </Link> </div>
  <div><Link to='/' className="custom-link" onClick={handleClick}> Watchlist </Link> </div>
    <a href="#">Settings</a>
  </div>
</div>
  </div>

)

};

export default MobileDropdown;
