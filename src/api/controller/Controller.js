const responseCodes = require('../../config/responseCodes');
const { logger } = require('../../utilities');
class Controller {
  constructor(service, model) {
    this.service = service;
    this.model = model;
  }
  async insert(req, res) {
    let response = {};
    try {
      logger.info('_____________INSERT METHOD CONTROLLER____________');
      response = await this.service.insert(req.body);
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }

  async findOne(req, res) {
    let response = {};
    try {
      logger.info('_____________FINDEONE METHOD CONTROLLER____________');
      const query = {
        _id: req.params._id,
      };
      response = await this.service.findOne(query);
      logger.info('response', response);
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }

  async find(query) {
    let response = {};
    try {
      logger.info('_____________FIND METHOD CONTROLLER____________');
      response = await this.service.find(query);
      logger.info('response', response);
      return response;
    } catch (error) {
      logger.info('error', error);
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }
}
module.exports = Controller;
