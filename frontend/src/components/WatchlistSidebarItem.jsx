import '../styles/WatchlistSidebarItem.css'

const WatchlistSidebarItem = ({ favStock }) => {
  return (
    <div className="watchlist-sidebar-item">
      <div className="watchlist-sidebar-item__name">{favStock.company_name}</div>
      <div className="watchlist-sidebar-item__sector">{favStock.industry_sector}</div>
    </div>
  )
}

export default WatchlistSidebarItem;