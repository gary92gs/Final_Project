const Decimal = require('decimal.js');

// returns (i) term in FBV formula
const growthRateBV = (allAnalyisisData) => {

  const { historical_data } = allAnalyisisData;

  const numQuarters = historical_data.length;
  const numYears = new Decimal(numQuarters).dividedBy('4');

  const presentBV = historical_data[0].book_value;
  const pastBV = historical_data[numQuarters - 1].book_value;

  const iFBV = new Decimal(presentBV).minus(pastBV).div(pastBV).div(numYears);

  console.log('------------ growthRateBV (i) ------------')
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

  console.log('------------ futureBV (FBV) ------------')
  console.log('presentBV:', presentBV);
  console.log('futureYears:', futureYears);
  console.log('iFBV:', iFBV);

  console.log('(i + 1)^n x BV');
  console.log(`(${iFBV} + 1)^${futureYears} x ${presentBV}`)

  console.log('FBV:', FBV);

  return FBV;

};

// calculates discount rate of return (i) for Intrinsic Value Formula
const discountRateForIV = (allAnalyisisData) => {
  const { current_data, risk_free_rate } = allAnalyisisData;

  const beta = current_data.investment_beta;
  const marketRiskPremium = '0.05';
  const riskFreeRate = new Decimal(risk_free_rate).dividedBy('100');

  const secondTerm = new Decimal(beta).times(marketRiskPremium).toString();

  const iIV = riskFreeRate.minus(secondTerm);

  console.log('------------ discountRateForIV (i) [👍] ------------')
  console.log('beta:', beta);
  console.log('marketRiskPremium:', marketRiskPremium);
  console.log('riskFreeRate:', riskFreeRate);

  console.log('riskFreeRate - (beta x marketRiskPremium)');
  console.log(`${riskFreeRate} - (${beta} x ${marketRiskPremium})`)
  
  console.log('iIV:', iIV);

  return iIV;
};

// calculates discounted FBV (2nd term) for IV formula
const discountedFBVForIV = (allAnalyisisData) => {

  const iIV = discountRateForIV(allAnalyisisData); // receives decimal object
  const futureYears = '5'; //NEEDS TO BE ADJUSTABLE/SET BY USER FOR BETTER USER EXPERIENCE
  
  const FBV = futureBV(allAnalyisisData); // receives decimal object
  const denominator = iIV.plus('1').pow(futureYears).toString();

  const discountedFBV = FBV.dividedBy(denominator);

  console.log('------------ discountFBVforIV (FBV/(1 + i)^n) ------------')
  console.log('FBV:', FBV);
  console.log('iIV:', iIV);

  console.log('FBV / (iIV + 1)^futureYears');
  console.log(`${FBV} / (${iIV} + 1)^${futureYears}`)
  
  console.log('discountedFBV:', discountedFBV);

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

  console.log('------------ discountDivforIV ( Div x [ 1 - [1/(1+i^n)] ] / i ) ------------')
  console.log('div:', div);
  console.log('futureYears:', futureYears);
  console.log('iIV:', iIV);

  console.log('innerDenominator (i + 1)^n:', innerDenominator);
  console.log('inner2ndTerm [1/(1+i^n)]:', inner2ndTerm);
  console.log('outerNumerator [ 1 - [1/(1+i^n)] ]:', outerNumerator);

  console.log('outerNumerator / iIV x div')
  console.log(`${outerNumerator} / ${iIV} x ${div}`)
  console.log('discountedDiv:', discountedDiv);

  return discountedDiv;

};

const calculateStockIntrinsicValue = (allAnalyisisData) => {

  const discountedFBV = discountedFBVForIV(allAnalyisisData).toString();
  const discountedDiv = discountedDivForIV(allAnalyisisData);

  const IV = discountedDiv.plus(discountedFBV).toFixed(2).toString()

  console.log('------------ intrinsic value ------------')
  console.log('discountedDiv:', discountedDiv);
  console.log('discountedFBV:', discountedFBV);

  console.log(`discountedDiv + discountedFBV`)
  console.log(`${discountedDiv} + ${discountedFBV}`)

  console.log('IV:', IV);
  

  return IV;
  
};

module.exports = {
  calculateStockIntrinsicValue,
};