const mongoose = require("mongoose");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const crypto = require("crypto");
const User = mongoose.model("User");
const Project = mongoose.model("Project");
const mail = require("../handlers/mail");
const webhookController = require("./webhookController");
const validator = require("validator"); // For email validation

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
  10
);

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

const languageCodes = {
  en: "english",
  de: "german",
  nl: "dutch",
};

exports.createMobileAccount = async (req, res) => {
  const userData = req.body;

  User.findOne({ email: userData.email }, function (err, user) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (user) {
      if (user.validPassword(userData?.password)) {
        user.information = {};
        if (userData.timezone) {
          user.information.timezone = userData.timezone;
        }
        if (userData.settings) {
          user.information.settings = userData.settings;
        }
        user.save(function (err) {
          if (err) {
            console.error("Error saving user:", err);
            return res.status(500).json({ message: "Error saving user" });
          }
          res.status(200).json({ message: "OK", userToken: user?.samplyId });
        });
      } else {
        res.status(400).json({ message: "Account exists" });
      }
    } else {
      const newUser = new User();
      newUser.level = 1;
      newUser.email = userData.email || ""; // Store email even if invalid, or empty string
      newUser.local.password = newUser.generateHash(userData.password);
      const userToken = makeRandomCode();
      newUser.samplyId = userToken;
      newUser.information = {};
      if (userData.timezone) {
        newUser.information.timezone = userData.timezone;
      }
      if (userData.settings) {
        newUser.information.settings = userData.settings;
      }

      // Set user language
      let user_app_language;
      if (req.body.defaultLanguageCode) {
        user_app_language = languageCodes[req.body.defaultLanguageCode];
      }
      const user_lang = req.res.locals.locale_language;
      newUser.language = user_app_language || user_lang || "english";
      newUser.confirmEmailToken = crypto.randomBytes(20).toString("hex");
      newUser.confirmEmailExpires = Date.now() + 3600000;

      // Send confirmation email only if email is valid
      if (userData.email && validator.isEmail(userData.email)) {
        try {
          mail.send({
            participant: newUser,
            subject: "Email confirmation",
            resetURL: `https://${req.headers.host}/account/confirm/${newUser.confirmEmailToken}`,
            filename: "email-confirmation-" + newUser.language,
          });
        } catch (err) {
          console.error(
            "Failed to send confirmation email to:",
            userData.email,
            err
          );
          // Continue with user creation despite email failure
        }
      } else {
        console.warn(
          "Skipping email send due to invalid or missing email:",
          userData.email || "undefined"
        );
      }

      newUser.save(function (err) {
        if (err) {
          console.error("Error saving new user:", err);
          return res.status(500).json({ message: "Error saving user" });
        }
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
  let userStudyIds = [];
  if (user) {
    userStudyIds = user.participant_projects.map((study) => study.id);
    if (userStudyIds.length) {
      studies = await Project.find(
        { _id: userStudyIds },
        { name: 1, description: 1, image: 1 }
      );
    }
  }
  res.status(200).json({ message: "OK", studies: studies });
};

exports.updateAccount = async (req, res) => {
  const userData = req.body;
  const user = await User.findOne(
    { samplyId: userData.token },
    {
      information: 1,
      participant_projects: 1,
    }
  );

  const data = userData.data;
  user.information = { ...user.information, ...data };
  await user.save();

  // trigger webhooks
  for (const project of user.participant_projects) {
    const study = await Project.findOne(
      { _id: project?._id },
      { mobileUsers: 1 }
    );
    let participant = {};
    if (
      study &&
      study.mobileUsers.filter((user) => user.id === userData.token).length
    ) {
      participant = study.mobileUsers.filter(
        (user) => user.id === userData.token
      )[0];
    }

    webhookController.triggerWebhook({
      projectId: project.id,
      event: "participant_info_updated",
      data: {
        projectId: project.id,
        id: userData.token, // samply id of the participant
        information: data,
        code: participant?.username,
        group: participant?.group,
      },
    });
  }

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
