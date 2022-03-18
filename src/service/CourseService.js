const Service = require('./Service');
const { logger } = require('../utilities');
const responseCodes = require('../config/responseCodes');
const courseResult = require('../model/courseResult');
const nodemailer = require('nodemailer');
const config = require('../config/default.json');

const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

class CourseService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async sendAnEmail(payload) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.gmail.user,
        pass: config.gmail.pass,
      }
    });
    const message = {
      from: config.gmail.user,
      to: payload.email,
      subject: payload.courseId,
      text: 'Course Results Link: http://localhost:8080/rest/api/v1/course',
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        logger.error(err);
      } else {
        logger.info(info);
      }
    });
  }
  async _checkForErrors(courseFileName) {
    const filePath = path.resolve(`./uploads/${courseFileName}`);
    const results = [];
    let rowNumber = 1;
    let response = {};
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => {
          reject(error);
        })
        .on('data', (row) => {
          // Grade Check
          if (row.grade < 0 || row.grade > 100) {
            response = responseCodes['04'];
            response.body.message = response.body.message + rowNumber;
            throw response;
          }
          // Duplicate Check
          const isStudentExists = results.find((item) => item.id == row.id);
          if (isStudentExists) {
            response = responseCodes['09'];
            response.body.message = response.body.message + rowNumber;
            throw response;
          }
          results.push(row);
          rowNumber += 1;
        })
        .on('end', (rowCount) => {
          logger.info(`Parsed ${rowCount} rows`);
          resolve(results);
        });
    });
  }
  async _storeCourseResults(payload) {
    const results = [];
    let rowNumber = 0;
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve(`./uploads/${payload.courseFileName}`))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => {
          reject(error);
        })
        .on('data', (row) => {
          let parsedRow = {
            studentId: row.id,
            courseId: payload.courseId,
            grade: row.grade,
            status: row.grade > 50 ? 'Pass' : 'Fail',
            teacherName: payload.teacherName,
          };
          results.push(parsedRow);
          if (rowNumber === 500) {
            // create a batch to create 500 records
            super.insert(results);
            results = [];
            rowNumber = 0;
          }
          rowNumber += 1;
        })
        .on('end', (rowCount) => {
          logger.info(`Inserted ${rowCount} rows`);
          super.insert(results);
          resolve(results);
        });
    });
  }
  async publishCourseResult(payload) {
    let response = {};
    try {
      logger.info('_____________Publish Course ResultSERVICE____________');
      await this._checkForErrors(payload.courseFileName);
      await this._storeCourseResults(payload);
      const filePath = path.resolve(`./uploads/${payload.courseFileName}`);
      fs.unlink(filePath, () => logger.info('File was deleted!'));
      if(payload.email){
        this.sendAnEmail(payload);
      }
      response = responseCodes['03'];
      return response;
    } catch (error) {
      return error;
    }
  }
  async getResult(query) {
    try {
      logger.info('_____________Publish Course ResultSERVICE____________');
      return super.find(query);
    } catch (error) {
      return error;
    }
  }
}
module.exports = new CourseService(courseResult);
