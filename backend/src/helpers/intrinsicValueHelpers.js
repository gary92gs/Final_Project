const Decimal = require('decimal.js');

// returns (i) term in FBV formula
const growthRateBV = (allAnalyisisData) => {

  const { historical_data } = allAnalyisisData;

  const numQuarters = historical_data.length;
  const numYears = new Decimal(numQuarters).dividedBy('4');

  const presentBV = historical_data[0].book_value;
  const pastBV = historical_data[numQuarters - 1].book_value;

  const iFBV = new Decimal(presentBV).minus(pastBV).div(pastBV).div(numYears);

  console.log('------------ growthRateBV ------------')
  console.log('numYears:', numYears);
  console.log('presentBV:', presentBV);
  console.log('pastBV:', pastBV);

  console.log('i = (presentBV - pastBV) / pastBV / numYears');
  console.log(`i = (${presentBV} - ${pastBV}) / ${pastBV} / ${numYears}`);

  console.log('iFBV:', iFBV);

  return iFBV;
};

// returns FBV Numerator in 2nd Term for Intrinsic Value Formula
const futureBV = (allAnalyisisData) => {

  const { historical_data } = allAnalyisisData;

  const presentBV = historical_data[0].book_value;
  const futureYears = '5'; // THIS VALUE WILL NEED TO BE ADJUSTED BY USER SETTINGS TO IMPROVE USER EXPERIENCE

  const iFBV = growthRateBV(allAnalyisisData); // returns a decimal
  const FBV = iFBV.plus('1').pow(futureYears).times(presentBV);

  console.log('------------ futureBV ------------')
  console.log('', );

  return FBV;

};

// calculates discount rate of return (i) for Intrinsic Value Formula
const discountRateForIV = (allAnalyisisData) => {
  const { current_data, risk_free_rate } = allAnalyisisData;

  const beta = current_data.investment_beta;
  const marketRiskPremium = '0.06';
  const riskFreeRate = new Decimal(risk_free_rate).dividedBy('100').toString();

  const iIV = new Decimal(beta).times(marketRiskPremium).plus(riskFreeRate);

  console.log('------------ growthRateBV ------------')
  

  return iIV;
};

// calculates discounted FBV (2nd term) for IV formula
const discountedFBVForIV = (allAnalyisisData) => {

  const iIV = discountRateForIV(allAnalyisisData); // receives decimal object
  const futureYears = '5'; //NEEDS TO BE ADJUSTABLE/SET BY USER FOR BETTER USER EXPERIENCE
  
  const FBV = futureBV(allAnalyisisData); // receives decimal object
  const denominator = iIV.plus('1').pow(futureYears).toString();
  
  const discountedFBV = FBV.dividedBy(denominator);

  return discountedFBV; 
};

// calculates discounted Future Value of Dividends for IV formula
const discountedDivForIV = (allAnalyisisData) => {

  const { current_data } = allAnalyisisData;

  const div = current_data.dividend_per_share;
  const futureYears = '5';
  const iIV = discountRateForIV(allAnalyisisData).toString();

  // (1 + i)^n
  const innerDenominator = new Decimal(iIV).plus('1').pow(futureYears).toString();
  // [1/(1+i^n)]
  const inner2ndTerm = new Decimal('1').div(innerDenominator).toString();
  //[ 1 - [1/(1+i^n)] ]
  const outerNumerator = new Decimal('1').minus(inner2ndTerm);

  const discountedDiv = outerNumerator.div(iIV).times(div);

  return discountedDiv;

};

const calculateStockIntrinsicValue = (allAnalyisisData) => {

  const discountedFBV = discountedFBVForIV(allAnalyisisData).toString();
  const discountedDiv = discountedDivForIV(allAnalyisisData);

  const IV = discountedDiv.plus(discountedFBV).toString()

  return IV;
  
};

module.exports = {
  calculateStockIntrinsicValue,
};