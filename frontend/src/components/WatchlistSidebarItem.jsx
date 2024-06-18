import '../styles/WatchlistSidebarItem.css'

const WatchlistSidebarItem = ({ 
  favStock, 
  fetchSelectedStockData
}) => {

let tickerSymbol = { tickerSymbol: favStock.ticker_symbol}
  return (
    <div className="watchlist-sidebar-item" onClick={() => fetchSelectedStockData(tickerSymbol)}>
      <div className="watchlist-sidebar-item__name">{favStock.company_name}</div>
      <div className="watchlist-sidebar-item__sector">{favStock.industry_sector}</div>
    </div>
  )
}

export default WatchlistSidebarItem;