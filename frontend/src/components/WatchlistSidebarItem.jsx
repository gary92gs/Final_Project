import '../styles/WatchlistSidebarItem.css'

const WatchlistSidebarItem = ({ favStock, currentItemId, setCurrentItemId, }) => {
  
const handleClick = (id) => {
    setCurrentItemId(id);
    console.log(id)
  }
  
  return (
    <div className="watchlist-sidebar-item" onClick={() => handleClick(favStock.id)}>
      <div className="watchlist-sidebar-item__name">{favStock.company_name}</div>
      <div className="watchlist-sidebar-item__sector">{favStock.industry_sector}</div>
    </div>
  )
}

export default WatchlistSidebarItem;