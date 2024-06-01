import WatchlistSidebarItem from './WatchlistSidebarItem';

const WatchListSidebar = ({ favStocks }) => {

return (
  <ul className="watch-list-sidebar" >
    {favStocks.map((favStock) => (
      <WatchlistSidebarItem
      key={favStock.id}
      favStock={favStock}
      />
    ))}
  </ul>
);
}

export default WatchListSidebar;