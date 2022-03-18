var mongoose = require('mongoose');

class token {
  constructor(model) {
    this.model = model;
  }
  initSchema() {
    const tokenSchema = mongoose.Schema({
      profileId: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      expiredAt: {
        type: Date,
        default: Date.now,
        index: { expires: '86400000' },
      },
    },
    {
      timestamps: true,
    }
    );
    mongoose.model('token', tokenSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('token');
  }
}
module.exports = new token().getInstance();
