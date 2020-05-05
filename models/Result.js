const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const resultSchema = new mongoose.Schema({
  messageId: String,
  created: {
    type: Date,
    default: Date.now
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  samplyid: String,
  data: {
    title: String,
    message: String,
    url: String,
  },
  ticket: JSON,
  events: [
    {
      status: String,
      created: Date,
    }
  ], // sent, tapped
  project_name: String,
});


function autopopulate(next) {
  this.populate('author');
  next();
};

resultSchema.pre('find', autopopulate);
resultSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Result', resultSchema);
