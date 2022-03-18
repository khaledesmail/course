const responseCodes = require('../../config/responseCodes');
const { logger } = require('../../utilities');
const CourseService = require('../../service/CourseService');
const courseResultModel = require('../../model/courseResult');
const Controller = require('./Controller');
class CourseController extends Controller {
  constructor(service, model) {
    super(service, model);
    this.model = model;
    this.service = service;
  }
  async publishCourseResult(req) {
    let response = {};
    try {
      logger.info('_____________Publish Course Result METHOD CONTROLLER____________');
      const payload = {
        courseFileName: req.file.filename,
        courseId: req.file.originalname.split('.').slice(0, -1).join('.'),
        teacherName: req.userName,
        email: req.body.email
      }
      response = await this.service.publishCourseResult(payload);
      return response;
    } catch (error) {
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }
  async getResult(query) {
    let response = {};
    try {
      logger.info('_____________Get Result METHOD CONTROLLER____________');
      const queryObj = {
        studentId: query.studentId,
        courseId: query.courseId
      };
      response = await this.service.getResult(queryObj);
      return response;
    } catch (error) {
      response = responseCodes['07'];
      response.body.data = error;
      return response;
    }
  }
}

module.exports = new CourseController(CourseService, courseResultModel);
