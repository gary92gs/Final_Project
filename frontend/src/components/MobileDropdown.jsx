import { useState } from "react";
import "../styles/MobileDropdown.css";

function MobileDropdown () {

return (

<div>
<div class="dropdown">
  <button class="dropbtn"><i class="fa-solid fa-bars fa-lg"></i></button>
  <div class="dropdown-content">
    <a href="#">Logout</a>
    <a href="#">About Us</a>
    <a href="#">Watchlist</a>
    <a href="#">Settings</a>
  </div>
</div>
  </div>

)

};

export default MobileDropdown;
