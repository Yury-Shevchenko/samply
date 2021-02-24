const mongoose = require('mongoose');
const User = mongoose.model('User');
const Result = mongoose.model('Result');
const Project = mongoose.model('Project');
const uniqid = require('uniqid');
const mail = require('../handlers/mail');

exports.welcomePage = async(req, res) => {
  res.render('index');
}

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
      slug: req.params.study,
      currentlyActive: true,
    },{
      name: 1, description: 1, currentlyActive: 1, tests: 1, creator: 1, created: 1, slug: 1,
    }
  );
  let author;
  if(project){
    author = await User.findOne({_id: project.creator},{
      name: 1, institute: 1
    });
    res.render('study', { project, author });
  } else {
    res.redirect('back');
  }
};

exports.activateParticipantProject = async (req, res) => {
  const activeProject = await Project.findOne({_id: req.params.id});
  const updatedUser = await User.findOneAndUpdate({
    _id: req.user._id
  }, { participantInProject: activeProject._id }, {
    new: true,
    upsert: true
  }).exec();
  res.redirect('/testing');
};

// show user projects
exports.getUserProjects = async (req, res) => {
  const projects = await Project.find({creator: req.user._id}, {
    name: 1, description: 1, members: 1, tests: 1, currentlyActive: 1, creator: 1, slug: 1,
  });
  const invitedprojects = await Project.find({members: req.user._id}, {
    name: 1, description: 1, members: 1, tests: 1, currentlyActive: 1, creator: 1, slug: 1,
  });
  res.render('projects', { projects, invitedprojects });
};

exports.activateProject = async (req, res) => {
  const activeProject = await Project.findOne({_id: req.params.id});
  confirmOwnerOrMember(activeProject, req.user);
  const updatedUser = await User.findOneAndUpdate({
    _id: req.user._id
  }, { project: activeProject }, {
    new: true,
    upsert: true
  }).exec();
  req.flash('success', `${activeProject.name} ${res.locals.layout.flash_activate_project}`);
  res.redirect('back');
};

const confirmOwnerOrMember = (project, user) => {
  const isCreator = project.creator.equals(user._id);
  const isMember = project.members.map(id => id.toString()).includes(user._id.toString());
  const isParticipant = user.level <= 10;
  if(!(isCreator || isMember) || isParticipant){
    throw Error('You must be a creator or a member of a project in order to do it!');
  }
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
      const locationSlugs = Object.keys(req.body).filter(key => key.startsWith('slug')).map(key => key.substring(5));
      const locations = locationSlugs.map(slug => {
        return (
          {
            slug: slug,
            title: req.body[`title-${slug}`],
            latitude: parseFloat(req.body[`latitude-${slug}`]),
            longitude: parseFloat(req.body[`longitude-${slug}`]),
            radius: parseFloat(req.body[`radius-${slug}`])
          }
        )
      })
      const project = await (new Project(
        {
          name: req.body.name,
          image: req.body.image,
          description: req.body.description,
          welcomeMessage: req.body.welcomeMessage,
          codeMessage: req.body.codeMessage,
          geofencingInstruction: req.body.geofencingInstruction,
          creator: req.user._id,
          members: membersData,
          currentlyActive: req.body.currentlyActive,
          settings: {
            askParticipantCode: req.body.askParticipantCode && req.body.askParticipantCode === 'on',
            enableGeofencing: req.body.enableGeofencing && req.body.enableGeofencing === 'on',
            geofencing: {
              locations: locations,
              link: req.body.geofencingURL,
              radius: req.body.userLocationRadius,
            }
          }
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
    project.image = req.body.image;
    project.description = req.body.description;
    project.welcomeMessage = req.body.welcomeMessage;
    project.codeMessage = req.body.codeMessage;
    project.geofencingInstruction = req.body.geofencingInstruction;
    project.members = membersData;
    if(!project.settings) project.settings = {};

    const locationSlugs = Object.keys(req.body).filter(key => key.startsWith('slug')).map(key => key.substring(5));
    const locations = locationSlugs.map(slug => {
      return (
        {
          slug: slug,
          title: req.body[`title-${slug}`],
          latitude: parseFloat(req.body[`latitude-${slug}`]),
          longitude: parseFloat(req.body[`longitude-${slug}`]),
          radius: parseFloat(req.body[`radius-${slug}`])
        }
      )
    })

    project.settings = {
      askParticipantCode: req.body.askParticipantCode && req.body.askParticipantCode === 'on' ? true : false,
      enableGeofencing: req.body.enableGeofencing && req.body.enableGeofencing === 'on' ? true : false,
      geofencing: {
        locations: locations,
        link: req.body.geofencingURL,
        radius: req.body.userLocationRadius,
      }
    }

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
  res.render('editProject', { project, membersEmails });
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
    res.render('deleteProjectForm', { project, resultsCount });
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
  const participantsNumber = project.participants.length;
  if (project){
    project.currentlyActive = !project.currentlyActive;
    await project.save();
    req.flash('success', `${req.params.action == 'on'? res.locals.layout.flash_program_open : res.locals.layout.flash_program_closed}`);
    res.redirect('/projects');
  } else {
    req.flash('error', `${res.locals.layout.flash_limit_of_participants_reached_1} ${project.name} ${res.locals.layout.flash_limit_of_participants_reached_2}`);
    res.redirect('back');
  }
};

exports.inviteParticipants = async (req, res) => {
  let emails = [];
  if(req.body.invitationsList){
    const emailsRaw = req.body.invitationsList.replace(/ /g, '').split(/\r\n|,|;/);
    if(emailsRaw){
      emails = emails.concat(emailsRaw.filter(e => e && e != null && e != ''));
    }
  };
  const project = await Project.findOne( { name: req.params.project });
  let sentEmails = [];
  if (project && project.invitations && project.invitations.length > 0){
    sentEmails = project.invitations.filter(e => typeof(e) != 'undefined' && e != null &&  e.email != null).map(e => e.email);
  }
  const newInvitationEmails = emails.filter(e => e !=null && e != '' && sentEmails.indexOf(e) == -1);
  if ( sentEmails.length > 100 ){
    req.flash('error', `${res.locals.layout.flash_invitation_overlimit}`);
    res.redirect('back');
    return;
  }
  let sentInvitations;
  const subject = res.locals.layout.flash_invitation;
  try {
    sentInvitations = await Promise.all(newInvitationEmails.map(async (email) => {
      if(email && email != null){
        const token = uniqid();
        const participant = {
          email: email,
          project: project.name
        };
        const singupURL = `https://${req.headers.host}/code/${req.params.project}/${token}`;
        await mail.send({
          participant,
          subject,
          singupURL,
          filename: 'invitation-' + req.user.language
        });
        return ({email: email, token: token})
      }
    }));
  } catch(err) {
    req.flash('error', err.message);
    res.redirect('back');
    return;
  };
  if(sentInvitations && sentInvitations != null){
    project.invitations = project.invitations.concat(sentInvitations);
  }
  await project.save();
  req.flash('success', `${res.locals.layout.flash_invited}`);
  res.redirect(`back`);
};

exports.invitations = async (req, res) => {
  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, invitations: 1, slug: 1,
  });
  res.render('invitations', {project});
};

exports.getPublicStudiesAPI = async(req, res) => {
  const studies = await Project.findAllPublic();
  res.send(studies);
}

exports.getPublicStudy = async(req, res) => {
  const study = await Project.findOne({ slug: req.params.name }, { name: 1, description: 1, welcomeMessage: 1, codeMessage: 1, geofencingInstruction: 1, settings: 1 });
  res.send(study);
}

exports.getMobileUsers = async (req, res) => {
  const project = await Project.findOne({_id: req.user.project._id},{
    mobileUsers: 1,
  });
  const users = await Promise.all(project.mobileUsers.map(async user => {
    const participant = await User.findOne({ samplyId: user.id }, { information: 1 })
    if(participant && participant.information && participant.information.timeWindow ) {
      const startTime = `${new Date(participant.information.timeWindow.startTime).getHours()}:${new Date(participant.information.timeWindow.startTime).getMinutes()}`;
      const endTime = `${new Date(participant.information.timeWindow.endTime).getHours()}:${new Date(participant.information.timeWindow.endTime).getMinutes()}`;
      user.information = {...user.information, from: startTime, to: endTime};
    }
    return user;
  }))
  res.render('data', { project, users });
};
