const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Result = mongoose.model('Result');
const User = mongoose.model('User');

exports.getAllStudies = async(req, res) => {
  const projects = await Project.debugProjects();
  res.render('admin/studies', {projects: projects});
};

exports.removeStudy = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  const resultsCount = await Result.where({ project: req.params.id }).countDocuments();
  if (resultsCount > 0) {
    const deletedResultsPromise = Result.deleteMany({ project: req.params.id });
    const projectRemovePromise = project.remove();
    await Promise.all([deletedResultsPromise, projectRemovePromise])
    req.flash('success', `${res.locals.layout.flash_project_deleted}`);
    res.redirect('/admin/studies');
  } else {
    project.remove((projectErr, removedProject) => {
      req.flash('success', `${res.locals.layout.flash_project_deleted}`);
      res.redirect('/admin/studies');
    });
  }
};

exports.toggleStudyStatus = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id }, { public: 1 });
  project.public = !project.public;
  await project.save();
  req.flash('success', `Status updated`);
  res.redirect('back');
};

exports.getAllUsers = async(req, res) => {
  const users = await User.find();
  res.render('admin/users', { users });
};

exports.removeUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const resultsCount = await Result.where({ samplyid: user.samplyId }).countDocuments();
  if (resultsCount > 0) {
    const deletedResultsPromise = Result.deleteMany({ user: req.params.id });
    const userRemovePromise = user.remove();
    await Promise.all([deletedResultsPromise, userRemovePromise])
    req.flash('success', `${res.locals.layout.flash_user_deleted}, ${resultsCount} history results were deleted.`);
    res.redirect('/admin/users');
  } else {
    user.remove((userErr, removedProject) => {
      req.flash('success', `${res.locals.layout.flash_user_deleted}`);
      res.redirect('/admin/users');
    });
  }
};
