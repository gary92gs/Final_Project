import React, {useState} from 'react';
import SignUp from './components/SignUp';
import TopNavBar from './components/TopNavBar';
import Login from './components/Login'
import HomePage from './components/HomePage';
import SelectedStock from './components/SelectedStock'
import "./styles/global.css"
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
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
  const [currentItemId, setCurrentItemId] = useState(null); //FOR SETTING SELECTED STOCK ONLY WORKING FOR WATCHLISTMAINITEM CURRENTLY
 

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/selectedstock' element={<SelectedStock />} />
        <Route path="/" element={
          <div className="App">
            <TopNavBar setSearchResults={setSearchResults} searchValue={searchValue} setSearchValue={setSearchValue} />
            <HomePage favStocks={favStocks} searchResults={searchResults} currentItemId={currentItemId} setCurrentItemId={setCurrentItemId} />
            {/* Add other components you want in the home page layout here */}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
