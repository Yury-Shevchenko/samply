const express = require('express');
const router = express.Router();
const {catchErrors} = require('../handlers/errorHandlers');

const appController = require('../controllers/appController');
const userController  = require('../controllers/userController');
const authController  = require('../controllers/authController');
const resultController  = require('../controllers/resultController');
const projectController  = require('../controllers/projectController');
const jobController  = require('../controllers/jobController');
const adminController  = require('../controllers/adminController');
const passport = require('passport');

// app controller
// TODO finish registration for participants at the website (but should be discouraged)
// router.get('/participant', appController.participantPage);
// router.get('/participant/:action', appController.participantPage);

router.get('/researcher', appController.researcherPage);
router.get('/researcher/:action', appController.researcherPage);
router.get('/docs', appController.docs);
router.get('/docs/:page', appController.docs);
router.get('/forgot', appController.forgot);

// auth controller
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
router.get('/logout', authController.logout);

// router.post('/auth/participant/email/sign',
//   passport.authenticate('website-signup-participant', {
//     successRedirect : '/studies',
//     failureRedirect: '/researcher/login',
//     failureFlash : true
//   }));
//
// router.post('/auth/participant/email/login',
//   passport.authenticate('website-login', {
//     successRedirect : '/studies',
//     failureRedirect: '/researcher/login',
//     failureFlash : true
//   }));

router.post('/auth/researcher/email/register',
  passport.authenticate('website-signup-researcher', {
    successRedirect : '/projects',
    failureRedirect: '/researcher/register',
    failureFlash : true
  }));

router.post('/auth/researcher/email/login',
  passport.authenticate('website-login', {
    successRedirect : '/',
    failureRedirect: '/',
    failureFlash : true
  }));

// email confirmation
router.post('/account/confirm', catchErrors(authController.sendEmailConfirmationLink));
router.get('/account/confirm/:token', catchErrors(authController.confirmEmail));

// user controller
router.get('/account', authController.isLoggedIn, catchErrors(userController.account));
router.post('/account', catchErrors(userController.updateWebsiteAccount));
router.get('/removeuser/:id', authController.isAdminLoggedIn, catchErrors(jobController.removeUser));
router.get('/languages/:language', userController.changeLanguage);
router.post('/faq', authController.isLoggedIn, catchErrors(userController.sendQuestion));
router.get('/help', authController.isLoggedIn, catchErrors(userController.help));
router.get('/messages', authController.isLoggedIn, catchErrors(resultController.getMessages));
router.get('/messages/page/:page', authController.isLoggedIn, catchErrors(resultController.getMessages));

// project controller
router.get('/', catchErrors(projectController.welcomePage));
router.get('/participants', catchErrors(projectController.welcomePage));
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

router.get('/projects/approveproject/:id', authController.isAdminLoggedIn, catchErrors(projectController.approveProject));
router.post('/projects/approveproject/:id', authController.isAdminLoggedIn, catchErrors(projectController.sendApprovalRequest));
router.post('/projects/removefrompublic/:id', authController.isAdminLoggedIn, catchErrors(projectController.removeFromPublic));

router.get('/notifications', authController.isAdminLoggedIn, catchErrors(jobController.manageNotifications));
router.get('/notifications/:id', authController.isAdminLoggedIn, catchErrors(jobController.manageNotifications));
router.post('/users/:project', authController.isAdminLoggedIn, catchErrors(projectController.inviteParticipants));
router.get('/invitations', authController.isAdminLoggedIn, catchErrors(projectController.invitations));

// administrator functions
router.get('/admin/studies', authController.isSuperAdminLoggedIn, catchErrors(adminController.getAllStudies));
router.get('/admin/removestudy/:id', authController.isSuperAdminLoggedIn, catchErrors(adminController.removeStudy));
router.get('/admin/togglestudystatus/:id', authController.isSuperAdminLoggedIn, catchErrors(adminController.toggleStudyStatus));
router.get('/admin/users', authController.isSuperAdminLoggedIn, catchErrors(adminController.getAllUsers));
router.get('/admin/removeuser/:id', authController.isSuperAdminLoggedIn, catchErrors(adminController.removeUser));

router.get('/users', authController.isAdminLoggedIn, catchErrors(projectController.getMobileUsers));

// results controller
router.post('/save', catchErrors(resultController.saveIncrementalResults));
router.get('/history', authController.isLoggedIn, catchErrors(resultController.showHistory));
router.get('/history/page/:page', authController.isLoggedIn, catchErrors(resultController.showHistory));
router.get('/removerecord/:id', authController.isAdminLoggedIn, catchErrors(resultController.removeRecordById));
router.get('/users/page/:page', authController.isAdminLoggedIn, catchErrors(resultController.getData));
router.get('/downloadhistory/:id', authController.isLoggedIn, catchErrors(resultController.downloadHistory));

// job controller (notifications)
router.post('/createschedulenotification', authController.isAdminLoggedIn, catchErrors(jobController.createScheduleNotification));
router.post('/createintervalnotification', authController.isAdminLoggedIn, catchErrors(jobController.createIntervalNotification));
router.post('/createindividualnotification', authController.isAdminLoggedIn, catchErrors(jobController.createIndividualNotification));
router.post('/deleteprojectnotifications', authController.isAdminLoggedIn, catchErrors(jobController.deleteProjectNotifications));
router.get('/removenotification/:id', authController.isAdminLoggedIn, catchErrors(jobController.removeNotificationByID));
router.post('/createfixedindividualnotification', authController.isAdminLoggedIn, catchErrors(jobController.createFixedIndividualNotification));

// admin routes
router.get('/debug', authController.isSuperAdminLoggedIn, catchErrors(jobController.debug));
router.post('/scheduleadminjob', authController.isAdminLoggedIn, catchErrors(jobController.scheduleAdminJob));

// api routes
router.get('/api/studies', projectController.getPublicStudiesAPI);
// router.get('/api/study/:name', projectController.getPublicStudy);
router.get('/api/study/:id', projectController.getPublicStudy);
router.post('/api/join/:id', jobController.joinStudy);
router.post('/api/leave/:id', jobController.leaveStudy);
router.post('/api/createaccount', userController.createMobileAccount);
router.post('/api/login', userController.loginMobileAccount);
router.post('/api/mystudies', userController.getMyStudies);
router.post('/api/updateaccount', userController.updateAccount);
router.post('/api/updatestatus', resultController.updateStatus);
router.post('/api/history', resultController.getHistory);
router.post('/api/reset', userController.resetPassword);
router.post('/api/update', jobController.updateTokenInStudy);
router.post('/api/updatelocation', resultController.updateGeolocation);

module.exports = router;
