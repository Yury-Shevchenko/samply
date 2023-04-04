const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandlers");

const appController = require("../controllers/appController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const resultController = require("../controllers/resultController");
const projectController = require("../controllers/projectController");
const jobController = require("../controllers/jobController");
const adminController = require("../controllers/adminController");
const hookController = require("../controllers/hookController");
const paymentController = require("../controllers/paymentController");
const passport = require("passport");

router.get("/researcher", appController.researcherPage);
router.get("/researcher/:action", appController.researcherPage);
router.get("/participant/:action", appController.participantPage);
router.get("/participant/:action/:email", appController.participantPage);
router.get("/docs", appController.docs);
router.get("/docs/:page", appController.docs);
router.get("/news", appController.news);
router.get("/news/:page", appController.news);
router.get("/forgot", appController.forgot);

// auth controller
router.post("/account/forgot", catchErrors(authController.forgot));
router.get("/account/reset/:token", catchErrors(authController.reset));
router.post(
  "/account/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
router.get("/logout", authController.logout);
router.get(
  "/account/delete",
  authController.isLoggedIn,
  catchErrors(authController.requestDeleteAccount)
);
router.post(
  "/account/delete",
  authController.isLoggedIn,
  catchErrors(authController.deleteAccount)
);
router.get(
  "/account/remove",
  catchErrors(authController.requestDeleteParticipantAccount)
);
router.post(
  "/account/remove",
  catchErrors(authController.deleteParticipantAccount)
);

router.post(
  "/auth/researcher/email/register",
  passport.authenticate("website-signup-researcher", {
    successRedirect: "/projects",
    failureRedirect: "/researcher/register",
    failureFlash: true,
  })
);

router.post(
  "/auth/researcher/email/login",
  passport.authenticate("website-login", {
    successRedirect: "/",
    failureRedirect: "/researcher/login",
    failureFlash: true,
  })
);

router.post(
  "/auth/participant/email/login",
  passport.authenticate("website-login", {
    successRedirect: "/account",
    failureRedirect: "/researcher/login",
    failureFlash: true,
  })
);

// email confirmation
router.post(
  "/account/confirm",
  catchErrors(authController.sendEmailConfirmationLink)
);
router.get("/account/confirm/:token", catchErrors(authController.confirmEmail));

// user controller
router.get(
  "/account",
  authController.isLoggedIn,
  catchErrors(userController.account)
);
router.post("/account", catchErrors(userController.updateWebsiteAccount));
router.get(
  "/removeuser/:id",
  authController.isAdminLoggedIn,
  catchErrors(jobController.removeUser)
);
router.get("/languages/:language", userController.changeLanguage);
router.post(
  "/faq",
  authController.isLoggedIn,
  catchErrors(userController.sendQuestion)
);
router.get(
  "/help",
  authController.isLoggedIn,
  catchErrors(userController.help)
);
router.get(
  "/messages",
  authController.isLoggedIn,
  catchErrors(resultController.getMessages)
);
router.get(
  "/messages/page/:page",
  authController.isLoggedIn,
  catchErrors(resultController.getMessages)
);

// project controller
router.get("/", catchErrors(projectController.welcomePage));
router.get("/participants", catchErrors(projectController.welcomePage));
router.get("/studies", catchErrors(projectController.listPublicProjects));
router.get(
  "/studies/page/:page",
  catchErrors(projectController.listPublicProjects)
);
router.get(
  "/studies/:study",
  catchErrors(projectController.showProjectDescription)
);
router.get(
  "/participantprojects/:id",
  authController.isLoggedIn,
  catchErrors(projectController.activateParticipantProject)
);

router.get(
  "/projects",
  authController.isAdminLoggedIn,
  catchErrors(projectController.getUserProjects)
);
router.get(
  "/projects/:id",
  authController.isAdminLoggedIn,
  catchErrors(projectController.activateProject)
);
router.post(
  "/projects",
  authController.isAdminLoggedIn,
  projectController.upload,
  catchErrors(projectController.resize),
  catchErrors(projectController.createProject)
);
router.post(
  "/projects/:id",
  authController.isAdminLoggedIn,
  projectController.upload,
  catchErrors(projectController.resize),
  catchErrors(projectController.updateProject)
);
router.get(
  "/projects/:id/edit",
  authController.isAdminLoggedIn,
  catchErrors(projectController.editProject)
);
router.get(
  "/projects/deleteproject/:id",
  authController.isAdminLoggedIn,
  catchErrors(projectController.trydeleteProject)
);
router.post(
  "/projects/removeproject/:id",
  authController.isAdminLoggedIn,
  catchErrors(projectController.removeProject)
);
router.get(
  "/changestatusofproject/:id/:action",
  authController.isAdminLoggedIn,
  catchErrors(projectController.changeStatusProject)
);
router.get(
  "/changestatusofparticipant/:id/:action",
  authController.isAdminLoggedIn,
  catchErrors(projectController.changeStatusParticipant)
);

router.get(
  "/projects/approveproject/:id",
  authController.isAdminLoggedIn,
  catchErrors(projectController.approveProject)
);
router.post(
  "/projects/approveproject/:id",
  authController.isAdminLoggedIn,
  catchErrors(projectController.sendApprovalRequest)
);
router.post(
  "/projects/removefrompublic/:id",
  authController.isAdminLoggedIn,
  catchErrors(projectController.removeFromPublic)
);

router.get(
  "/notifications",
  authController.isAdminLoggedIn,
  catchErrors(jobController.manageNotifications)
);
router.get(
  "/notifications/:id",
  authController.isAdminLoggedIn,
  catchErrors(jobController.manageNotifications)
);
router.post(
  "/users/:project",
  authController.isAdminLoggedIn,
  catchErrors(projectController.inviteParticipants)
);
router.get(
  "/invitations",
  authController.isAdminLoggedIn,
  catchErrors(projectController.invitations)
);

// administrator functions
router.get(
  "/admin/studies",
  authController.isSuperAdminLoggedIn,
  catchErrors(adminController.getAllStudies)
);
router.get(
  "/admin/removestudy/:id",
  authController.isSuperAdminLoggedIn,
  catchErrors(adminController.removeStudy)
);
router.get(
  "/admin/togglestudystatus/:id",
  authController.isSuperAdminLoggedIn,
  catchErrors(adminController.toggleStudyStatus)
);
router.get(
  "/admin/users",
  authController.isSuperAdminLoggedIn,
  catchErrors(adminController.getAllUsers)
);
router.get(
  "/admin/users/page/:page",
  authController.isSuperAdminLoggedIn,
  catchErrors(adminController.getAllUsers)
);
router.get(
  "/admin/removeuser/:id",
  authController.isSuperAdminLoggedIn,
  catchErrors(adminController.removeUser)
);

router.get(
  "/users",
  authController.isAdminLoggedIn,
  catchErrors(projectController.getMobileUsers)
);

router.get(
  "/groups",
  authController.isAdminLoggedIn,
  catchErrors(projectController.getMobileGroups)
);

// results controller
router.post("/save", catchErrors(resultController.saveIncrementalResults));
router.get(
  "/history",
  authController.isLoggedIn,
  catchErrors(resultController.showHistory)
);
router.get(
  "/history/page/:page",
  authController.isLoggedIn,
  catchErrors(resultController.showHistory)
);
router.get(
  "/removerecord/:id",
  authController.isAdminLoggedIn,
  catchErrors(resultController.removeRecordById)
);
router.get(
  "/users/page/:page",
  authController.isAdminLoggedIn,
  catchErrors(resultController.getData)
);
router.get(
  "/downloadhistory/:id",
  authController.isLoggedIn,
  catchErrors(resultController.downloadHistory)
);
router.get(
  "/downloadreceipts/:id",
  authController.isLoggedIn,
  catchErrors(paymentController.downloadReceipts)
);

// job controller (notifications)
router.post(
  "/createschedulenotification",
  authController.isAdminLoggedIn,
  catchErrors(jobController.createScheduleNotification)
);
router.post(
  "/createintervalnotification",
  authController.isAdminLoggedIn,
  catchErrors(jobController.createIntervalNotification)
);
router.post(
  "/createindividualnotification",
  authController.isAdminLoggedIn,
  catchErrors(jobController.createIndividualNotification)
);
router.post(
  "/deleteprojectnotifications",
  authController.isAdminLoggedIn,
  catchErrors(jobController.deleteProjectNotifications)
);
router.get(
  "/removenotification/:id",
  authController.isAdminLoggedIn,
  catchErrors(jobController.removeNotificationByID)
);
router.post(
  "/createfixedindividualnotification",
  authController.isAdminLoggedIn,
  catchErrors(jobController.createFixedIndividualNotification)
);

// admin routes
router.get(
  "/debug",
  authController.isSuperAdminLoggedIn,
  catchErrors(jobController.debug)
);
router.post(
  "/scheduleadminjob",
  authController.isAdminLoggedIn,
  catchErrors(jobController.scheduleAdminJob)
);

// api routes
router.get("/api/studies", projectController.getPublicStudiesAPI);
router.get("/api/study/:id", projectController.getPublicStudy);
router.get("/api/study/:id/:token", projectController.getPublicStudy);
router.post("/api/join/:id", jobController.joinStudy);
router.post("/api/leave/:id", jobController.leaveStudy);
router.post("/api/createaccount", userController.createMobileAccount);
router.post("/api/login", userController.loginMobileAccount);
router.post("/api/mystudies", userController.getMyStudies);
router.post("/api/updateaccount", userController.updateAccount);
router.post("/api/updatestatus", resultController.updateStatus);
router.post("/api/history", resultController.getHistory);
router.post("/api/reset", userController.resetPassword);
router.post("/api/update", jobController.updateTokenInStudy);
router.post("/api/checkpayableaccount", userController.checkPayableAccount);
router.post("/api/updatelocation", resultController.updatelocation);
router.post(
  "/api/deleteparticipantaccount",
  jobController.deleteAccountFromMobileApp
);

// hook api
router.post("/api/creategroup", hookController.creategroup);
router.post("/api/deletegroup", hookController.deletegroup);
router.post("/api/notify", hookController.notify);
router.post("/api/resetnotifytoken", hookController.resetNotifyToken);

// stripe API
router.post("/create-account-link", paymentController.createAccountLink);
router.post(
  "/create-checkout-session",
  catchErrors(paymentController.createcheckoutsession)
);
// payout page
router.get(
  "/payout/:id",
  authController.isAdminLoggedIn,
  paymentController.payoutToParticipant
);
// receipts page
router.get(
  "/receipts/:id",
  authController.isAdminLoggedIn,
  paymentController.receiptsToParticipant
);
// notification receipt page
router.get(
  "/notificationreceipt/:id",
  authController.isAdminLoggedIn,
  resultController.checkNotificationReceipt
);

module.exports = router;
