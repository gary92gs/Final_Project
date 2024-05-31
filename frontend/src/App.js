import React from 'react';
import SignUp from './components/SignUp';
import TopNavBar from './components/TopNavBar';
import Login from './components/Login'
import "./styles/global.css"
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <div className="App">
            <TopNavBar />
            {/* <Home /> */}
            {/* Add other components you want in the home page layout here */}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
