DROP TABLE IF EXISTS stocks CASCADE;

CREATE TABLE stocks (
  id SERIAL PRIMARY KEY NOT NULL,
  ticker_symbol TEXT NOT NULL,
  company_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  industry_sector TEXT NOT NULL,
  country TEXT NOT NULL
);