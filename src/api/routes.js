const express = require('express');
const CourseController = require('./controller/CourseController');
const ProfileController = require('./controller/ProfileController');

const router = express.Router();
const multer = require('multer');
const { auth } = require('./middlewares/auth');
const {
  headerValidatior,
  csvFilter,
  storage,
} = require('./middlewares/validatior');

const upload = multer({
  storage,
  fileFilter: csvFilter,
  limits: { fieldSize: 5 * 1024 * 1024 }, //5 GB
  dest: 'uploads/',
});

// APIs For Course
router.post(
  '/rest/api/v1/course',
  upload.single('course'),
  auth,
  headerValidatior,
  async (req, res) => {
    if (req.fileValidationError) {
      return res.status(422).json({ message: 'Invalid csv format!' });
    }
    let response = await CourseController.publishCourseResult(req);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);
router.get(
  '/rest/api/v1/course',
  headerValidatior,
  async (req, res) => {
    let response = await CourseController.getResult(req.query);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

// APIs For Profile (Teacher)

router.post(
  '/rest/api/v1/profile/signup',
  headerValidatior,
  async (req, res) => {
    const response = await ProfileController.signup(req.body);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

router.post(
  '/rest/api/v1/profile/signin',
  headerValidatior,
  async (req, res) => {
    const response = await ProfileController.signin(req.body);
    res.status(response.status ? response.status : 500).json(response.body);
  }
);

module.exports = router;
