import WatchlistSidebarItem from './WatchlistSidebarItem';
import '../styles/WatchlistSidebar.css'
const WatchListSidebar = ({ favStocks, setCurrentItemId, currentItemId }) => {

return (
  <div className="watchlist-sidebar">
    <h1>Your Watchlist</h1>
    <ul>
      {favStocks.map((favStock) => (
        <WatchlistSidebarItem
        key={favStock.id}
        favStock={favStock}
        setCurrentItemId={setCurrentItemId}
        />
    ))}
    </ul>
  </div>
);
}

export default WatchListSidebar;