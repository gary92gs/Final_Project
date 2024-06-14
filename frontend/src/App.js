import React, { useState, useEffect } from "react";
import SignUp from "./components/SignUp";
import TopNavBar from "./components/TopNavBar";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import SelectedStock from "./components/SelectedStock";
import { Route, Routes, useNavigate } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import axios from "axios";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentItemId, setCurrentItemId] = useState(null); // FOR SETTING SELECTED STOCK ONLY WORKING FOR WATCHLISTMAINITEM CURRENTLY
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [favStocks, setFavStocks] = useState([]);
  const [trendingStocks, setTrendingStocks] = useState([]);

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  console.log("App lvl currentitemid", currentItemId);
  const navigate = useNavigate();

  // function to set state to true after sign up
  const handleRegister = () => {
    setIsLoggedIn(true);
    navigate("/");
  };
  // function to set state to true after login
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };
  // function to set state to false when logout is clicked
  const handleLogout = () => {
    setIsLoggedIn(false);
    fetch("/api/sessions", {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => { })
      .catch((error) => console.error("Error during logout:", error));
  };

  // Bring in fetchFavData up to App level
  const fetchFavData = async () => {
    try {
      // Send a GET request to retrieve favorite stocks data from the server
      const response = await axios.get("/api/favourites");
      // Update the favorite stocks state with the fetched data, or set it to an empty array if no data is returned
      setFavStocks(response.data.userFavourites || []);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  // bring in trending stocks to app level
  const fetchTrendingStocks = async () => {
    try {
      const response = await axios.get("/api/favourites/trending");
      setTrendingStocks(response.data.trendingStocks || []);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  // If the user is logged in, fetch their favorite stocks data and top trending stocks
  useEffect(() => {
    if (isLoggedIn) {
      fetchFavData();
      fetchTrendingStocks();
    }
  }, [isLoggedIn]);

  // gets data for current selected stock
  const fetchSelectedStockData = async (tickerSymbol) => {
    //fetch's data
    try {
      const response = await axios.get("/api/dashboard-analysis", {
        params: tickerSymbol,
      });
      setCurrentItemId(response.data.allAnalysisData.current_data.stock_id);
      setStockData(response.data.allAnalysisData);
      console.log("Stock Data", response.data.allAnalysisData);
      console.log(
        "Current Item Id",
        response.data.allAnalysisData.current_data.stock_id
      );
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  return (
    <Routes>
      <Route path="/signup" element={<SignUp onRegister={handleRegister} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/aboutus" element={<AboutUs isMobile={isMobile} setCurrentItemId={setCurrentItemId} setSearchResults={setSearchResults} />} />
      <Route path="/selectedstock" element={<SelectedStock />} />
      {isLoggedIn ? (
        <Route
          path="/"
          element={
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
                fetchFavData={fetchFavData}
                fetchSelectedStockData={fetchSelectedStockData}
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
                fetchFavData={fetchFavData}
                fetchSelectedStockData={fetchSelectedStockData}
                trendingStocks={trendingStocks}
              />
              {/* Add other components you want in the home page layout here */}
            </div>
          }
        />
      ) : (
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      )}
    </Routes>
  );
}

export default App;
