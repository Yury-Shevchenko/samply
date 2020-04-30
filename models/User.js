const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    local            : {
        password     : String
    },
    code             : {
        id           : String,
        password     : String
    },
    name             : String,
    email            : String,
    samplyId         : String, // id for mobile participants / goes inside mobileUsers: id in Projects
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
    participant_projects: [
      {
        _id : {type : mongoose.Schema.ObjectId, ref : 'Project'},
        name : String
      }
    ],
    project: {
      _id : {type : mongoose.Schema.ObjectId, ref : 'Project'},
      name : String
    },
    institute             : String,
    notifications         : [
        {
          endpoint        : String,
          keys            : {
            auth          : String,
            p256dh        : String,
          },
          date            : { type: Date, default: Date.now },
        }
    ],
    useragent             : String,
    information           : JSON,
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
    { $match: {
      $or: [
        { 'participant_projects' : { $eq: project } }, // filter users in the past
        { 'participantInProject' : { $eq: project } },
        ]
      }
    },
    { $match: { 'level' : { $lt: 10 }} },// filter only users
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
            dataRequests: { $cond: ['$dataRequest', 1, 0] },
          }},
        ],
        as: 'results'
      }
    },
    { $project: {
        name: '$$ROOT.name',
        level: '$$ROOT.level',
        participant_id: '$$ROOT.samplyId',
        participant_code: '$$ROOT.code.id',
        created: '$$ROOT.created',
        language: '$$ROOT.language',
        participantInProject: '$$ROOT.participantInProject',
        confirmationCodes: '$$ROOT.participantHistory',
        numberTests: {$size:
          { $setUnion: '$results.test' }
        },
        numberDeleteRequests: { $sum: '$results.deleteRequests' },
        numberDataRequests: { $sum: '$results.dataRequests' },
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


//find projects which user has created
userSchema.virtual('projects', {
  ref: 'Project',//what model to link
  localField: '_id',//which field in the current model
  foreignField: 'creator',//should match field in the other model
  justOne: false
});

userSchema.virtual('invitedprojects', {
  ref: 'Project',//what model to link
  localField: '_id',//which field in the current model
  foreignField: 'members',//should match field in the other model
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
