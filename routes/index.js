const express = require('express');
const router = express.Router();
const {catchErrors} = require('../handlers/errorHandlers');

const appController = require('../controllers/appController');
const userController  = require('../controllers/userController');
const authController  = require('../controllers/authController');
const resultController  = require('../controllers/resultController');
const projectController  = require('../controllers/projectController');
const jobController  = require('../controllers/jobController');
const passport = require('passport');

// app controller
router.get('/researcher', appController.researcherPage);
router.get('/researcher/:action', appController.researcherPage);
router.get('/participant', appController.participantPage);
router.get('/participant/:action', appController.participantPage);
router.get('/docs', appController.docs);
router.get('/docs/:page', appController.docs);
router.get('/forgot', appController.forgot)
router.get('/testing', authController.isLoggedIn, catchErrors(appController.testing));

// auth controller
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
router.get('/logout', authController.logout);

// authentification
router.get('/code', userController.code);
router.get('/code/:project', userController.code);
router.get('/code/:project/:code', userController.code);
router.get('/sign/:project', userController.sign);
router.get('/sign/:project/:code', userController.sign);

router.post('/auth/code', passport.authenticate('local-code', {
  successRedirect : '/testing',
  failureRedirect: '/code',
  failureFlash : true
}))

router.post('/auth/participant/email/sign',
  passport.authenticate('local-signup-participant', {
    successRedirect : '/testing',
    failureRedirect: '/participant/register',
    failureFlash : true
  }));

router.post('/auth/researcher/email/register',
  passport.authenticate('local-signup-researcher', {
    successRedirect : '/projects',
    failureRedirect: '/researcher/register',
    failureFlash : true
  }));

router.post('/auth/participant/email/login',
  passport.authenticate('local-login', {
    successRedirect : '/testing',
    failureRedirect: '/participant/login',
    failureFlash : true
  }));

router.post('/auth/researcher/email/login',
  passport.authenticate('local-login', {
    successRedirect : '/projects',
    failureRedirect: '/researcher/login',
    failureFlash : true
  }));

// user controller
router.get('/account', authController.isLoggedIn, catchErrors(userController.account));
router.post('/account', catchErrors(userController.updateAccount));
router.get('/removeuser/:id/:identity', authController.isAdminLoggedIn, catchErrors(userController.removeUser));
router.get('/languages/:language', userController.changeLanguage);
router.post('/faq', authController.isLoggedIn, catchErrors(userController.sendQuestion));
router.get('/help', authController.isLoggedIn, catchErrors(userController.help));
router.get('/messages', authController.isLoggedIn, catchErrors(resultController.getMessages));

// project controller
router.get('/', catchErrors(projectController.listPublicProjects));
router.get('/studies', catchErrors(projectController.listPublicProjects));
router.get('/studies/page/:page', catchErrors(projectController.listPublicProjects));
router.get('/studies/:study', catchErrors(projectController.showProjectDescription));
router.get('/participantprojects/:id', authController.isLoggedIn, catchErrors(projectController.activateParticipantProject));

router.get('/projects', authController.isAdminLoggedIn, catchErrors(projectController.getUserProjects));
router.get('/projects/:id', authController.isAdminLoggedIn, catchErrors(projectController.activateProject));
router.post('/projects', authController.isAdminLoggedIn, catchErrors(projectController.createProject));
router.post('/projects/:id', authController.isAdminLoggedIn, catchErrors(projectController.updateProject));
router.get('/projects/:id/edit', authController.isAdminLoggedIn, catchErrors(projectController.editProject));
router.get('/projects/deleteproject/:id', authController.isAdminLoggedIn, catchErrors(projectController.trydeleteProject));
router.post('/projects/removeproject/:id', authController.isAdminLoggedIn, catchErrors(projectController.removeProject));
router.get('/changestatusofproject/:id/:action', authController.isAdminLoggedIn, catchErrors(projectController.changeStatusProject));

router.get('/notifications', authController.isAdminLoggedIn, catchErrors(projectController.manageNotifications));
router.get('/notifications/:id', authController.isAdminLoggedIn, catchErrors(projectController.manageNotifications));
router.post('/users/:project', authController.isAdminLoggedIn, catchErrors(projectController.inviteParticipants));
router.get('/invitations', authController.isAdminLoggedIn, catchErrors(projectController.invitations));
router.get('/debugprojects',
  authController.isSuperAdminLoggedIn,
  catchErrors(projectController.debugprojects));

// results controller
router.post('/save', catchErrors(resultController.saveIncrementalResults));
router.get('/history', authController.isLoggedIn, catchErrors(resultController.showHistory));
router.get('/history/page/:page', authController.isLoggedIn, catchErrors(resultController.showHistory));
router.get('/removerecord/:id', authController.isAdminLoggedIn, catchErrors(resultController.removeRecordById));
router.get('/users', authController.isAdminLoggedIn, catchErrors(resultController.getData));
router.get('/users/page/:page', authController.isAdminLoggedIn, catchErrors(resultController.getData));

// job controller (notifications)
router.post('/subscribeforstudy', authController.isLoggedIn, catchErrors(jobController.subscribeforstudy));
router.post('/unsubscribefromstudy', authController.isLoggedIn, catchErrors(jobController.unsubscribefromstudy));
router.post('/registernotification',
  authController.isLoggedIn,
  catchErrors(jobController.registerPushNotification),
  catchErrors(jobController.subscribeforstudy)
);
router.post('/unregisternotification', authController.isLoggedIn, catchErrors(jobController.unregisterPushNotification));

router.post('/createschedulenotification', authController.isAdminLoggedIn, catchErrors(jobController.createScheduleNotification));
router.post('/createintervalnotification', authController.isAdminLoggedIn, catchErrors(jobController.createIntervalNotification));
router.post('/createindividualnotification', authController.isAdminLoggedIn, catchErrors(jobController.createIndividualNotification));
router.post('/deleteprojectnotifications', authController.isAdminLoggedIn, catchErrors(jobController.deleteProjectNotifications));
router.get('/removenotification/:id', authController.isAdminLoggedIn, catchErrors(jobController.removeNotificationByID));


module.exports = router;
