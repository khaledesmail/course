var mongoose = require('mongoose');

class courseResult {
  constructor(model) {
    this.model = model;
  }
  initSchema() {
    const courseResultSchema = mongoose.Schema({
      studentId: {
        type: String,
        required: true,
      },
      courseId: {
        type: String,
        required: true,
      },
      grade: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ['Pass', 'Fail']
      },
      teacherName: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
    );
    mongoose.model('courseResult', courseResultSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('courseResult');
  }
}
module.exports = new courseResult().getInstance();
