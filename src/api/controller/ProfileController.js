const { logger } = require('../../utilities');
const ProfileService = require('../../service/ProfileService');
const profileModel = require('../../model/profile');
const Controller = require('./Controller');
class ProfileController extends Controller {
  constructor(service, model) {
    super(service, model);
    this.model = model;
    this.service = service;
  }
  async signin(body) {
    let response = {};
    try {
      logger.info('_____________SIGNIN METHOD CONTROLLER____________');
      response = await this.service.signin(body);
      return response;
    } catch (error) {
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }

  async signup(body) {
    let response = {};
    try {
      logger.info('_____________SignUp METHOD CONTROLLER____________');
      response = await this.service.signup(body);
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
module.exports = new ProfileController(ProfileService, profileModel);
