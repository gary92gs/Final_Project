import { useState } from "react";
import '../styles/SearchBar.css'

function MobileSearchBar () {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="search-container">
      <form action="/search" method="get">
      <input className="search expandright" id="searchright" type="search" name="q" placeholder="Search"/>
      <label className="searchbutton" for="searchright">
        <span className="mglass"><i class="fa-solid fa-magnifying-glass fa-lg"></i></span>
      </label>
    </form>
  </div>
  );
};

export default MobileSearchBar;
