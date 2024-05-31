DROP TABLE IF EXISTS current_data CASCADE;

CREATE TABLE current_data (
  id SERIAL PRIMARY KEY NOT NULL,
  stock_id INTEGER REFERENCES stocks(id) NOT NULL,
  current_price DECIMAL(14, 2) NOT NULL,
  eps DECIMAL(6, 2) NOT NULL,
  pe_ratio DECIMAL(6, 2) NOT NULL,
  dividend_per_share DECIMAL(10, 6) NOT NULL,
  dividend_yield DECIMAL(6, 2) NOT NULL,
  investment_beta DECIMAL(6, 2) NOT NULL
);