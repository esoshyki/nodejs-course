const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.label({ label: path.basename(process.mainModule.filename) }),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(
      winston.format.colorize(),
      winston.format.cli()
    ),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/info.log'),
      level: 'info',
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console(
      winston.format.colorize(),
      winston.format.cli()
    ),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/exceptions.log'),
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    })
  ],
  exitOnError: true
});

module.exports = logger;
