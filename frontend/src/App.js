import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import TopNavBar from './components/TopNavBar';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SelectedStock from './components/SelectedStock';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';

const favStocks = [
  {
    id: 1,
    company_name: 'Samsung',
    industry_sector: 'Digital Technologies'
  },
  {
    id: 2,
    company_name: 'Sketchers',
    industry_sector: 'Apparel'
  },
  {
    id: 3,
    company_name: 'Bitcoin',
    industry_sector: 'Finance'
  },
  {
    id: 4,
    company_name: 'Litecoin',
    industry_sector: 'Finance'
  },
  {
    id: 5,
    company_name: 'Apple',
    industry_sector: 'Technology'
  },
  {
    id: 6,
    company_name: 'Google',
    industry_sector: 'Technology'
  }
];

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null); // FOR SETTING SELECTED STOCK ONLY WORKING FOR WATCHLISTMAINITEM CURRENTLY
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/sessions/check')
      .then(response => response.json())
      .then(data => setIsLoggedIn(data.isLoggedIn))
      .catch(error => console.error('Error:', error));
  }, []);

  function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }
 // function to set state to true after sign up
  const handleRegister = () => {
    setIsLoggedIn(true);
  };
// function to set state to true after login
  const handleLogin = () => {
    setIsLoggedIn(true);
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
    <Router>
      <Routes>
        {/* Pass function to component */}
        <Route path="/signup" element={<SignUp onRegister={handleRegister}/>} />
        {/* Pass function to component */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path='/aboutus' element={<AboutUs />} />
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
                favStocks={favStocks}
                searchResults={searchResults}
                currentItemId={currentItemId}
                setCurrentItemId={setCurrentItemId}
                isMobile={isMobile}
              />
              {/* Add other components you want in the home page layout here */}
            </div>
          } />
        ) : (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
