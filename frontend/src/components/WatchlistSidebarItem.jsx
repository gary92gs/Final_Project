import '../styles/WatchlistSidebarItem.css'

const WatchlistSidebarItem = ({ 
  favStock, 
  currentItemId, 
  setCurrentItemId, 
}) => {

// Function to handle click event on sidebar item
const handleClick = (id) => {
    setCurrentItemId(id); // Set the current item ID when clicked
    console.log('inside WatchlistSidebarItem id:', id)
  }
  
  return (
    <div className="watchlist-sidebar-item" onClick={() => handleClick(favStock.id)}>
      <div className="watchlist-sidebar-item__name">{favStock.company_name}</div>
      <div className="watchlist-sidebar-item__sector">{favStock.industry_sector}</div>
    </div>
  )
}

export default WatchlistSidebarItem;