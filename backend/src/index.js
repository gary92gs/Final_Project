//IMPORT ENV VARIABLES
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//IMPORTS
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require("cors");

//INITIALIZE SERVER OBJ
const app = express();

//MOUNT MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//IMPORT ROUTES
const usersRoutes = require('./routes/users');
// const searchRoutes = require('./routes/search');
// const saveStockRoutes = require('./routes/saveStock');
// const stockOverviewRoutes = require('./routes/stockOverview');
// const dashboardAnalysisRoutes = require('./routes/dashboardAnalysis');
// const favouritesRoutes = require('./routes/favourites');

//MOUNT ROUTES
// app.use('/api/users', usersRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/save-stock', saveStockRoutes);
// app.use('/api/stock-overview', stockOverviewRoutes);
// app.use('/api/dashboard-analysis', dashboardAnalysisRoutes);
// app.use('/api/favourites', favouritesRoutes);
app.use('/', usersRoutes);

//START SERVER
app.listen(PORT, () => {
  console.log(`API Server is listening on port ${PORT}`);
});
