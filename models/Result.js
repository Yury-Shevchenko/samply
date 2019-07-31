const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const resultSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user!'
  },
  project:{
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  samplyid: Number,
  name: String,
  data: {
    title: String,
    content: String,
    openUrl: String,
  },
  usertimestamp: Number,
});


function autopopulate(next) {
  this.populate('author');
  next();
};

resultSchema.pre('find', autopopulate);
resultSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Result', resultSchema);
