// DB CONNECTION OBJECT INITIALIZE/EXPORT GOES HERE
const pg = require('pg');

const { Pool } = pg;

const dbParams = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

const db = new Pool(dbParams);

db.connect()
  .then(() => console.log(`Successfully connected to database: ${dbParams.database}`))
  .catch(error => console.log(`UNABLE TO CONNECT TO DATABASE. ERROR: ${error}`));

module.exports = db; // to be imported in: /queries/files