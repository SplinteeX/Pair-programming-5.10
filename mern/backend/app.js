const config = require('./utils/config')
const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger')

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  logger.info(req.path, req.method);
  next();
});

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.get('/', (req, res) => res.send('Hello'));

logger.info('connecting to', config.MONGO_URI)
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("connected to db");
  })
  .catch((error) => {
    logger.error(error);
  });

app.use(errorHandler);

module.exports = app;