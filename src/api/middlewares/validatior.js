const Ajv = require('ajv');
const multer = require('multer');
const schema = require('./schema.json');
const responseCodes = require('../../config/responseCodes');
const path = require('path');
const ajv = new Ajv({ allErrors: true });

const headerValidatior = (req, res, next) => {
  const valid = ajv.validate(schema.REQUEST_HEADER_SCHEMA, req.headers);
  if (!valid) {
    const response = responseCodes['05'];
    response.body.data = valid.errors;
    return res.status(response.status).json(response.body);
  }
  next();
};

const csvFilter = function (req, file, cb) {
  // Accept csv only
  if (!file.originalname.match(/\.(csv)$/)) {
    req.fileValidationError = 'Forbidden extension';
    return cb(null, false, req.fileValidationError);
  }
  cb(null, true);
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports = {
  headerValidatior,
  csvFilter,
  storage,
};
