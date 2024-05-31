DROP TABLE IF EXISTS settings CASCADE;

CREATE TABLE settings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  default_investment_tenure INTEGER DEFAULT NULL,
  -- other settings coming!!!
);