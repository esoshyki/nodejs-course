const logger = require('../common/winston.config');

const infoLogMiddleWare = (req, res, next) => {
  const { url, body, method, query } = req;
  logger.info('info logger', {
    url,
    body,
    method,
    query
  });
  next();
};

const errorLogMiddleWare = (err, req, res, next) => {
  const { message, statusCode } = err;
  const { method, body } = req;
  res.status(500).send(message);
  logger.error('Error', {
    message,
    statusCode,
    method,
    body
  });
  infoLogMiddleWare(req, res, next);
  next();
};

module.exports = { infoLogMiddleWare, errorLogMiddleWare };
