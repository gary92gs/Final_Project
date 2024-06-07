const getQuarterFromDateObject = (dateObject) => {
  return Math.floor((dateObject.getMonth() + 3) / 3);
};

const removeEntriesUntilAfterGivenDate = (minDate, dataEntries) => {

  let currentEntryDate;

  do {

    if (dataEntries.quarterlyReports) {
      dataEntries.quarterlyReports.shift();
      currentEntryDate = new Date(dataEntries.quarterlyReports[0].fiscalDateEnding);
    } else if (dataEntries.quarterlyEarnings) {
      dataEntries.quarterlyEarnings.shift();
      currentEntryDate = new Date(dataEntries.quarterlyEarnings[0].fiscalDateEnding);
    }

  } while (
    currentEntryDate.getFullYear() >= minDate.getFullYear() &&
    getQuarterFromDateObject(currentEntryDate) > getQuarterFromDateObject(minDate)
  );

  return;

};


const confirmHistoricalDataAlignment = (BALANCE_SHEET, CASH_FLOW, EARNINGS) => {

  let balanceSheetDate = new Date(BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding);
  let cashFlowDate = new Date(CASH_FLOW.quarterlyReports[0].fiscalDateEnding);
  let earningsDate = new Date(EARNINGS.quarterlyEarnings[0].fiscalDateEnding);

  // do not set min date based on earnings date, or useful data could be thrown away
  let minDate = balanceSheetDate < cashFlowDate ? balanceSheetDate : cashFlowDate;

  if (
    balanceSheetDate.getFullYear() >= minDate.getFullYear() &&
    getQuarterFromDateObject(balanceSheetDate) > getQuarterFromDateObject(minDate)
  ) {

    console.log(`Wrong Date! Target: ${minDate}`);
    console.log('BALANCE_SHEET BEFORE:', balanceSheetDate.toDateString());
    removeEntriesUntilAfterGivenDate(minDate, BALANCE_SHEET);
    balanceSheetDate = new Date(BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding);
    console.log('BALANCE_SHEET AFTER:', balanceSheetDate.toDateString());
  } 
  
  if (
    cashFlowDate.getFullYear() >= minDate.getFullYear() &&
    getQuarterFromDateObject(cashFlowDate) > getQuarterFromDateObject(minDate)
  ) {

    console.log(`Wrong Date! Target: ${minDate}`);
    console.log('CASH_FLOW BEFORE:', cashFlowDate.toDateString());
    removeEntriesUntilAfterGivenDate(minDate, CASH_FLOW);
    cashFlowDate = new Date(CASH_FLOW.quarterlyReports[0].fiscalDateEnding);
    console.log('CASH_FLOW AFTER:', cashFlowDate.toDateString());
  } 
  
  if (
    earningsDate.getFullYear() >= minDate.getFullYear() &&
    getQuarterFromDateObject(earningsDate) > getQuarterFromDateObject(minDate)
  ) {

    console.log(`Wrong Date! Target: ${minDate}`);
    console.log('EARNINGS BEFORE:', earningsDate.toDateString());
    removeEntriesUntilAfterGivenDate(minDate, EARNINGS);
    earningsDate = new Date(EARNINGS.quarterlyEarnings[0].fiscalDateEnding);
    console.log('CASH_FLOW AFTER:', cashFlowDate.toDateString());

  }

  console.log('BALANCE_SHEET & CASH_FLOW YEARS & QUARTERS SHOULD MATCH!!');

  console.log(`BALANCE_SHEET: ${balanceSheetDate.getFullYear()} - Q${getQuarterFromDateObject(balanceSheetDate)}`);
  console.log(`CASH_FLOW: ${cashFlowDate.getFullYear()} - Q${getQuarterFromDateObject(cashFlowDate)}`);
  console.log(`EARNINGS: ${earningsDate.getFullYear()} - Q${getQuarterFromDateObject(earningsDate)}`);

  return {
    balanceSheetDate,
    cashFlowDate,
    earningsDate,
    minDate,
  };

};

const removeExtraMonthlyEntries = (minDate, timeSeriesDateKeys) => {
  console.log('Removing Extra Dates From timeSeriesDateKeys');

  while (
    minDate.getFullYear() <= timeSeriesDateKeys[0].getFullYear() &&
    getQuarterFromDateObject(minDate) < getQuarterFromDateObject(timeSeriesDateKeys[0])
  ) {
    console.log('minDate date-quarter', minDate.toDateString(), getQuarterFromDateObject(minDate));
    console.log('timeSeriesDateKeys date-quarter', timeSeriesDateKeys[0].toDateString(), getQuarterFromDateObject(timeSeriesDateKeys[0]));

    console.log('timeSeriesDateKeys Length', timeSeriesDateKeys.length);
    timeSeriesDateKeys.shift();
  }
  console.log('Finished Removing Dates from timeSeriesDateKeys');
  console.log(`Balance Sheet Date vs Time Series Date Key: ${minDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' })} = ${timeSeriesDateKeys[0].toLocaleDateString('en-US', { year: 'numeric', month: 'numeric' })}`);
};



module.exports = {
  getQuarterFromDateObject,
  confirmHistoricalDataAlignment,
  removeExtraMonthlyEntries,
};