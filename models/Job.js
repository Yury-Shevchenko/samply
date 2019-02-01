const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  data: {},
  type: {
    type: String,
    default: 'normal',
    enum: ['normal', 'single']
  },
  priority: {
    type: Number,
    default: 0,
    min: -20,
    max: 20,
    index: 1
  },
  nextRunAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastModifiedBy: {
    type: String,
    default: 'open-lab'
  },
  lockedAt: {
    type: Date,
    index: true,
    // default: Date.now
  },
  lastFinishedAt: Date
});

module.exports = mongoose.model('Job', jobSchema);
