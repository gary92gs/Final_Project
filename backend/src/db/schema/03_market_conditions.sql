DROP TABLE IF EXISTS market_conditions CASCADE;

CREATE TABLE market_conditions (
  id SERIAL PRIMARY KEY NOT NULL,
  country TEXT NOT NULL,
  risk_free_rate DECIMAL(6, 2) NOT NULL,
  expected_market_return DECIMAL(6, 2) DEFAULT NULL
);