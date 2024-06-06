import { useState } from "react";

function MobileSearchBar () {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

return (
    <div className="app">
      <div className={`search-bar ${isOpen ? 'open' : ''}`}>
        <input type="text" className="search-input" placeholder="Search..." />
        <button className="search-icon" onClick={toggleSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
)

};

export default MobileSearchBar;
