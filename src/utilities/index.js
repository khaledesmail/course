const Database = require('./dbConnection');
const Logger = require('./logger');
module.exports = {
    database: Database,
    logger: Logger
}