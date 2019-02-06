const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');

const userSchema = new Schema({

    local            : {
        password     : String
    },
    code             : {
        id           : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    github          : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    google           : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    name             : String,
    email            : String,
    openLabId        : String,
    created          : {
        type         : Date,
        default      : Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    level            : Number, //The normal user is 1, the admin is 11, the Superadmin is 101
    language         : {
        type         : String,
        default      : "english"
    },
    participantInProject: {
        type         : mongoose.Schema.ObjectId,
        ref          : 'Project'
    },
    project: {
      _id : {type : mongoose.Schema.ObjectId, ref : 'Project'},
      name : String
    },
    subscription          : Boolean,
    subscription_id       : String,
    subscription_status   : String,
    subscription_expires  : Number,
    subscription_plan     : String,
    subscription_period   : String,
    institute             : String,
    participantHistory    : [
        {
          project_id      : {type : mongoose.Schema.ObjectId, ref : 'Project'},
          project_name    : String,
          individual_code : String,
        }
    ],
    notifications         : [
        {
          endpoint        : String,
          keys            : {
            auth          : String,
            p256dh        : String,
          }
        }
    ],
    // created_project  : {
    //     type         : String
    // },
    //relationships between chosen tests and the user(researcher)
    // tests            : [{ type : mongoose.Schema.ObjectId, ref: 'Test' }],
    // testsData        : [mongoose.Schema.Types.Mixed]
}, { toJSON: { virtuals: true } });

//methods
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// checking if code is valid
userSchema.methods.validCode = function(password) {
    return bcrypt.compareSync(password, this.code.password);
};

//get users of a particular project (for /data)
userSchema.statics.getUsersOfProject = function(project) {
  return this.aggregate([
    { $lookup:
      {
        from: 'results',
        let: { current_project: project, current_author: '$_id' },
        pipeline: [
          { $match:
            { $expr:
              { $and:
                [
                  { $eq: ['$project', '$$current_project'] },
                  { $eq: ['$author', '$$current_author' ]}
                ]
              }
            }
          },
          {$project: {project: 1, test: 1,
            deleteRequests: { $cond: ['$deleteRequest', 1, 0] },
          }},
        ],
        as: 'results'
      }
    },
    { $match: {
      $or: [
        { 'results.project' : { $eq: project } }, //filter only results of the current project
        { 'participantInProject' : { $eq: project } }//filter users
        ]
      }
    },
    //{ $match: { 'level' : { $lt: 10 }} },//filter only users
    { $project: {
        name: '$$ROOT.name',
        level: '$$ROOT.level',
        participant_id: '$$ROOT.openLabId',
        participant_code: '$$ROOT.code.id',
        created: '$$ROOT.created',
        language: '$$ROOT.language',
        //project: '$$ROOT.project',
        participantInProject: '$$ROOT.participantInProject',
        confirmationCodes: '$$ROOT.participantHistory',
        //averageRating: {$avg: '$results.rating'},
        numberTests: {$size:
          { $setUnion: '$results.test' }
        },
        //results: '$results',
        numberDeleteRequests: { $sum: '$results.deleteRequests' },
        notifications: '$$ROOT.notifications',
      }
    },
    { $sort : {identity: 1}}, //from highest to lowest
  ]);
};

//pre-save validation to make sure that the email does not already exist
userSchema.pre('save', function(next){
  if (!this.isModified('email') || this.email === ''){
    next();//skip it
  };
  var self = this;
  mongoose.models["User"].findOne({email: self.email}, function(err, user){
    if(err){
      next(err);
    } else if(user){
      self.invalidate("email", "This email already exists");
      next(new Error('This email already exists'));
    } else {
      next();
    }
  });
});

//method to get users with the data about tests that they have created (can be used for administration)
userSchema.statics.getUsersTests = function() {
  return this.aggregate([
    { $lookup: {
      from: 'tests', localField: '_id', foreignField: 'author', as: 'tests'
      }
    },
    { $project: {
      name: '$$ROOT.name',
      level: '$$ROOT.level',
      tests: '$$ROOT.tests'
      }
    }
  ]);
};

//method to get users
userSchema.statics.getUsers = function() {
  return this.aggregate([
    //lookup users and populate them
    { $lookup: {
      from: 'results', localField: '_id', foreignField: 'author', as: 'results'
      }
    },
    //filter where at least one item in results exists (users without results will be filtered out)
    //{ $match: { 'results.0' : { $exists: true }} },
    { $match: { 'level' : { $lt: 10 }} },//filter only users
    //add the average field ($addField)
    { $project: {
      //list variables that are needed
        name: '$$ROOT.name',
        level: '$$ROOT.level',
        identity: '$$ROOT.identity',
        created: '$$ROOT.created',
        language: '$$ROOT.language',
        project: '$$ROOT.project',
        projectidentity: '$$ROOT.projectidentity',
        //results: '$$ROOT.results',
        averageRating: {$avg: '$results.rating'},
        numberTests: {$size:
          { $setUnion: '$results.text' }
        }//calculate the size of the array which is the set union of all taken tests
      }
    },
    //sort it by new field
    { $sort : {identity: 1}} //from highest to lowest
    //limit to at most 10
    //{ $limit : 10 }
  ]);
};

//method to get researchers
userSchema.statics.getResearchers = function() {
  return this.aggregate([
    { $match: { 'level' : { $gt: 10 }} },//filter only users
    // { $lookup:
    //   {
    //     from: 'results',
    //     let: { current_author: '$_id' },
    //     pipeline: [
    //       { $match:
    //         { $expr:
    //           { $and:
    //             [
    //               { $eq: ['$author', '$$current_author' ]}
    //             ]
    //           }
    //         }
    //       },
    //       {$project: {project: 1, test: 1}}
    //     ],
    //     as: 'results'
    //   }
    // },
    { $lookup:
      {
        from: 'tests',
        let: { current_creator: '$_id' },
        pipeline: [
          { $match:
            { $expr:
              { $and:
                [
                  { $eq: ['$author', '$$current_creator' ]}
                ]
              }
            }
          },
          {$project: {_id: 1}}
        ],
        as: 'tests'
      }
    },
    { $lookup:
      {
        from: 'projects',
        let: { current_leader: '$_id' },
        pipeline: [
          { $match:
            { $expr:
              { $and:
                [
                  { $eq: ['$creator', '$$current_leader' ]}
                ]
              }
            }
          },
          {$project: {_id: 1}}
        ],
        as: 'projects'
      }
    },
    { $project: {
        email: '$$ROOT.email',
        participant_id: '$$ROOT.openLabId',
        name: '$$ROOT.name',
        institute: '$$ROOT.institute',
        level: '$$ROOT.level',
        created: '$$ROOT.created',
        language: '$$ROOT.language',
        project: '$$ROOT.project',
        // participantInProject: '$$ROOT.participantInProject',
        // numberParticipantResults: {$size:
        //   { $setUnion: '$results._id' }
        // },
        // numberParticipantTests: {$size:
        //   { $setUnion: '$results.test' }
        // },
        // numberParticipantProjects: {$size:
        //   { $setUnion: '$results.project' }
        // },
        numberResearcherTests: {$size:
          { $setUnion: '$tests._id' }
        },
        numberResearcherCreatedProjects: {$size:
          { $setUnion: '$projects._id' }
        },
        // projects: '$projects',
        // tests: '$tests',
        // results: '$results',
      }
    },
    { $sort : {identity: 1}} //from highest to lowest
  ]);
};


//the method for tp ranking list, return only general information about users
userSchema.statics.getTopUsers = function(project_id) {
  return this.aggregate([
    { $lookup: {
      from: 'results', localField: '_id', foreignField: 'author', as: 'results'
      }
    },
    { $match: { 'projectidentity' : { $eq: project_id }} },//filter only users
    { $match: { 'results.0' : { $exists: true }} },
    { $match: { 'level' : { $lt: 10 }} },//filter only users
    { $project: {
      //list variables that are needed
        name: '$$ROOT.name',
        level: '$$ROOT.level',
        //identity: '$$ROOT.identity',
        //results: '$$ROOT.results',
        averageRating: {$sum: '$results.rating'},//to sum all ratings from all tasks
        numberTests: {$size:
          { $setUnion: '$results.text' }
        }//calculate the size of the array which is the set union of all taken tests
      }
    },
    //sort it by new field
    { $sort : {averageRating: -1}}, //from highest to lowest
    //limit to at most 10
    //{ $limit : 10 }
  ]);
};

// userSchema.statics.getCurrentProjects = function() {
//   return this.aggregate([
//     { $match: { 'level' : { $gt: 10 }} },//filter only users
//     { $match: { 'created_project' : { $exists: true } }}, //filter users without projects
//     { $match: { 'created_project' : { $ne: ''} }}, //filter projects without names
//     { $project: {
//         created_project: '$$ROOT.created_project'
//       }},
//   ]);
// };

//TODO finish gravatar
// userSchema.virtual('gravatar').get(function(){
//   if(this.email){
//     const hash = md5(this.email);
//     return `https://gravatar.com/avatar/${hash}?s=200`;
//   } else {
//     //return some standard picture
//     return `https://www.argospetinsurance.co.uk/assets/uploads/2017/12/cat-pet-animal-domestic-104827.jpeg`;
//   }
// });

//find projects which user has created
userSchema.virtual('projects', {
  ref: 'Project',//what model to link
  localField: '_id',//which field in the current model Test
  foreignField: 'creator',//should match field in the other model Result
  justOne: false
});

userSchema.virtual('invitedprojects', {
  ref: 'Project',//what model to link
  localField: '_id',//which field in the current model Test
  foreignField: 'members',//should match field in the other model Result
  justOne: false
});

function autopopulate(next){
  this.populate({path: 'projects', select: 'creator name'});
  this.populate({path: 'invitedprojects', select: 'members creator name'});
  next();
};

userSchema.pre('find', autopopulate);
userSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('User', userSchema);
