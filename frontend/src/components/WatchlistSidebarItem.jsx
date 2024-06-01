

const WatchlistSidebarItem = ({ favStock }) => {
  return (
    <div>
      <div>{favStock.company_name}</div>
      <div>{favStock.industry_sector}</div>
    </div>
  )
}

export default WatchlistSidebarItem;