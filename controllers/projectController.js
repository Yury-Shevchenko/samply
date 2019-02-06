const mongoose = require('mongoose');
const Test = mongoose.model('Test');
const Param = mongoose.model('Param');
const User = mongoose.model('User');
const Result = mongoose.model('Result');
const Project = mongoose.model('Project');

//show the user's projects
exports.getUserProjects = async (req, res) => {
  const projects = await Project.find({creator: req.user._id}, {
    name: 1, description: 1, members: 1, tests: 1, currentlyActive: 1, creator: 1
  });
  const limitSandbox = 100;
  const limitProf = 500;
  if (projects){
    if (!req.user.subscription || Date.now() > req.user.subscription_expires * 1000 || (req.user.subscription && req.user.subscription_plan == 'professional')){
      await Promise.all(projects.map(async (item) => {
        const project = await Project.findOne({ _id: item._id });
        const participantsNumber = project.participants.length;
        if (project.currentlyActive  && ((participantsNumber > limitSandbox && (!req.user.subscription || Date.now() > req.user.subscription_expires * 1000)) || (participantsNumber > limitProf && req.user.subscription && req.user.subscription_plan == 'professional') )) {
          project.currentlyActive = false;
          await project.save();
          req.flash('error', `${res.locals.layout.flash_limit_of_participants_reached_1} ${project.name} ${res.locals.layout.flash_limit_of_participants_reached_2}`);
        }
      }));
    }
  }
  const invitedprojects = await Project.find({members: req.user._id}, {
    name: 1, description: 1, members: 1, tests: 1, currentlyActive: 1, creator: 1
  });
  res.render('projects', { title: 'Your projects', projects, invitedprojects });
};

exports.activateProject = async (req, res) => {
  const activeProject = await Project.findOne({name: req.params.name});
  const updatedUser = await User.findOneAndUpdate({
    _id: req.user._id
  }, { project: activeProject }, {
    new: true,
    upsert: true
  }).exec();
  req.flash('success', `${req.params.name} ${res.locals.layout.flash_activate_project}`);
  res.redirect('back');
};

exports.createProject = async (req, res) => {
  if (req.body.name != ''){
    try {
      let membersData = [];
      if(req.body.members){
        const users = await User.find({ email: { $in : req.body.members }, level: { $gt: 10 }});
        membersData = users.map(e => {
          return e._id
        });
      };
      const project = await (new Project(
        {
          name: req.body.name,
          description: req.body.description,
          creator: req.user._id,
          members: membersData,
          currentlyActive: req.body.currentlyActive,
          showCompletionCode: req.body.showCompletionCode == 'on',
          useNotifications: req.body.useNotifications == 'on',
        }
      )).save();
      if (typeof(req.user.project._id) == "undefined"){
        const updatedUser = await User.findOneAndUpdate({
          _id: req.user._id
        }, { project: project }, {
          new: true,
          upsert: true
        }).exec();
      };
      req.flash('success', `${res.locals.layout.flash_project_created} <strong>${req.body.name}</strong>.`);
      res.redirect(`/projects`);
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('back');
      return;
    }
  } else {
    req.flash('error', `${res.locals.layout.flash_give_name}`);
    res.redirect('back');
  }
};

exports.updateProject = async (req, res) => {
  try {
    let membersData = [];
    if(req.body.members){
      const users = await User.find({ email: { $in : req.body.members }});
      membersData = users.map(e => {
        if(e.email && e.email != null && typeof(e.email) != 'undefined' && e.email != req.user.email ) {
          return e._id
        };
      }).filter(e => typeof(e) != 'undefined');
    };
    const project = await Project.findOne({ _id: req.params.id });
    project.name = req.body.name;
    project.description = req.body.description;
    project.showCompletionCode = req.body.showCompletionCode == 'on';
    project.useNotifications = req.body.useNotifications == 'on';
    project.members = membersData;
    await project.save();
    req.flash('success', `${res.locals.layout.flash_project_updated}`);
    res.redirect('back');
  } catch(err) {
    req.flash('error', err.message);
    res.redirect('back');
    return;
  }
};

exports.editProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  let membersEmails = [];
  if (project.members){
    const users = await User.find({ _id: { $in : project.members }});
    membersEmails = users.map(e => {
      return e.email
    });
  };
  confirmOwner(project, req.user);
  res.render('editProject', {title: `Edit ${project.name}`, project, membersEmails});
};

const confirmOwner = (project, user) => {
  if(!project.creator.equals(user._id) || user.level <= 10){
    throw Error('You must own a project in order to edit it!');
  }
};

exports.trydeleteProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  if(!project.creator.equals(req.user._id) || req.user.level <= 10){
    req.flash('error', `${res.locals.layout.flash_project_no_rights}`);
    res.redirect('back');
  } else {
    const resultsCount = await Result.where({ project: req.params.id }).countDocuments();
    const participantsCount = await User.where({ participantInProject: req.params.id }).countDocuments();
    res.render('deleteProjectForm', {project, resultsCount, participantsCount});
  }
};

exports.removeProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  const resultsCount = await Result.where({ project: req.params.id }).countDocuments();
  if (req.body.confirmation == project.name){
    if (resultsCount > 0) {
      const deletedResultsPromise = Result.deleteMany({ project: req.params.id });
      const projectRemovePromise = project.remove();
      await Promise.all([deletedResultsPromise, projectRemovePromise])
      req.flash('success', `${res.locals.layout.flash_project_deleted}`);
      res.redirect('/projects');
    } else {
      project.remove((projectErr, removedProject) => {
        req.flash('success', `${res.locals.layout.flash_project_deleted}`);
        res.redirect('/projects');
      });
    }
  } else {
    req.flash('error', `${res.locals.layout.flash_cannot_delete}`);
    res.redirect('back');
  }
};

exports.changeStatusProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  const limitSandbox = 100;
  const limitProf = 500;
  const participantsNumber = project.participants.length;
  if ( project.currentlyActive || participantsNumber < limitSandbox || (participantsNumber < limitProf && req.user.subscription && Date.now() < req.user.subscription_expires * 1000) || (req.user.subscription && Date.now() < req.user.subscription_expires * 1000 && req.user.subscription_plan == 'laboratory')){
    project.currentlyActive = !project.currentlyActive;
    await project.save();
    req.flash('success', `${req.params.action == 'on'? res.locals.layout.flash_program_open : res.locals.layout.flash_program_closed}`);
    res.redirect('/projects');
  } else {
    req.flash('error', `${res.locals.layout.flash_limit_of_participants_reached_1} ${project.name} ${res.locals.layout.flash_limit_of_participants_reached_2}`);
    res.redirect('back');
  }
};

exports.listPublicProjects = async(req, res) => {
  const study = req.query.study;
  const page = req.params.page || 1;
  const limit = 20;
  const skip = (page * limit) - limit;
  const projectsPromise = Project
    .findAllPublic()
    .skip(skip)
    .limit(limit);
  const countPromise = Project.where({currentlyActive: true, creator: { $exists: true }}).countDocuments();
  const [projects, count] = await Promise.all([ projectsPromise, countPromise ]);
  const pages = Math.ceil(count / limit);
  if(!projects.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/studies/page/${pages}`);
    return;
  }
  res.render('studies', {projects, page, pages, count, study});
};

exports.showProjectDescription = async(req, res) => {
  const project = await Project
    .findOne({
      name: req.params.study,
      currentlyActive: true,
    },{
      name: 1, description: 1, currentlyActive: 1, tests: 1, creator: 1, created: 1,
    }
  );
  let author;
  if(project){
    author = await User.findOne({_id: project.creator},{
      name: 1, institute: 1
    });
  }
  let tests;
  if(project){
    tests = await Test
      .find({
        _id: { $in: project.tests},
        author: { $exists: true },
        open: true
      })
      .select({author: 1, slug: 1, name: 1, description: 1, photo: 1})
  }
  res.render('study', {project, tests, author});
};

exports.manageNotifications = async(req,res) => {
  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });
  res.render('notifications', {project});
};

exports.debugprojects = async(req,res) => {
  const projects = await Project.debugProjects();
  res.render('debugprojects', {projects: projects});
};
