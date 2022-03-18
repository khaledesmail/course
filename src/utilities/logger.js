const winston = require('winston');
const config = require('../config/default.json');
let logger = winston.createLogger({
  transports: [
    new winston.transports.File(config.winston.file),
    new winston.transports.Console(config.winston.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;