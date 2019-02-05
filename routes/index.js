const express = require('express');
const router = express.Router();
const {catchErrors} = require('../handlers/errorHandlers');
const userController  = require('../controllers/userController');
const authController  = require('../controllers/authController');
const testController = require('../controllers/testController');
const resultController  = require('../controllers/resultController');
const paramController  = require('../controllers/paramController');
const projectController  = require('../controllers/projectController');
const jobController  = require('../controllers/jobController');
const passport = require('passport');
var cors = require('cors');
  
//home page
router.get('/', testController.homePage);
router.get('/about', testController.aboutPage);
router.get('/researcher', testController.researcherPage);
router.get('/researcher/:action', testController.researcherPage);
router.get('/participant', testController.participantPage);
router.get('/participant/:action', testController.participantPage);

//authentification strategies
// for participants with a participant code
router.get('/code', userController.code);
router.get('/code/:project', userController.code);
router.get('/code/:project/:code', userController.code);
//with a participant email
router.get('/sign/:project', userController.sign);
router.get('/sign/:project/:code', userController.sign);

//authentification strategies
router.post('/auth/code', passport.authenticate('local-code', {
  successRedirect : '/testing',
  failureRedirect: '/code',
  failureFlash : true
}))

//signing up
router.post('/auth/participant/email/sign',
  passport.authenticate('local-signup-participant', {
    successRedirect : '/studies',
    failureRedirect: '/participant/register',
    failureFlash : true
  }));

router.post('/auth/researcher/email/register',
  passport.authenticate('local-signup-researcher', {
    successRedirect : '/projects',
    failureRedirect: '/researcher/register',
    failureFlash : true
  }));

//login in
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

router.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
  }));
router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/studies',
            failureRedirect : '/login'
  }));

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/studies',
            failureRedirect : '/login'
  }));

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
        passport.authenticate('github', {
            successRedirect : '/studies',
            failureRedirect : '/login'
  }));

//account
router.get('/account', authController.isLoggedIn, catchErrors(userController.account));
router.post('/account', catchErrors(userController.updateAccount));
router.get('/forgot', testController.forgot)
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
//logout
router.get('/logout', authController.logout);

//for researchers list users with their results
router.get('/users', authController.isAdminLoggedIn, catchErrors(userController.getData));
router.get('/users/page/:page', authController.isAdminLoggedIn, catchErrors(userController.getData));
router.get('/users/:id/:participant', authController.isAdminLoggedIn, catchErrors(userController.getOneUserData));
router.post('/users/:project', authController.isAdminLoggedIn, catchErrors(userController.inviteParticipants));
router.get('/data', authController.isLoggedIn, catchErrors(resultController.showDataByTests));
router.get('/data/:slug', authController.isLoggedIn, catchErrors(resultController.showDataByTests));

//invitations
router.get('/invitations', authController.isAdminLoggedIn, catchErrors(userController.invitations));

//for main administrator
router.get('/researchers',
  authController.isSuperAdminLoggedIn,
  catchErrors(userController.getResearchers));//see researchers
router.get('/researchers/page/:page', authController.isSuperAdminLoggedIn, catchErrors(userController.getResearchers));//pagination
router.get('/removeuser/:id/:identity', authController.isAdminLoggedIn, catchErrors(userController.removeUser));//remove a user
router.get('/showalltasks',
  authController.isSuperAdminLoggedIn,
  catchErrors(testController.showAllTasksForAdmin));

//TEST controllers
//for researchers
router.get('/docs', testController.docs);
router.get('/docs/:page', testController.docs);
router.get('/tests/add',
  authController.isAdminLoggedIn,
  testController.addTest
);

router.post('/add',
  testController.upload,
  catchErrors(testController.resize),
  catchErrors(testController.createTest),
  testController.transfer
);

router.post('/add/:id',
  testController.upload,
  authController.checkResearcherLogin,
  catchErrors(testController.resize),
  catchErrors(testController.updateTest),
  testController.transfer
);

router.get('/tests/all', authController.isAdminLoggedIn, catchErrors(testController.getAllTests));
router.get('/tests/all/:tag', authController.isAdminLoggedIn, catchErrors(testController.getAllTests));
router.get('/tests/all/page/:page', authController.isAdminLoggedIn, catchErrors(testController.getAllTests));
router.get('/tests/all/:tag/page/:page', authController.isAdminLoggedIn, catchErrors(testController.getAllTests));

router.get('/tests/my', authController.isAdminLoggedIn, catchErrors(testController.getMyTests));
router.get('/tests/my/page/:page', authController.isAdminLoggedIn, catchErrors(testController.getMyTests));

router.get('/tests/:id/edit', authController.isAdminLoggedIn, catchErrors(testController.editTest));
router.get('/tests/:id/deleterequest', authController.isAdminLoggedIn, catchErrors(testController.tryRemoveTest));//remove test
router.post('/tests/:id/remove', authController.isAdminLoggedIn, catchErrors(testController.removeTest));//remove test
router.get('/tests/:id/json', authController.isAdminLoggedIn, catchErrors(testController.downloadJSON));
//see the test in on a full screen
router.get('/tests/test/:slug', catchErrors(testController.getTestBySlug));

//cors options
var whitelist = ['https://labjs-beta.netlify.com', 'https://labjs.felixhenninger.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//open test in lab js
router.get('/labjs/:id',
  cors(corsOptions),
  catchErrors(testController.openJSONinLabJS)
);

//landing page for import of lab-js script
router.post('/tests/labjs',
  cors(corsOptions),
  userController.uploadfromlabjs,
  catchErrors(userController.labjs)
);

router.get('/tests/labjs/:token/edit',
  catchErrors(userController.editlabjsupload));

//test constructor
router.get('/constructor', authController.isAdminLoggedIn, catchErrors(testController.constructor));
router.get('/constructor/:tag', authController.isAdminLoggedIn, catchErrors(testController.constructor));
//add test to the test battery
router.post('/api/tests/:id/add', catchErrors(testController.featureTest));
//search test api
router.get('/api/search', catchErrors(testController.searchTests));

//battery of tests - see chosen tests, their results, original and modified parameters
router.get('/tasks', authController.isAdminLoggedIn, catchErrors(testController.getProgramTests));
//router.get('/tasks/:task/ :slug', authController.isAdminLoggedIn, catchErrors(testController.getAddedTests));
router.get('/tasks/:slug', authController.isAdminLoggedIn, catchErrors(testController.getProgramTests));
router.get('/tasks/:slug/:selector', authController.isAdminLoggedIn, catchErrors(testController.getProgramTests));
router.get('/tasks/:slug/:selector/:lang', authController.isAdminLoggedIn, catchErrors(testController.getProgramTests));

//for participants
router.get('/testing', authController.isLoggedIn, catchErrors(testController.testing));
//individual session of a particular user with a particular task
router.get('/test/:slug/:id', authController.isLoggedIn, catchErrors(testController.runTest));
router.get('/test/:slug/:id/:lang', authController.isLoggedIn, catchErrors(testController.runTest));

//PARAMETERS controller
router.post('/tasks/:task/:slug/:lang', authController.isLoggedIn, catchErrors(paramController.postParameters)); //change parameters of the task
router.get('/parameters/delete/:id', authController.isLoggedIn, catchErrors(paramController.deleteParameters));

//RESULTS controller
//For researcher
router.get('/results', authController.isLoggedIn, catchErrors(resultController.showMyResults));
//download all results of one user
router.get('/alldata/:id/:identity', authController.isLoggedIn, catchErrors(resultController.downloadResultsUser));
router.get('/allmetadata/:id/:identity', authController.isLoggedIn, catchErrors(resultController.downloadMetadataUser));
//download results for particular test and user
router.get('/database/:slug/:id/:filename', authController.isLoggedIn, catchErrors(resultController.downloadResultTestUser));
//get all data from the project
router.get('/downloadprojectdata', authController.isAdminLoggedIn, catchErrors(resultController.downloadprojectdata));
router.get('/downloadprojectmetadata', authController.isAdminLoggedIn, catchErrors(resultController.downloadprojectmetadata));
//download results of particular test in the project
router.get('/downloadtestresults/:name/:test', authController.isAdminLoggedIn, catchErrors(resultController.downloadTestResults));
//delete the data of the task and the user
router.get('/removefromdatabase/:slug/:filename', authController.isAdminLoggedIn, catchErrors(resultController.removeResultsData));
router.get('/deleterequest/:slug/:filename', authController.isLoggedIn, catchErrors(resultController.changeStatusOfDeleteRequest));

//For participant
//post results of the test
router.post('/save', authController.isLoggedIn, catchErrors(resultController.saveIncrementalResults));

//Project controller
router.get('/projects', authController.isAdminLoggedIn, catchErrors(projectController.getUserProjects));
router.get('/projects/:name', authController.isAdminLoggedIn, catchErrors(projectController.activateProject));
router.post('/projects', authController.isAdminLoggedIn, catchErrors(projectController.createProject));
router.post('/projects/:id', authController.isAdminLoggedIn, catchErrors(projectController.updateProject));
//edit the project
router.get('/projects/:id/edit', authController.isAdminLoggedIn, catchErrors(projectController.editProject));
router.get('/projects/deleteproject/:id', authController.isAdminLoggedIn, catchErrors(projectController.trydeleteProject));
router.post('/projects/removeproject/:id', authController.isAdminLoggedIn, catchErrors(projectController.removeProject));
router.get('/changestatusofproject/:id/:action', authController.isAdminLoggedIn, catchErrors(projectController.changeStatusProject));

//Subscription controller
router.get('/subscribe', authController.isAdminLoggedIn, catchErrors(userController.subscribe));
router.get('/subscribe/:plan', authController.isAdminLoggedIn, catchErrors(userController.subscribe));
router.get('/subscribe/:plan/:period', authController.isAdminLoggedIn, catchErrors(userController.subscribe));
router.post('/subscription/cardpayment', authController.isLoggedIn, catchErrors(userController.cardpayment));
router.post('/subscription/cancel', authController.isLoggedIn, catchErrors(userController.cancelsubscription));
router.post('/subscription/reactivate', authController.isLoggedIn, catchErrors(userController.reactivatesubscription));

//languages
router.get('/languages/:language', userController.changeLanguage);

//test programming request
router.post('/request', authController.isAdminLoggedIn, catchErrors(userController.sendTestRequest));
//faq
router.post('/faq', authController.isLoggedIn, catchErrors(userController.sendQuestion));

//listing of public tests available for non-registered user
router.get('/listing', catchErrors(testController.listPublicTests));
router.get('/listing/page/:page', catchErrors(testController.listPublicTests));
//listing of public projects
router.get('/studies', catchErrors(projectController.listPublicProjects));
router.get('/studies/page/:page', catchErrors(projectController.listPublicProjects));
router.get('/studies/:study', catchErrors(projectController.showProjectDescription));
//help
router.get('/help', authController.isLoggedIn, catchErrors(userController.help));

//reseacher notifications bar
router.get('/notifications', authController.isAdminLoggedIn, catchErrors(projectController.manageNotifications));
router.post('/createnotification', authController.isAdminLoggedIn, catchErrors(jobController.createNotification));
router.post('/deletenotification', authController.isAdminLoggedIn, catchErrors(jobController.deleteProjectNotifications));
router.get('/removenotification/:id', authController.isAdminLoggedIn, catchErrors(jobController.removeNotificationByID));
router.post('/createnotificationinterval', authController.isAdminLoggedIn, catchErrors(jobController.createInterval));

router.post('/createrelativenotification', authController.isAdminLoggedIn, catchErrors(jobController.createRelativeSchedule));

//user-side notifications
router.post('/registernotification', authController.isLoggedIn, catchErrors(jobController.registerPushNotification));
router.post('/unregisternotification', authController.isLoggedIn, catchErrors(jobController.unsubscribePushNotification));


router.post('/uploadimage', catchErrors(userController.uploadImage));

module.exports = router;
