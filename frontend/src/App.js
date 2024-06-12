import React, { useState,} from 'react';
import SignUp from './components/SignUp';
import TopNavBar from './components/TopNavBar';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SelectedStock from './components/SelectedStock';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AboutUs from './components/AboutUs';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null); // FOR SETTING SELECTED STOCK ONLY WORKING FOR WATCHLISTMAINITEM CURRENTLY
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [favStocks, setFavStocks] = useState([]);

  function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  console.log("App lvl currentitemid", currentItemId)
  const navigate = useNavigate();

 // function to set state to true after sign up
  const handleRegister = () => {
    setIsLoggedIn(true);
    navigate('/');
  };
// function to set state to true after login
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };
// function to set state to false when logout is clicked
  const handleLogout = () => {
    setIsLoggedIn(false);
    fetch('/api/sessions', {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(() => {
    })
    .catch(error => console.error('Error during logout:', error));
  };

  return (
      <Routes>
        <Route path="/signup" element={<SignUp onRegister={handleRegister}/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path='/aboutus' element={<AboutUs isMobile={isMobile} />} />
        <Route path='/selectedstock' element={<SelectedStock />} />
        {isLoggedIn ? (
          <Route path="/" element={
            <div className="App">
              <TopNavBar
                setSearchResults={setSearchResults}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                currentItemId={currentItemId}
                setCurrentItemId={setCurrentItemId}
                isMobile={isMobile}
                /* Pass function to component */
                onLogout={handleLogout}
              />
              <HomePage
                searchResults={searchResults}
                currentItemId={currentItemId}
                setCurrentItemId={setCurrentItemId}
                isMobile={isMobile}
                setStockData={setStockData}
                stockData={stockData}
                favStocks={favStocks}
                setFavStocks={setFavStocks}
              />
              {/* Add other components you want in the home page layout here */}
            </div>
          } />
        ) : (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
  );
}

export default App;
