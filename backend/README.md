# Portfolio Prophet Server Setup

## Table of Contents

1. [Setting Up the Database](#setting-up-the-database)
2. [Setting Up the Server](#setting-up-the-server)

---

## Setting Up the Database

### 1. Initialize the PostgreSQL Server

The first step is to start the PostgreSQL server. Open your terminal and execute the following command:

```sh
startpostgres
```

### 2. Create the Database

Once the server is running, you need to create a new database named "portfolio_prophet". Open your terminal and execute the following commands:

```sh
psql
```

```sql
CREATE DATABASE portfolio_prophet;
```

### 3. Initialize Schemas

After creating the database, you'll need to initialize the necessary schemas to set up the required tables. Ensure you're still in the PostgreSQL shell and execute the following commands:

```sql
\c portfolio_prophet

\i backend/src/db/schema/01_users.sql
\i backend/src/db/schema/02_stocks.sql
\i backend/src/db/schema/03_market_conditions.sql
\i backend/src/db/schema/04_current_data.sql
\i backend/src/db/schema/05_favourite_stocks.sql
\i backend/src/db/schema/06_historical_data.sql
```

---

## Setting Up the Server

### 1. Navigate to the Backend Directory

From the root folder of your project, change directory to the backend folder:

```sh
cd backend/
```

### 2. Install Dependencies

Install the required dependencies by running the following command:

```sh
npm install
```

### 3. API Keys & Environment Variables Setup

To configure API keys and environment varibales:

Create a free user for Financial Modeling Prep and Alpha Vantage (alt + click the links below)
https://site.financialmodelingprep.com/register

https://www.alphavantage.co/support/#api-key

Copy the .evn.example into a new file named '.env' and add your API key other environment variables:

```sh
HOST=localhost
PORT=3001

PGHOST=localhost
PGUSER=your-username-and-password
PGPASSWORD=your-username-and-password
PGDATABASE=portfolio_prophet
PGPORT=5432

SESSION_KEY=my_backend

AV_API_KEY=<your-alpha-vantage-api-key>
AV_BASE_URL=https://www.alphavantage.co/query?function=

FMP_API_KEY=<your-financial-modeling-prep-api-key>
FMP_BASE_URL=https://financialmodelingprep.com/api/v3/
```

### 3. Start the Server

Once the dependencies are installed, start the server by executing:

```sh
npm start
```

![Alt text](/planning/README-Photos/server%20connection.JPG?raw=true "Server connection")

---

Your Portfolio Prophet server is now set up and running smoothly. 