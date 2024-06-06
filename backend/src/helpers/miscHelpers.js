
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
  console.log('Removing Extra Dates From timeSeriesDateKeys');
  while (BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding.slice(0, -3) !== timeSeriesDateKeys[0].slice(0, -3)) {
    timeSeriesDateKeys.shift();
  }
  console.log('Finished Removing Dates from timeSeriesDateKeys');
  console.log(`Balance Sheet Date vs Time Series Date Key: ${BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding.slice(0, -3)} = ${timeSeriesDateKeys[0].slice(0, -3)}`);
};

const confirmHistoricalDataAlignment = (BALANCE_SHEET, CASH_FLOW, EARNINGS) => {
  
  const balanceSheetDate = new Date(BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding);
  const cashFlowDate = new Date(CASH_FLOW.quarterlyReports[0].fiscalDateEnding);
  const earningsDate = new Date(EARNINGS.quarterlyEarnings[0].fiscalDateEnding);
  
  if (
    balanceSheetDate.toDateString() !== cashFlowDate.toDateString() || 
    balanceSheetDate.toDateString() !== earningsDate.toDateString()
  ) {
    console.log('DATES DO NOT MATCH!!');
    console.log('BALANCE_SHEET:', balanceSheetDate.toDateString());
    console.log('CASH_FLOW:', cashFlowDate.toDateString());
    console.log('EARNINGS:', earningsDate.toDateString());

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