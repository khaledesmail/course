const app = require('./src/app');
const port = process.env.PORT || 8080;
const { logger } = require('./src/utilities');
app.listen(port, () => {
  logger.info(`app listening on port ${port}!`);
});
