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

### 3. Start the Server

Once the dependencies are installed, start the server by executing:

```sh
npm start
```

---

Your Portfolio Prophet server is now set up and running smoothly. 