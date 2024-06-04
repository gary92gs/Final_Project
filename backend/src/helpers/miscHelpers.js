
const removeEntriesUntilAfterGivenDate = (minDate, dataEntries) => {
  
  let currentEntryDate;
  do {
    if (dataEntries.quarterlyReports){
      dataEntries.quarterlyReports.shift()
      currentEntryDate = new Date(dataEntries.quarterlyReports[0].fiscalDateEnding);
    } else if (dataEntries.quarterlyEarnings){
      dataEntries.quarterlyEarnings.shift()
      currentEntryDate = new Date(dataEntries.quarterlyEarnings[0].fiscalDateEnding);
    }
  } while (minDate < currentEntryDate);
  
  return;
};

const removeExtraMonthlyEntries = (BALANCE_SHEET, timeSeriesDateKeys) => {

  while (BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding.slice(0, -3) !== timeSeriesDateKeys[0].slice(0, -3)) {
    console.log('inside 2nd while loop');
    console.log('BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding', BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding.slice(0, -3));
    console.log('TIME_SERIES_MONTHLSY["Monthly Time Series"][0]', timeSeriesDateKeys[0].slice(0, -3));
    timeSeriesDateKeys.shift();
  }

};

const confirmHistoricalDataAlignment = (balanceSheetDate, cashFlowDate, earningsDate, BALANCE_SHEET, CASH_FLOW, EARNINGS) => {
  if (
    balanceSheetDate.toDateString() !== cashFlowDate.toDateString() || 
    balanceSheetDate.toDateString() !== earningsDate.toDateString()
  ) {
    console.log('DATES DO NOT MATCH!!');
    console.log('BALANCE_SHEET:', BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding);
    console.log('CASH_FLOW:', CASH_FLOW.quarterlyReports[0].fiscalDateEnding);
    console.log('EARNINGS:', EARNINGS.quarterlyEarnings[0].fiscalDateEnding);

    // find min date
    let minDate = balanceSheetDate;
    if (cashFlowDate < minDate) {
      minDate = cashFlowDate;
    }
    if (earningsDate < minDate) {
      minDate = earningsDate;
    }

    // delete elements with dates > than smallest date
    if (balanceSheetDate > minDate) {
      removeEntriesUntilAfterGivenDate(minDate, BALANCE_SHEET);
    }
    if (cashFlowDate > minDate) {
      removeEntriesUntilAfterGivenDate(minDate, CASH_FLOW);
    }
    if (earningsDate > minDate) {
      removeEntriesUntilAfterGivenDate(minDate, EARNINGS);
    }

    console.log('DATES SHOULD MATCH!!');
    console.log('BALANCE_SHEET:', BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding);
    console.log('CASH_FLOW:', CASH_FLOW.quarterlyReports[0].fiscalDateEnding);
    console.log('EARNINGS:', EARNINGS.quarterlyEarnings[0].fiscalDateEnding);

  }
};

module.exports = {
  confirmHistoricalDataAlignment,
  removeExtraMonthlyEntries,
};