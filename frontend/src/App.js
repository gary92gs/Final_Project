import React from 'react';
import SignUp from './components/SignUp';
import TopNavBar from './components/TopNavBar';
import "./styles/global.css"

function App() {

  return (
    <div className="App">
      <TopNavBar/>
      <SignUp/>
    </div>
  );
}

export default App;
