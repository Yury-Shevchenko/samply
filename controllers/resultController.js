const mongoose = require('mongoose');
const papaparse = require('papaparse');
const fs = require('fs');
const stream = require('stream');
const flatMap = require('flatmap');
const Result = mongoose.model('Result');
const User = mongoose.model('User');
const Project = mongoose.model('Project');

//save results during the task
exports.saveIncrementalResults = async (req, res) => {
  const result = new Result({
    author: req.body.author,
    project: req.body.project,
    samplyid: req.body.samplyid,
    name: req.body.name,
    data: req.body.data,
    usertimestamp: req.body.timestamp,
    useragent: req.headers['user-agent'],
    appVersion: req.body.appVersion,
  });
  await result.save();
  res.send('Saved');
};

//show the history of sent notifications
exports.showHistory = async (req, res) => {
  const participant = parseInt(req.query.id) || {$exists: true};
  const page = req.params.page || 1;
  const limit = 20;
  const skip = (page * limit) - limit;
  const historyPromise = Result
    .find({ project: req.user.project, samplyid: participant })
    .skip(skip)
    .limit(limit);
  const countPromise = Result.where({ project: req.user.project, samplyid: participant }).countDocuments();
  const [history, count] = await Promise.all([ historyPromise, countPromise ]);
  const pages = Math.ceil(count / limit);
  if(!history.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/history/page/${pages}${typeof(participant) === 'number' ? '?id=' + participant : ''}`);
    return;
  }
  res.render('history', {history, page, pages, count, skip, participant});
};

// delete a record of notification
exports.removeRecordById = async(req, res) => {
  const record = await Result.findOne({_id: req.params.id});
  record.remove((recordErr, removedRecord) => {
    req.flash('success', `The record is deleted`);
    res.redirect('back');
  });
}

exports.getData = async (req, res) => {
  const activeProjectPromise = Project.findOne({_id: req.user.project._id},{
    invitations: 1, showCompletionCode: 1,
  });
  const page = parseInt(req.params.page) || 1;
  const limit = 50;
  const skip = (page * limit) - limit;
  const usersPromise = User
    .getUsersOfProject(req.user.project._id)
    .sort( {created: 'asc'} )
    .skip(skip)
    .limit(limit);
  const countPromise = User.countDocuments({$or: [{participantInProject: req.user.project._id}, {participant_projects: req.user.project._id}]});
  const [users, count, project] = await Promise.all([ usersPromise, countPromise, activeProjectPromise ]);
  const pages = Math.ceil(count / limit);
  if(!users.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/users/page/${pages}`);
    return;
  }
  res.render('data', {users, page, pages, count, skip, project});
};

exports.getMessages = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 50;
  const skip = (page * limit) - limit;
  const historyPromise = Result
    .find({ project: req.user.participantInProject, name: 'received' })
    .skip(skip)
    .limit(limit)
    .sort({'_id': -1})
  const countPromise = Result.where({ project: req.user.participantInProject, name: 'received' }).countDocuments();
  const [history, count] = await Promise.all([ historyPromise, countPromise ]);
  const pages = Math.ceil(count / limit);
  if(!history.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/history/page/${pages}${typeof(participant) === 'number' ? '?id=' + participant : ''}`);
    return;
  }
  res.render('messages', {history, page, pages, count, skip, limit});
};
