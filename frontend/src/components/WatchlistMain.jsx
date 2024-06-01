import WatchlistMainItem from './WatchlistMainItem';

const WatchlistMain = ({ favStocks }) => {

return (
  <ul className="watch-list-main" >
    {favStocks.map((favStock) => (
      <WatchlistMainItem
      key={favStock.id}
      favStock={favStock}
      />
    ))}
  </ul>
);
}

export default WatchlistMain;