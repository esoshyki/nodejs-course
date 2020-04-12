const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const Logger = require('./middleware/logger');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const logger = new Logger();

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const { method, url, params, body } = req;
  logger.logInfo({ method, url, params, body });
  next();
});

process.on('unhandledRejection', reason => {
  logger.logError(reason.message);
  throw reason;
});

process.on('uncaughtExceptionMonitor', error => {
  logger.logError(error.message);
  throw error;
});

app.use((err, req, res, next) => {
  console.log('here');
  console.log(err.stack);
  logger.logError(err.stack);
  res.status(500).send('Something broke!');
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

module.exports = app;
