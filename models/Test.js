const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a task name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  open: Boolean,
  tags: [String],
  position: Number,
  created: {
    type: Date,
    default: Date.now
  },
  // script: String,
  scriptUpdated: {
    type: Date
  },
  token: String,
  tokenExpires: Date,
  timer: Number,
  photo: String,
  file: String,
  css: String,
  //json: mongoose.Schema.Types.Mixed,
  json: String,
  params: mongoose.Schema.Types.Mixed,
  production: String,
  labjsVersion: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  version: String,
},{
  toJSON: {virtuals: true},//make virtuals visible
  toObject: {virtuals: true}
});

//method to get users with the data about tests that they have created (can be used for administration)
testSchema.statics.getTests = function(tests) {
  return this.aggregate([
    { $match: { _id: { $in: tests } } },
    { $project: {
      name: '$$ROOT.name',
      fullName: '$$ROOT.fullName',
      slug: '$$ROOT.slug',
      description: '$$ROOT.description',
      position: '$$ROOT.position',
      photo: '$$ROOT.photo',
    }},
    //{ $match: { 'position': { $gt: 0} } },
    //{ $sort: { position: 1 } }
  ]);
};

testSchema.statics.showMyTests = function(userID) {
  return this.aggregate([
    { $match: { author: userID }},
    { $lookup:
      {
        from: 'results',
        let: { current_test: '$_id' },
        pipeline: [
          { $match:
            { $expr:
              { $and:
                [
                  { $eq: ['$test', '$$current_test'] },
                  { $eq: ['$uploadType', 'full' ]}
                ]
              }
            }
          },
          {$project: {_id:1, project: 1}}
        ],
        as: 'results'
      }
    },
    { $project: {
      name: '$$ROOT.name',
      fullName: '$$ROOT.fullName',
      slug: '$$ROOT.slug',
      open: '$$ROOT.open',
      description: '$$ROOT.description',
      author: '$$ROOT.author',
      photo: '$$ROOT.photo',
      production: '$$ROOT.production',
      // results: '$results',
      numberResults: {$size:
        { $setUnion: '$results._id' }
      },
      numberProjects: {$size:
        { $setUnion: '$results.project' }
      }
    }},
    { $sort: { position: 1 } }
  ]);
};

testSchema.statics.showChosenTests = function(project_id, tests) {
  return this.aggregate([
    { $match: { _id: { $in: tests } } },
    { $lookup: {
        from: 'results', localField: '_id', foreignField: 'test', as: 'results'}
    },
    { $project: {
      name: '$$ROOT.name',
      fullName: '$$ROOT.fullName',
      slug: '$$ROOT.slug',
      description: '$$ROOT.description',
      position: '$$ROOT.position',
      timer: '$$ROOT.timer',
      author: '$$ROOT.author',
      photo: '$$ROOT.photo',
      numberResults: {$size:
        //{ $setUnion: '$results' }
        { $setUnion: {
          $filter:
          {
            input: "$results",
            as: "result",
            cond: { $eq: [ "$$result.project_id", project_id ] }
          }
        } }
      }
      //results: '$$ROOT.results'
    }},
    { $sort: { position: 1 } }
  ]);
};

//define indexes for the faster search
testSchema.index({
  name: 'text',
  description: 'text'
});

//pre-save validation to make sure that the test slug is unique
testSchema.pre('save', async function(next){
  if (!this.isModified('name')){
    next();//skip it
    return;//stop this function
  };
  this.slug = slug(this.name);
  //find other stores with the same slug
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');//regular expression
  const testsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if(testsWithSlug.length){
    this.slug = `${this.slug}-${testsWithSlug.length + 1}`;
  }
  next();
  //TODO make more resilient so slugs are unique
});

//define static function
testSchema.statics.getTagsList = function(id){
  return this.aggregate([
    { $match: {
      $or:[
        {
          open: true
        },
        {
          open: false,
          author: { $eq: id}
        }
      ]
    } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags' , count: {$sum: 1}} },
    { $sort: { count: -1 } }
  ]);
};

//find results where the tests _id property === results test property
testSchema.virtual('results', {
  ref: 'Result',//what model to link
  localField: '_id',//which field in the current model Test
  foreignField: 'test'//should match field in the other model Result
});

function autopopulate(next){
  this.populate('results');
  next();
};

//testSchema.pre('find', autopopulate);
//testSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Test', testSchema);
