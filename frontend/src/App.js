import React from 'react';
import SignUp from './components/SignUp';
import TopNavBar from './components/TopNavBar';
import Login from './components/Login'
import HomePage from './components/HomePage';
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
]


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path="/" element={
          <div className="App">
            <TopNavBar />
            <HomePage favStocks={favStocks}/>
            {/* Add other components you want in the home page layout here */}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
