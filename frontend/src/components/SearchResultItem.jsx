const SearchResultItem = ({symbol, name, id}) => {

  return (
    <div className='search-result-item'>
      <span className='search-result-symbol'>{symbol}</span> - <span className='search-result-name'>{name}</span>
    </div>
  )
  
}

export default SearchResultItem;