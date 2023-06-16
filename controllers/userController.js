const mongoose = require("mongoose");
const promisify = require("es6-promisify");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const multer = require("multer");
const moment = require("moment");
const uniqid = require("uniqid");
const crypto = require("crypto");
const User = mongoose.model("User");
const Result = mongoose.model("Result");
const Project = mongoose.model("Project");

const mail = require("../handlers/mail");
const webpush = require("web-push");
const formidable = require("formidable");
const fs = require("fs");
const schedule = require("node-schedule");
const { nanoid } = require("nanoid");

exports.account = async (req, res) => {
  res.render("account", { title: "Edit Your Account" });
};

exports.updateWebsiteAccount = async (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if (req.body.participantInProject == "") {
      req.body.participantInProject = user.participantInProject;
    }
    user.set(req.body);
    user.save((saveErr, updatedUser) => {
      if (saveErr) {
        req.flash("error", `${res.locals.layout.flash_profile_error_update}`);
      } else {
        req.flash("success", `${res.locals.layout.flash_profile_updated}`);
      }
      res.redirect("back");
    });
  });
};

exports.changeLanguage = (req, res) => {
  const lang = req.params.language;
  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      user.set({ language: lang });
      user.save((saveErr, updatedUser) => {
        if (saveErr) {
          req.flash("error", `${res.locals.layout.flash_profile_error_update}`);
        } else {
          req.flash("success", `${res.locals.layout.flash_profile_updated}`);
        }
        res.redirect("back");
      });
    });
  } else {
    req.session.visitor_language = lang;
    req.flash("success", `${res.locals.layout.flash_language_changed}`);
    res.redirect("back");
  }
};

exports.sendQuestion = async (req, res) => {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  const question = DOMPurify.sanitize(req.body.question);
  const researcher = {
    email: req.user.email || "",
    name: req.user.name || "",
    institute: req.user.institute || "",
    language: req.user.language,
    created: req.user.created,
    level: req.user.level || "",
    samplyId: req.user.samplyId || "",
    code: (req.user.code && req.user.code.id) || "",
  };
  await mail.sendQuestion({
    researcher,
    question,
    filename: "question",
  });
  req.flash("success", `${res.locals.layout.flash_question_sent}`);
  res.redirect("back");
};

exports.help = async (req, res) => {
  res.render("help");
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const makeRandomCode = () => {
  return nanoid(6);
};

exports.createMobileAccount = async (req, res) => {
  const userData = req.body;
  User.findOne({ email: userData.email }, function (err, user) {
    if (err) return done(err);
    if (user) {
      res.status(400).json({ message: "Account exists" });
    } else {
      var newUser = new User();
      newUser.level = 1;
      newUser.email = userData.email;
      newUser.local.password = newUser.generateHash(userData.password);
      const userToken = makeRandomCode();
      newUser.samplyId = userToken;
      if (userData.timezone) {
        newUser.information = {
          timezone: userData.timezone,
        };
      }
      newUser.save(function (err) {
        if (err) throw err;
        res.status(200).json({ message: "OK", userToken: userToken });
      });
    }
  });
};

exports.loginMobileAccount = async (req, res) => {
  const userData = req.body;
  User.findOne({ email: userData.email }, function (err, user) {
    if (err) return done(err);
    if (user) {
      if (user.validPassword(userData.password)) {
        res.status(200).json({ message: "OK", userToken: user.samplyId });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "No user" });
    }
  });
};

exports.getMyStudies = async (req, res) => {
  const userData = req.body;
  const user = await User.findOne(
    { samplyId: userData.token },
    {
      participant_projects: 1,
    }
  );
  let studies = [];
  if (user) {
    studies = user.participant_projects;
  }
  res.status(200).json({ message: "OK", studies: studies });
};

exports.updateAccount = async (req, res) => {
  const userData = req.body;
  const user = await User.findOne(
    { samplyId: userData.token },
    {
      information: 1,
    }
  );
  const data = userData.data;
  user.information = { ...user.information, ...data };
  await user.save();
  res.status(200).json({ message: "OK", information: user.information });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ message: "No user" });
    return;
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpires = Date.now() + 3600000; //1 hour to reset the password
  await user.save();
  const resetURL = `https://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  const subject =
    (res.locals.layout && res.locals.layout.flash_password_reset) ||
    "Password Reset";
  const language =
    (res.locals.layout && res.locals.locale_language) || "english";
  await mail.send({
    participant: user,
    subject,
    resetURL,
    filename: "password-reset-" + language,
  });
  res.status(200).json({ message: "OK" });
};

exports.checkPayableAccount = async (req, res) => {
  const userData = req.body;
  const user = await User.findOne(
    { email: userData.email, samplyId: userData.id },
    {
      stripeInformation: 1,
      information: 1,
    }
  );
  res.send(user);
};
