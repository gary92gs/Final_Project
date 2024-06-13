const Decimal = require('decimal.js')

const formatAllAnalyisData = (allAnalyisisData) => {
  
  const {
    current_stock_price, 
    iv_to_price_ratio,
    current_data,
  } = allAnalyisisData;

  allAnalyisisData.current_stock_price = new Decimal(current_stock_price).toFixed(2).toString();
  allAnalyisisData.iv_to_price_ratio = new Decimal(iv_to_price_ratio).toFixed(2).toString();
  allAnalyisisData.current_data.dividend_yield = new Decimal(current_data.dividend_yield).times('100').toFixed(2).toString();

};

module.exports = {
  formatAllAnalyisData,
}