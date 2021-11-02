const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");
const { nanoid } = require("nanoid");

const projectSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You must supply a user!"
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  name: {
    type: String
  },
  slug: {
    type: String
  },
  samplycode: {
    type: String
  },
  image: String,
  description: {
    type: String,
    trim: true
  },
  welcomeMessage: {
    type: String,
    default: ""
  },
  codeMessage: {
    type: String
  },
  groupMessage: {
    type: String
  },
  messageAfterJoin: {
    type: String,
    default: ""
  },
  geofencingInstruction: {
    type: String
  },
  useNotifications: {
    type: Boolean,
    default: true
  },
  currentlyActive: Boolean,
  public: {
    type: Boolean,
    default: false
  },
  requestedForApproval: {
    type: Boolean,
    default: false
  },
  invitations: [{ email: String, token: String }],
  notifications: [
    {
      id: String,
      target: String,
      schedule: String,
      randomize: Boolean,
      date: { type: Date },
      interval: { type: String, default: "not_defined" },
      interval_max: { type: String },
      int_start: { type: Date },
      int_end: { type: Date },
      title: { type: String, default: "Samply" },
      message: { type: String, default: "Please complete a test." },
      duration: { type: Number },
      url: { type: String, default: "" },
      participantId: [{ type: String }],
      groups: [{ type: String }],
      name: String,
      start_after: JSON,
      stop_after: JSON,
      start_event: String,
      stop_event: String,
      window_from: Date,
      window_to: Date,
      number: Number,
      windowInterval: JSON,
      scheduleInFuture: Boolean,
      created: { type: Date, default: Date.now },
      readable: JSON,
      start_next: Number,
      stop_next: Number,
      allCurrentParticipants: Boolean,
      allCurrentGroups: Boolean
    }
  ],
  mobileUsers: [
    {
      id: String,
      token: String,
      created: {
        type: Date,
        default: Date.now
      },
      username: String,
      information: JSON,
      group: JSON,
      stripe: JSON
    }
  ],
  settings: JSON,
  notifyToken: String,
  notifyExpires: Date
});

projectSchema.statics.getCurrentProjects = function() {
  return this.aggregate([
    { $match: { currentlyActive: true } },
    {
      $project: {
        name: "$$ROOT.name",
        description: "$$ROOT.description"
      }
    },
    { $sort: { name: 1 } }
  ]);
};

projectSchema.statics.findAllPublic = function() {
  return this.aggregate([
    { $match: { currentlyActive: true, public: true } },
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $project: {
        name: "$$ROOT.name",
        slug: "$$ROOT.slug",
        description: "$$ROOT.description",
        welcomeMessage: "$$ROOT.welcomeMessage",
        messageAfterJoin: "$$ROOT.messageAfterJoin",
        created: "$$ROOT.created",
        author_name: "$author.name",
        author_institute: "$author.institute"
      }
    },
    { $sort: { name: 1 } }
  ]);
};

projectSchema.statics.debugProjects = function() {
  return this.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members"
      }
    },
    {
      $project: {
        name: "$$ROOT.name",
        description: "$$ROOT.description",
        codeMessage: "$$ROOT.codeMessage",
        geofencingInstruction: "$$ROOT.geofencingInstruction",
        image: "$$ROOT.image",
        created: "$$ROOT.created",
        author_name: "$author.name",
        author_institute: "$author.institute",
        members: "$members",
        participants: "$$ROOT.mobileUsers",
        currentlyActive: "$$ROOT.currentlyActive",
        requestedForApproval: "$$ROOT.requestedForApproval",
        public: "$$ROOT.public",
        settings: "$$ROOT.settings"
      }
    },
    { $sort: { created: 1 } }
  ]);
};

// pre-save validation to make sure that the project with the same name does not already exist
projectSchema.pre("save", async function(next) {
  // create slug
  if (
    this.name !== "" &&
    typeof this.name !== "undefined" &&
    (!this.slug || this.isModified("name"))
  ) {
    this.slug = slug(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i"); // regular expression
    const studiesWithSlug = await this.constructor.find({ slug: slugRegEx });
    if (studiesWithSlug.length) {
      this.slug = `${this.slug}-${studiesWithSlug.length + 1}`;
    }
  }

  if (!this.isModified("name") || this.name === "") {
    next(); // skip it
  }

  const self = this;
  mongoose.models.Project.findOne({ name: self.name }, function(err, project) {
    if (err) {
      next(err);
    } else if (project) {
      self.invalidate("name", "This name already exists");
      next(new Error("This name is already taken"));
    } else {
      next();
    }
  });
});

//pre-save validation to make sure that the project with the same name does not already exist
// projectSchema.pre('save', async function(next){
//   if (!this.isModified('name')){
//     next();//skip it
//   };
//
//   this.slug = slug(this.name);
//   const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');//regular expression
//   const projectsWithSlug = await this.constructor.find({ slug: slugRegEx });
//   if(projectsWithSlug.length){
//     this.slug = `${this.slug}-${projectsWithSlug.length + 1}`;
//   }
//   next();
//   // var self = this;
//   // mongoose.models["Project"].findOne({name: self.name}, function(err, project){
//   //   if(err){
//   //     next(err);
//   //   } else if(project){
//   //     self.invalidate("name", "This name already exists");
//   //     next(new Error('This name is already taken'));
//   //   } else {
//   //     next();
//   //   }
//   // });
// });

//find projects which user has created
projectSchema.virtual("participants", {
  ref: "User", //what model to link
  localField: "_id", //which field in the current model
  foreignField: "participant_projects", //should match field in the other model
  justOne: false
});

function autopopulate(next) {
  this.populate({ path: "participants", select: "participantInProject" });
  next();
}

projectSchema.pre("findOne", autopopulate);
projectSchema.pre("find", autopopulate);

module.exports = mongoose.model("Project", projectSchema);
