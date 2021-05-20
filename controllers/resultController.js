const mongoose = require('mongoose');
const papaparse = require('papaparse');
const fs = require('fs');
const stream = require('stream');
const flatMap = require('flatmap');
const Result = mongoose.model('Result');
const User = mongoose.model('User');
const Project = mongoose.model('Project');

// update status
exports.updateStatus = async (req, res) => {
  const { messageId, status } = req.body;
  const updatedResult = await Result.findOneAndUpdate({ messageId: messageId },
      { ['$addToSet'] : {
        events: { status: req.body.status, created: Date.now() }
      } },
      { upsert: true, new : true });
  if(updatedResult){
    res.status(200).json({message: 'OK'});
  }
};

// update status
exports.updateGeolocation = async (req, res) => {
  const result = new Result({
    project: req.body.studyId,
    samplyid: req.body.userToken,
    messageId: req.body.messageId,
    data: {
      title: req.body.title,
      message: req.body.message,
      url: req.body.link,
    },
    events: [{ status: 'geofencing-event', created: Date.now(), data: req.body.curLocation }],
  });
  console.log('result', result);
  await result.save();
  res.status(200).json({message: 'OK'});
};

//show the history of sent notifications
exports.showHistory = async (req, res) => {
  if(req.user && req.user.project && req.user.project.name){
    const participant = req.query.id || {$exists: true};
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
    res.render('history', { history, page, pages, count, skip, participant, study: true });
  } else {
    res.render('history', { study: false });
  }
};

exports.getHistory = async (req, res) => {
  const { samplyid } = req.body
  const notifications = await Result.find({ samplyid });
  const filtered = notifications.filter(e => !e.events.map(e => e.status).includes("archived"));
  res.send(filtered);
}

//save results during the task
exports.saveIncrementalResults = async (req, res) => {
  const result = new Result({
    author: req.body.author,
    project: req.body.project,
    samplyid: req.body.samplyid,
    name: req.body.name,
    data: req.body.data,
    usertimestamp: req.body.timestamp,
    appVersion: req.body.appVersion,
  });
  await result.save();
  res.send('Saved');
};

// delete a record of notification
exports.removeRecordById = async(req, res) => {
  const record = await Result.findOne({_id: req.params.id});
  record.remove((recordErr, removedRecord) => {
    req.flash('success', `The record is deleted`);
    res.redirect('back');
  });
}

exports.getData_old = async (req, res) => {
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
    .find({ samplyid: req.user.samplyId })
    .skip(skip)
    .limit(limit)
  const countPromise = Result.where({ samplyid: req.user.samplyId }).countDocuments();
  const [history, count] = await Promise.all([ historyPromise, countPromise ]);
  const pages = Math.ceil(count / limit);
  if(!history.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/messages/page/${pages}${typeof(participant) === 'number' ? '?id=' + participant : ''}`);
    return;
  }
  res.render('messages', {history, page, pages, count, skip, limit});
};

// download history log for the project
exports.downloadHistory = async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findOne({ _id: projectId });
  confirmOwnerOrMember(project, req.user);
  let keys = [];
  const name = req.user.project.name;
  res.setHeader('Content-disposition', 'attachment; filename=' + name +'.csv');
  const input = new stream.Readable({ objectMode: true });
  input._read = () => {};
  var cursor = await Result
    .find({project: projectId},{})
    .cursor()
    .on('data', obj => {
      if(obj && obj.data){
        let data = {};
        const coordinates = obj.events.filter(e => e.status === 'arrived').map(e => {
          if(e.data && e.data.coords){
            return(e.data.coords)
          }
        });
        if (coordinates && coordinates[0]){
          data = coordinates[0]
        }
        const line =[{
          samplyid: obj.samplyid,
          title: obj.data.title,
          message: obj.data.message,
          url: obj.data.url,
          sent: obj.events.filter(e => e.status === 'sent').map(e => e.created.getTime()),
          tapped: obj.events.filter(e => e.status === 'tapped').map(e => e.created.getTime()),
          opened_in_spp: obj.events.filter(e => e.status === 'opened-in-app').map(e => e.created.getTime()),
          archived_by_user: obj.events.filter(e => e.status === 'archived').map(e => e.created.getTime()),
          arrived: obj.events.filter(e => e.status === 'arrived').map(e => e.created.getTime()),
          messageId: obj.messageId,
          ...data
        }]
        const preKeys = flatMap(line, function(e){
          return(Object.keys(e));
        });
        const tempkeys = Array.from(new Set(preKeys));
        const new_items = tempkeys.filter(x => !keys.includes(x));
        let parsed;
        if (new_items.length > 0){
          keys = keys.concat(new_items);
          parsed = papaparse.unparse({data: line, fields: keys}) + '\r\n';
        } else {
          const preparsed = papaparse.unparse({data: line, fields: keys}) + '\r\n';
          parsed = preparsed.replace(/(.*\r\n)/,'');
        };
        input.push(parsed);
      }
    })
    .on('end', function() { input.push(null) })
    .on('error', function(err) { console.log(err) });
  const processor = input.pipe(res);
};

const confirmOwner = (project, user) => {
  const isCreator = project.creator.equals(user._id);
  const isAdministrator = user.level > 100;
  if(!isCreator && !isAdministrator){
    throw Error('You must be a creator a project in order to do it!');
  }
};

const confirmOwnerOrMember = (project, user) => {
  const isCreator = project.creator.equals(user._id);
  const isMember = project.members.map(id => id.toString()).includes(user._id.toString());
  const isParticipant = user.level <= 10;
  if(!(isCreator || isMember) || isParticipant){
    throw Error('You must be a creator or a member of a project in order to do it!');
  }
};
