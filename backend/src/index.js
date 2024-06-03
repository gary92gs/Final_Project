//IMPORT ENV VARIABLES
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//IMPORTS
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require("cors");
const cookieSession = require('cookie-session');


//INITIALIZE SERVER OBJ
const app = express();

//MOUNT MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieSession({
  name: 'PP-session',
  keys: [process.env.SESSION_KEY || 'development'],
}));

//IMPORT ROUTES
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');
const searchRouter = require('./routes/search');
const dashboardAnalysisRouter = require('./routes/dashboardAnalysis');
const favouritesRouter = require('./routes/favourites');

//MOUNT ROUTES
app.use('/api/search', searchRouter);
app.use('/api/dashboard-analysis', dashboardAnalysisRouter);
app.use('/api/favourites', favouritesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: "Home Route!" });
});

//START SERVER
app.listen(PORT, () => {
  console.log(`EXPRESS: API Server is listening on port ${PORT}`);
});
