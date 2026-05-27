// Express routes for the combined server.
//
// The combined server (server.js) dispatches ONLY /api/*, /webapi/*, and /save
// to Express; everything else is served by Next.js. So this router contains
// just the mobile/participant API, the hook API, and the result-save endpoint.
// (The researcher REST API at /webapi/v1/* is mounted separately in app.js.)
//
// All former Pug page routes were removed during the Pug-removal pass — they
// were unreachable through the combined server and are now served by Next.js.

const express = require("express");
const router = express.Router();
const passport = require("passport");
const { catchErrors } = require("../handlers/errorHandlers");

const userController = require("../controllers/userController");
const resultController = require("../controllers/resultController");
const projectController = require("../controllers/projectController");
const jobController = require("../controllers/jobController");
const hookController = require("../controllers/hookController");
const authController = require("../controllers/authController");

// Auth/account backends the Next.js app POSTs to server-side. The Next.js
// pages (register, forgot, reset, confirm) handle the UI; these endpoints do
// the work. server.js routes only the POSTs here (GET pages stay in Next.js).
router.post(
  "/auth/researcher/email/register",
  passport.authenticate("website-signup-researcher", {
    successRedirect: "/newproject",
    failureRedirect: "/researcher/register",
    failureFlash: true,
  })
);
router.post("/account/forgot", catchErrors(authController.forgot));
router.post(
  "/account/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
router.post(
  "/account/confirm",
  catchErrors(authController.sendEmailConfirmationLink)
);

// result save (study completion flow)
router.post("/save", catchErrors(resultController.saveIncrementalResults));

// public study API (mobile)
router.get("/api/studies", projectController.getPublicStudiesAPI);
router.get("/api/study/:id", projectController.getPublicStudy);
router.get("/api/study/:id/:token", projectController.getPublicStudy);

// participant API (mobile)
router.post("/api/join/:id", jobController.joinStudy);
router.post("/api/leave/:id", jobController.leaveStudy);
router.post("/api/createaccount", userController.createMobileAccount);
router.post("/api/login", userController.loginMobileAccount);
router.post("/api/mystudies", userController.requireParticipantToken, userController.getMyStudies);
router.post("/api/updateaccount", userController.requireParticipantToken, userController.updateAccount);
router.post("/api/updatestatus", resultController.updateStatus);
router.post("/api/history", userController.requireParticipantToken, resultController.getHistory);
router.post("/api/reset", userController.resetPassword);
router.post("/api/updatetoken", userController.requireParticipantToken, jobController.updateTokenInStudy);
router.post("/api/checkpayableaccount", userController.requireParticipantToken, userController.checkPayableAccount);
router.post("/api/updatelocation", userController.requireParticipantToken, resultController.updatelocation);
router.post("/api/deleteparticipantaccount", jobController.deleteAccountFromMobileApp);

// hook API
router.post("/api/creategroup", hookController.creategroup);
router.post("/api/deletegroup", hookController.deletegroup);
router.post("/api/notify", hookController.notify);
router.post("/api/resetnotifytoken", hookController.resetNotifyToken);

module.exports = router;
