const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const paramSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },          
  project:{
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'You must supply a project!'
  },
  test: {
    type: mongoose.Schema.ObjectId,
    ref: 'Test',
    required: 'You must supply a test!'
  },
  slug: String,
  language: {
    type: String,
    default: "german"
  },
  parameters: mongoose.Schema.Types.Mixed
});

//method to get researchers
paramSchema.statics.getParameters = function(feature) {
  return this.aggregate([
    { $match: {
      slug : feature.slug,
      language: feature.language,
      project: mongoose.Types.ObjectId(feature.project)
    } },
    { $project: {
        parameters: '$$ROOT.parameters'
      }
    }
  ]);
};


module.exports = mongoose.model('Param', paramSchema);
