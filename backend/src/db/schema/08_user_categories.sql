DROP TABLE IF EXISTS user_categories CASCADE;

CREATE TABLE user_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  stock_id INTEGER REFERENCES stocks(id) NOT NULL,
  category_name TEXT NOT NULL
);