//Import the mongoose module
const mongoose = require('mongoose');
const logger = require('./logger');

//Set up default mongoose connection
class Database {
    constructor() {

        this.url = process.env.MONGO_URL || 'mongodb://127.0.0.1/valeo';
    }
    async connect() {
        mongoose.connection.on('connecting', function () {
            logger.info("trying to establish a connection to mongo");
        });
        mongoose.connection.on('connected', function () {
            logger.info("Mongo connection established successfully");
        });
        mongoose.connection.on('error', function (err) {
            logger.info('connection to mongo failed ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            logger.info('mongo db connection closed');
        });
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    };
}

module.exports = new Database();