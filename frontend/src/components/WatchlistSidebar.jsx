import WatchlistSidebarItem from './WatchlistSidebarItem';
import '../styles/WatchlistSidebar.css'
const WatchListSidebar = ({ favStocks }) => {

return (
  <div className="watchlist-sidebar">
    <h1>Your Watchlist</h1>
    <ul>
      {favStocks.map((favStock) => (
        <WatchlistSidebarItem
        key={favStock.id}
        favStock={favStock}
        />
    ))}
    </ul>
  </div>
);
}

export default WatchListSidebar;