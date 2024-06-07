--sample insert statement:
-- INSERT INTO historical_data (
--     stock_id, report_date, net_income, outstanding_shares, shareholders_equity, total_dividend_payout, reported_eps, 
--     m1_high, m1_low, m1_open, m1_close, m2_high, m2_low, m2_open, m2_close, m3_high, m3_low, m3_open, m3_close
-- ) VALUES (
--     1, '2024-05-30', 500000000, 1000000, 2000000000, 250000, 5.00,
--     147.7275, 139.7600, 144.2500, 146.8300, 155.0000, 145.0000, 150.0000, 152.5000, 165.0000, 158.0000, 160.0000, 161.5000
-- );
-- ** DO NOT INSERT 'quarterly_price_median', 'book_value', OR 'quarterly_dividend' !!!

DROP TABLE IF EXISTS historical_data CASCADE;

CREATE TABLE historical_data (
  id SERIAL PRIMARY KEY NOT NULL,
  stock_id INTEGER REFERENCES stocks(id) NOT NULL,
  report_year INTEGER NOT NULL CHECK (report_year >= 1900 AND report_year <= 2500),
  report_quarter INTEGER NOT NULL CHECK (report_quarter >= 1 AND report_quarter <= 4),
  quarterly_price_median DECIMAL(14, 6),
  book_value DECIMAL(14, 6),
  net_income BIGINT NOT NULL,
  outstanding_shares BIGINT NOT NULL,
  shareholders_equity BIGINT NOT NULL,
  quarterly_dividend DECIMAL(10, 6),
  total_dividend_payout BIGINT NOT NULL,
  reported_eps DECIMAL(6, 2),
  m1 DATE NOT NULL,
  m1_high DECIMAL(10,4) NOT NULL,
  m1_low DECIMAL(10,4) NOT NULL,
  m1_open DECIMAL(10,4) NOT NULL,
  m1_close DECIMAL(10,4) NOT NULL,
  m2 DATE NOT NULL,
  m2_high DECIMAL(10,4) NOT NULL,
  m2_low DECIMAL(10,4) NOT NULL,
  m2_open DECIMAL(10,4) NOT NULL,
  m2_close DECIMAL(10,4) NOT NULL,
  m3 DATE NOT NULL,
  m3_high DECIMAL(10,4) NOT NULL,
  m3_low DECIMAL(10,4) NOT NULL,
  m3_open DECIMAL(10,4) NOT NULL,
  m3_close DECIMAL(10,4) NOT NULL 
);


-- CALCULATES BOOK VALUE FOR EVERY NEW ROW/DATAPOINT INSERTED
-- function definition to calculate book_value
CREATE OR REPLACE FUNCTION calculate_book_value()
RETURNS TRIGGER AS $$
BEGIN
  NEW.book_value := NEW.shareholders_equity / NULLIF(NEW.outstanding_shares, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for book_value calculation
CREATE TRIGGER set_book_value
BEFORE INSERT OR UPDATE ON historical_data
FOR EACH ROW
EXECUTE PROCEDURE calculate_book_value();


-- CALCULATES QUARTERLY PRICE MEDIAN FOR EVERY NEW ROW/DATAPOINT INSERTED
-- Function to calculate quarterly_price_median
CREATE OR REPLACE FUNCTION calculate_quarterly_price_median()
RETURNS TRIGGER AS $$
-- Declare variables used for collecting values 
DECLARE
  prices NUMERIC[];
  median NUMERIC;
BEGIN
  -- Collect all 12 price values into an array
  prices := array[
    NEW.m1_high, NEW.m1_low, NEW.m1_open, NEW.m1_close,
    NEW.m2_high, NEW.m2_low, NEW.m2_open, NEW.m2_close,
    NEW.m3_high, NEW.m3_low, NEW.m3_open, NEW.m3_close
  ];
  -- Sort the array
  prices := (SELECT ARRAY(SELECT UNNEST(prices) ORDER BY 1));
  -- Calculate the median: for 12 values, it is the average of the 6th and 7th values
  median := (prices[6] + prices[7]) / 2;
  -- Set the calculated median to the quarterly_price_median column
  NEW.quarterly_price_median := median;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger for quarterly_price_median calculation
CREATE TRIGGER set_quarterly_price_median
BEFORE INSERT OR UPDATE ON historical_data
FOR EACH ROW
EXECUTE PROCEDURE calculate_quarterly_price_median();


-- CALCULATES QUARTERLY DIVIDEND FOR EVERY NEW ROW/DATAPOINT INSERTED
-- Function to calculate quarterly_dividend
CREATE OR REPLACE FUNCTION calculate_quarterly_dividend()
RETURNS TRIGGER AS $$
BEGIN
    NEW.quarterly_dividend := NEW.total_dividend_payout / NULLIF(NEW.outstanding_shares, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for quarterly_dividend calculation
CREATE TRIGGER set_quarterly_dividend
BEFORE INSERT OR UPDATE ON historical_data
FOR EACH ROW
EXECUTE PROCEDURE calculate_quarterly_dividend();