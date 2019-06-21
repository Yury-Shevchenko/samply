const mongoose = require('mongoose');
const Project = mongoose.model('Project');

const uniqid = require('uniqid');

exports.createNotification = async (req, res) => {

  // check whether the request body contains required information
  if(!req.body || !req.body.target || !req.body.schedule || !req.body.randomize){
    console.log("Some information in request is missing");
    return res.status(400).end();
  }

  switch (req.body.target){
    case 'all-users':
    default:
      await createAllUsersNotification(req.body);
      res.status(201);
      break;
    case 'user-specific':
      createUserSpecificNotification(req.body);
      res.status(201);
  }

  res.redirect(`back`);
}

// make notification(s) for all users, randomization is done on the user side
const createAllUsersNotification = async (body) => {
  console.log('All users notification', body);

  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });

  await body.date.map(date => {
    const id = uniqid();
    project.notifications.push({
      id: id,
      target: body.target,
      schedule: body.schedule,
      randomize: body.randomize,
      date: date,
      title: body.title,
      message: body.message,
      url: req.body.url,
    });
  });
  await project.save((saveErr, updatedproject) => {
    if (saveErr) {
      res.status(400);
    } else {
      res.status(201);
    }
    res.redirect(`back`);
  });

}

const createUserSpecificNotification = (body) => {
  console.log('User specific notification', body);

}
