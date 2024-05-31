import React from 'react';
import SignUp from './components/SignUp';
import TopNavBar from './components/TopNavBar';
import "./styles/global.css"

import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <TopNavBar/>
      <SignUp/>
      <Login />
    </div>
  );
}

export default App;
