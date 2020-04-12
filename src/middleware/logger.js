const { createLogger, format, transports } = require('winston');
const appRoot = require('app-root-path');

const winston = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: `${appRoot}/logs/info.log`,
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

class Logger {
  logInfo({ method, url, params, body }) {
    winston.info(
      `Method: ${method}; url: ${url}; params: ${JSON.stringify(
        params
      )}; body: ${JSON.stringify(body)}`
    );
  }

  logError(message) {
    winston.info(`Erros: ${message}`);
    winston.error(`Error: ${message}`);
  }
}

module.exports = Logger;
