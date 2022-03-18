const tokenModel = require('../model/token');
const Service = require('./Service');
const { logger } = require('../utilities');
const config = require('../config/default.json');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || config.jwt.SECRET;

class TokenService extends Service{
  constructor(model) {
    super(model);
    this.model = model;
  }
  async generateToken(data) {
    let profileData = {};
    const now = new Date().getTime() / 1000; // Time now in unix format
    const after24h = (new Date().getTime() + 1500 * 60 * 1000) / 1000; // Time after 24 Hours
    const isTokenExists = await super.find({ profileId: data._id});
    if (isTokenExists.body.data[0]){
      // Etend for another 24 hours
      await this.model.updateOne({ profileId: data._id}, { expiredAt: now});
      return { token: isTokenExists.body.data[0].token };
    }
    const payload = {
      iat: now,
      exp: after24h,
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      userName: data.userName,
      profileId: data._id
    };
    const token = jwt.sign(payload, SECRET);
    profileData.token = token;
    profileData.profileId = data._id;
    profileData.expiredAt = Date.now();
    logger.info('profileData', profileData);
    await super.insert(profileData);
    return { token };
  }
}

module.exports = new TokenService(tokenModel);
