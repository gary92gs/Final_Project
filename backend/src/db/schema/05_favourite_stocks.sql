DROP TABLE IF EXISTS favourite_stocks CASCADE;

CREATE TABLE favourite_stocks (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  stock_id INTEGER REFERENCES stocks(id) NOT NULL,
  user_category TEXT DEFAULT NULL
);