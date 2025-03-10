const mongoose = require("mongoose");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid"); // make unique identifier
const uniqid = require("uniqid");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
  10
);
const fs = require("fs");

const mail = require("../handlers/mail");

const User = mongoose.model("User");
const Result = mongoose.model("Result");
const Project = mongoose.model("Project");

const DOMAIN =
  process.env.NODE_ENV == "production"
    ? "https://samply.uni-konstanz.de"
    : "http://localhost";

const confirmOwner = (project, user) => {
  if (!project.creator.equals(user._id) || user.level <= 10) {
    throw Error("You must own a project in order to do it!");
  }
};

const confirmOwnerOrMember = (project, user) => {
  const isCreator = project.creator.equals(user._id);
  const isMember = project.members
    .map((id) => id.toString())
    .includes(user._id.toString());
  const isParticipant = user.level <= 10;
  if (!(isCreator || isMember) || isParticipant) {
    throw Error(
      "You must be a creator or a member of a project in order to do it!"
    );
  }
};

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isOk =
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("application/json");
    if (isOk) {
      next(null, true);
    } else {
      next({ message: "That filetype is not allowed " }, false);
    }
  },
};

// try to delete the image if it exists in the file system on the server
const deleteImageFromServer = (image) => {
  if (image.includes(DOMAIN)) {
    const name = image.split(`${DOMAIN}/uploads/`)[1];
    const location = `./public/uploads/${name}`;
    fs.stat(location, function (err, stats) {
      if (err) {
        return console.error(err);
      }
      fs.unlink(location, function (err) {
        if (err) return console.log(err);
      });
    });
  }
};

exports.upload = multer(multerOptions).fields([{ name: "image" }]);

exports.resize = async (req, res, next) => {
  if (req.files.image && typeof req.body.lucky === "undefined") {
    if (req.body.image) {
      const { image } = req.body;
      deleteImageFromServer(image);
    }
    const extension = req.files.image[0].mimetype.split("/")[1];
    const fileName = `${uuid.v4()}.${extension}`;
    req.body.image = `${DOMAIN}/uploads/${fileName}`;
    const image = await jimp.read(req.files.image[0].buffer);
    await image.resize(800, jimp.AUTO);
    await image.write(`./public/uploads/${fileName}`);
    next();
  } else {
    if (
      !req.body.image &&
      typeof req.body.lucky !== "undefined" &&
      req.body.lucky == "on"
    ) {
      const endpoint = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_KEY}`;
      const response = await fetch(endpoint);
      if (response && response.ok) {
        const json = await response.json();
        const url = json && json.urls && json.urls.regular;
        if (url) {
          const image = await jimp.read(url);
          if (image) {
            const extension = image._originalMime.split("/")[1];
            const fileName = `${uuid.v4()}.${extension}`;
            req.body.image = `${DOMAIN}/uploads/${fileName}`;
            await image.resize(800, jimp.AUTO);
            await image.write(`./public/uploads/${fileName}`);
          }
        }
      }
    }
    next();
  }
};

exports.welcomePage = async (req, res) => {
  res.render("index");
};

exports.listPublicProjects = async (req, res) => {
  const study = req.query.study;
  const page = req.params.page || 1;
  const limit = 20;
  const skip = page * limit - limit;
  const projectsPromise = Project.findAllPublic().skip(skip).limit(limit);
  const countPromise = Project.where({
    currentlyActive: true,
    public: true,
    creator: { $exists: true },
  }).countDocuments();
  const [projects, count] = await Promise.all([projectsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!projects.length && skip) {
    req.flash(
      "info",
      `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`
    );
    res.redirect(`/studies/page/${pages}`);
    return;
  }
  res.render("studies", { projects, page, pages, count, study });
};

exports.showProjectDescription = async (req, res) => {
  const project = await Project.findOne(
    {
      slug: req.params.study,
      currentlyActive: true,
    },
    {
      name: 1,
      description: 1,
      currentlyActive: 1,
      tests: 1,
      creator: 1,
      created: 1,
      slug: 1,
      image: 1,
    }
  );
  let author;
  if (project) {
    author = await User.findOne(
      { _id: project.creator },
      {
        name: 1,
        institute: 1,
        // email: 1,
      }
    );
    res.render("study", { project, author });
  } else {
    res.redirect("back");
  }
};

exports.activateParticipantProject = async (req, res) => {
  const activeProject = await Project.findOne({ _id: req.params.id });
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { participantInProject: activeProject._id },
    {
      new: true,
      upsert: true,
    }
  ).exec();
  res.redirect("/testing");
};

// show the form to create new project
exports.createNewProject = async (req, res) => {
  res.render("newproject", {});
};

// show user projects
exports.getUserProjects = async (req, res) => {
  const projects = await Project.find(
    { creator: req.user._id },
    {
      name: 1,
      description: 1,
      members: 1,
      tests: 1,
      currentlyActive: 1,
      creator: 1,
      slug: 1,
      public: 1,
    }
  );
  const invitedprojects = await Project.find(
    { members: req.user._id },
    {
      name: 1,
      description: 1,
      members: 1,
      tests: 1,
      currentlyActive: 1,
      creator: 1,
      slug: 1,
      public: 1,
    }
  );
  res.render("projects", { projects, invitedprojects });
};

exports.activateProject = async (req, res) => {
  const activeProject = await Project.findOne({ _id: req.params.id });
  confirmOwnerOrMember(activeProject, req.user);
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { project: activeProject },
    {
      new: true,
      upsert: true,
    }
  ).exec();
  req.flash(
    "success",
    `${activeProject.name} ${res.locals.layout.flash_activate_project}`
  );
  res.redirect("back");
};

exports.createProject = async (req, res) => {
  if (req.body.name.trim() != "") {
    try {
      let membersData = [];
      if (req.body.members) {
        const users = await User.find({
          email: { $in: req.body.members },
          level: { $gt: 10 },
        });
        membersData = users.map((e) => {
          return e._id;
        });
      }
      const locationSlugs = Object.keys(req.body)
        .filter((key) => key.startsWith("slug"))
        .map((key) => key.substring(5));
      const locations = locationSlugs.map((slug) => {
        return {
          slug: slug,
          title: req.body[`title-${slug}`],
          latitude: parseFloat(req.body[`latitude-${slug}`]),
          longitude: parseFloat(req.body[`longitude-${slug}`]),
          radius: parseFloat(req.body[`radius-${slug}`]),
          events: [
            req.body[`event-enter-${slug}`] === "on" ? "enter" : undefined,
            req.body[`event-exit-${slug}`] === "on" ? "exit" : undefined,
          ].filter((e) => !!e),
          link: req.body[`link-${slug}`],
          invisible: req.body[`invisible-${slug}`] === "on" ? 1 : 0,
        };
      });
      const actions = [1, 2, 3, 4].map((num) => ({
        num,
        identifier: req.body[`identifier-${num}`],
        buttonTitle: req.body[`buttonTitle-${num}`],
      }));
      const events = [1, 2, 3, 4, 5].map((num) => ({
        num,
        caption: req.body[`event-caption-${num}`],
        url: req.body[`event-url-${num}`],
      }));
      const project = await new Project({
        name: req.body.name.trim(),
        image: req.body.image,
        description: req.body.description,
        welcomeMessage: req.body.welcomeMessage,
        codeMessage: req.body.codeMessage,
        groupMessage: req.body.groupMessage,
        messageAfterJoin: req.body.messageAfterJoin,
        completionMessage: req.body.completionMessage,
        geofencingInstruction: req.body.geofencingInstruction,
        creator: req.user._id,
        members: membersData,
        currentlyActive: req.body.currentlyActive,
        settings: {
          askParticipantCode:
            req.body.askParticipantCode && req.body.askParticipantCode === "on",
          askParticipantGroup:
            req.body.askParticipantGroup &&
            req.body.askParticipantGroup === "on",
          enableEvents:
            req.body.enableEvents && req.body.enableEvents === "on"
              ? true
              : false,
          eventDescription: req.body.eventDescription,
          events: events,
          enableGeofencing:
            req.body.enableGeofencing && req.body.enableGeofencing === "on",
          geofencing: {
            locations: locations,
            link: req.body.geofencingURL,
            radius: req.body.userLocationRadius,
            header: req.body.userLocationHeader,
            message: req.body.userLocationMessage,
            exitzone: parseInt(req.body.userLocationExitzone),
            mintimewindow: parseInt(req.body.userLocationMintimewindow),
            events: [
              req.body[`event-enter`] === "on" ? "enter" : undefined,
              req.body[`event-exit`] === "on" ? "exit" : undefined,
            ].filter((e) => !!e),
            invisible: req.body[`invisible`] === "on" ? 1 : 0,
            header: req.body.userLocationHeader,
            message: req.body.userLocationMessage,
            exitzone: parseInt(req.body.userLocationExitzone),
            mintimewindow: parseInt(req.body.userLocationMintimewindow),
          },
          permanentLink: req.body.permanentLink.trim(),
          enableActions:
            req.body.enableActions && req.body.enableActions === "on",
          actions: actions,
          enableWebhooks:
            req.body.enableWebhooks && req.body.enableWebhooks === "on"
              ? true
              : false,
          webhookEndpoint: req.body.webhookEndpoint,
          webhookEvents: [
            req.body[`webhookEvents-study_joined`] === "on"
              ? "study_joined"
              : undefined,
            req.body[`webhookEvents-study_left`] === "on"
              ? "study_left"
              : undefined,
            req.body[`webhookEvents-participant_info_updated`] === "on"
              ? "participant_info_updated"
              : undefined,
          ].filter((e) => !!e),
        },
        samplycode: nanoid(6),
      }).save();
      if (typeof req.user.project._id == "undefined") {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: req.user._id,
          },
          { project: project },
          {
            new: true,
            upsert: true,
          }
        ).exec();
      }
      req.flash(
        "success",
        `${res.locals.layout.flash_project_created} <strong>${req.body.name}</strong>.`
      );
      res.redirect(`/projects`);
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("back");
      return;
    }
  } else {
    req.flash("error", `${res.locals.layout.flash_give_name}`);
    res.redirect("back");
  }
};

exports.updateProject = async (req, res) => {
  if (req.body.name.trim() != "") {
    try {
      let membersData = [];
      if (req.body.members) {
        const users = await User.find({ email: { $in: req.body.members } });
        membersData = users
          .map((e) => {
            if (
              e.email &&
              e.email != null &&
              typeof e.email != "undefined" &&
              e.email != req.user.email
            ) {
              return e._id;
            }
          })
          .filter((e) => typeof e != "undefined");
      }
      const project = await Project.findOne({ _id: req.params.id });
      project.name = req.body.name.trim();
      project.image = req.body.image;
      project.description = req.body.description;
      project.welcomeMessage = req.body.welcomeMessage;
      project.codeMessage = req.body.codeMessage;
      project.groupMessage = req.body.groupMessage;
      project.messageAfterJoin = req.body.messageAfterJoin;
      project.completionMessage = req.body.completionMessage;
      project.geofencingInstruction = req.body.geofencingInstruction;
      project.members = membersData;
      if (!project.settings) project.settings = {};
      if (!project.samplycode) {
        project.samplycode = nanoid(6);
      }

      const locationSlugs = Object.keys(req.body)
        .filter((key) => key.startsWith("slug"))
        .map((key) => key.substring(5));

      const locations = locationSlugs.map((slug) => {
        return {
          slug: slug,
          title: req.body[`title-${slug}`],
          latitude: parseFloat(req.body[`latitude-${slug}`]),
          longitude: parseFloat(req.body[`longitude-${slug}`]),
          radius: parseFloat(req.body[`radius-${slug}`]),
          events: [
            req.body[`event-enter-${slug}`] === "on" ? "enter" : undefined,
            req.body[`event-exit-${slug}`] === "on" ? "exit" : undefined,
          ].filter((e) => !!e),
          link: req.body[`link-${slug}`],
          invisible: req.body[`invisible-${slug}`] === "on" ? 1 : 0,
          header: req.body[`header-${slug}`],
          message: req.body[`message-${slug}`],
          exitzone: parseInt(req.body[`exitzone-${slug}`]),
          mintimewindow: parseInt(req.body[`mintimewindow-${slug}`]),
        };
      });
      const actions = [1, 2, 3, 4].map((num) => ({
        num,
        identifier: req.body[`identifier-${num}`],
        buttonTitle: req.body[`buttonTitle-${num}`],
      }));
      const events = [1, 2, 3, 4, 5].map((num) => ({
        num,
        caption: req.body[`event-caption-${num}`],
        url: req.body[`event-url-${num}`],
      }));
      project.settings = {
        askParticipantCode:
          req.body.askParticipantCode && req.body.askParticipantCode === "on"
            ? true
            : false,
        askParticipantGroup:
          req.body.askParticipantGroup && req.body.askParticipantGroup === "on"
            ? true
            : false,
        enableEvents:
          req.body.enableEvents && req.body.enableEvents === "on"
            ? true
            : false,
        eventDescription: req.body.eventDescription,
        events: events,
        enableGeofencing:
          req.body.enableGeofencing && req.body.enableGeofencing === "on"
            ? true
            : false,
        geofencing: {
          locations: locations,
          link: req.body.geofencingURL,
          radius: req.body.userLocationRadius,
          header: req.body.userLocationHeader,
          message: req.body.userLocationMessage,
          exitzone: parseInt(req.body.userLocationExitzone),
          mintimewindow: parseInt(req.body.userLocationMintimewindow),
          events: [
            req.body[`event-enter`] === "on" ? "enter" : undefined,
            req.body[`event-exit`] === "on" ? "exit" : undefined,
          ].filter((e) => !!e),
          invisible: req.body[`invisible`] === "on" ? 1 : 0,
        },
        permanentLink: req.body.permanentLink.trim(),
        enableActions:
          req.body.enableActions && req.body.enableActions === "on"
            ? true
            : false,
        actions: actions,
        enableWebhooks:
          req.body.enableWebhooks && req.body.enableWebhooks === "on"
            ? true
            : false,
        webhookEndpoint: req.body.webhookEndpoint,
        webhookEvents: [
          req.body[`webhookEvents-study_joined`] === "on"
            ? "study_joined"
            : undefined,
          req.body[`webhookEvents-study_left`] === "on"
            ? "study_left"
            : undefined,
          req.body[`webhookEvents-participant_info_updated`] === "on"
            ? "participant_info_updated"
            : undefined,
        ].filter((e) => !!e),
      };

      await project.save();
      req.flash("success", `${res.locals.layout.flash_project_updated}`);
      res.redirect("back");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("back");
      return;
    }
  } else {
    req.flash("error", `${res.locals.layout.flash_give_name}`);
    res.redirect("back");
  }
};

exports.editProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  let membersEmails = [];
  if (project.members) {
    const users = await User.find({ _id: { $in: project.members } });
    membersEmails = users.map((e) => {
      return e.email;
    });
  }
  confirmOwner(project, req.user);
  res.render("editProject", { project, membersEmails });
};

exports.trydeleteProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  confirmOwner(project, req.user);
  const resultsCount = await Result.where({
    project: req.params.id,
  }).countDocuments();
  res.render("deleteProjectForm", { project, resultsCount });
};

exports.removeProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  const resultsCount = await Result.where({
    project: req.params.id,
  }).countDocuments();
  if (req.body.confirmation == project.name) {
    if (project.image) {
      const { image } = project;
      deleteImageFromServer(image);
    }
    if (resultsCount > 0) {
      const deletedResultsPromise = Result.deleteMany({
        project: req.params.id,
      });
      const projectRemovePromise = project.remove();
      await Promise.all([deletedResultsPromise, projectRemovePromise]);
      req.flash("success", `${res.locals.layout.flash_project_deleted}`);
      res.redirect("/projects");
    } else {
      project.remove((projectErr, removedProject) => {
        req.flash("success", `${res.locals.layout.flash_project_deleted}`);
        res.redirect("/projects");
      });
    }
  } else {
    req.flash("error", `${res.locals.layout.flash_cannot_delete}`);
    res.redirect("back");
  }
};

exports.changeStatusProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  const participantsNumber = project.participants.length;
  if (project) {
    project.currentlyActive = !project.currentlyActive;
    await project.save();
    req.flash(
      "success",
      `${
        req.params.action == "on"
          ? res.locals.layout.flash_program_open
          : res.locals.layout.flash_program_closed
      }`
    );
    res.redirect("/projects");
  } else {
    req.flash(
      "error",
      `${res.locals.layout.flash_limit_of_participants_reached_1} ${project.name} ${res.locals.layout.flash_limit_of_participants_reached_2}`
    );
    res.redirect("back");
  }
};

exports.inviteParticipants = async (req, res) => {
  let emails = [];
  if (req.body.invitationsList) {
    const emailsRaw = req.body.invitationsList
      .replace(/ /g, "")
      .split(/\r\n|,|;/);
    if (emailsRaw) {
      emails = emails.concat(
        emailsRaw.filter((e) => e && e != null && e != "")
      );
    }
  }
  const project = await Project.findOne({ name: req.params.project });
  let sentEmails = [];
  if (project && project.invitations && project.invitations.length > 0) {
    sentEmails = project.invitations
      .filter((e) => typeof e != "undefined" && e != null && e.email != null)
      .map((e) => e.email);
  }
  const newInvitationEmails = emails.filter(
    (e) => e != null && e != "" && sentEmails.indexOf(e) == -1
  );
  if (sentEmails.length > 100) {
    req.flash("error", `${res.locals.layout.flash_invitation_overlimit}`);
    res.redirect("back");
    return;
  }
  let sentInvitations;
  const subject = res.locals.layout.flash_invitation;
  try {
    sentInvitations = await Promise.all(
      newInvitationEmails.map(async (email) => {
        if (email && email != null) {
          const token = uniqid();
          const participant = {
            email: email,
            project: project.name,
          };
          const singupURL = `https://${req.headers.host}/code/${req.params.project}/${token}`;
          await mail.send({
            participant,
            subject,
            singupURL,
            filename: "invitation-" + req.user.language,
          });
          return { email: email, token: token };
        }
      })
    );
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("back");
    return;
  }
  if (sentInvitations && sentInvitations != null) {
    project.invitations = project.invitations.concat(sentInvitations);
  }
  await project.save();
  req.flash("success", `${res.locals.layout.flash_invited}`);
  res.redirect(`back`);
};

exports.invitations = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      invitations: 1,
      slug: 1,
      currentlyActive: 1,
    }
  );
  res.render("invitations", { project });
};

exports.getPublicStudiesAPI = async (req, res) => {
  const studies = await Project.findAllPublic();
  res.send(studies);
};

function checkObjectIdValid(id) {
  const ObjectID = mongoose.Types.ObjectId;
  if (ObjectID.isValid(id)) {
    if (String(new ObjectID(id)) === id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

exports.getPublicStudy = async (req, res) => {
  const { id, token } = req.params;
  let study;
  if (checkObjectIdValid(id)) {
    study = await Project.findOne(
      { _id: id },
      {
        name: 1,
        description: 1,
        welcomeMessage: 1,
        codeMessage: 1,
        groupMessage: 1,
        messageAfterJoin: 1,
        geofencingInstruction: 1,
        settings: 1,
        samplycode: 1,
        mobileUsers: 1,
        creator: 1,
      }
    );
  } else {
    study = await Project.findOne(
      { slug: id },
      {
        name: 1,
        description: 1,
        welcomeMessage: 1,
        codeMessage: 1,
        messageAfterJoin: 1,
        geofencingInstruction: 1,
        settings: 1,
        samplycode: 1,
        mobileUsers: 1,
        creator: 1,
      }
    );
  }
  if (!study) {
    return res.send({ error: "No study found" });
  }

  const author = await User.findOne(
    { _id: study.creator },
    {
      name: 1,
      institute: 1,
      email: 1,
    }
  );

  let participant = {};
  if (study && study.mobileUsers.filter((user) => user.id === token).length) {
    participant = study.mobileUsers.filter((user) => user.id === token)[0];
  }
  const studyUser = {
    ...study._doc,
    participant,
    author,
  };

  delete studyUser.mobileUsers;
  res.send(studyUser);
};

exports.getMobileUsers = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      mobileUsers: 1,
    }
  );
  if (!project) {
    return res.render("data", {});
  }
  const users = await Promise.all(
    project.mobileUsers.map(async (user) => {
      const participant = await User.findOne(
        { samplyId: user.id },
        { information: 1, stripeAccountId: 1, stripeInformation: 1 }
      );

      if (
        participant &&
        participant.information &&
        participant.information.timeWindow
      ) {
        const startTime = `${new Date(
          participant.information.timeWindow.startTime
        ).getHours()}:${new Date(
          participant.information.timeWindow.startTime
        ).getMinutes()}`;
        const endTime = `${new Date(
          participant.information.timeWindow.endTime
        ).getHours()}:${new Date(
          participant.information.timeWindow.endTime
        ).getMinutes()}`;
        user.information = {
          ...user.information,
          from: startTime,
          to: endTime,
        };
      }

      if (
        participant &&
        participant.information &&
        participant.information.timezone
      ) {
        user.information = {
          ...user.information,
          timezone: participant.information.timezone,
        };
      }

      if (participant && participant.stripeAccountId) {
        user.stripe = {
          account: participant.stripeAccountId,
          information: participant.stripeInformation,
        };
      }

      return user;
    })
  );
  res.render("data", { project, users });
};

exports.getMobileGroups = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      mobileUsers: 1,
    }
  );
  if (!project) {
    return res.render("groups", {});
  }
  const users = project.mobileUsers;
  let groups = [];
  if (project.mobileUsers.map((user) => user.group).length) {
    const allGroups = project.mobileUsers
      .map((user) => user.group)
      .filter((item) => typeof item !== "undefined");
    const allGroupsIds = allGroups.map((group) => group.id);
    groups = [...new Set(allGroupsIds)].map((id) => {
      return {
        id,
        name: allGroups
          .filter((group) => group.id === id)
          .map((group) => group.name)[0],
      };
    });
  }
  res.render("groups", { project, users, groups });
};

exports.approveProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  confirmOwnerOrMember(project, req.user);
  res.render("approveProjectForm", { project });
};

exports.sendApprovalRequest = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  if (project) {
    project.requestedForApproval = !project.requestedForApproval;
    await project.save();
    req.flash("success", `Your request was sent`);
    res.redirect("/projects");
  } else {
    res.redirect("back");
  }
};

exports.removeFromPublic = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  if (project) {
    project.public = false;
    project.requestedForApproval = false;
    await project.save();
    req.flash("success", `The project was removed from the public list`);
    res.redirect("/projects");
  } else {
    res.redirect("back");
  }
};

exports.changeStatusParticipant = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      mobileUsers: 1,
      creator: 1,
      members: 1,
    }
  );
  confirmOwnerOrMember(project, req.user);
  const userId = req.params.id;
  // update the project
  if (!project.mobileUsers) {
    project.mobileUsers = [];
  }
  project.mobileUsers = project.mobileUsers.map((user) => {
    if (user.id === userId && user.token.startsWith("ExponentPushToken")) {
      const updatedUser = {
        ...user._doc,
        deactivated: req.params.action === "off",
      };
      if (req.params.action === "off") {
        req.flash(
          "error",
          `Sending notifications for the participant ${req.params.id} is disabled. The participant will not receive notifications.`
        );
      } else {
        req.flash(
          "success",
          `Sending notifications for the participant ${req.params.id} is enabled. The participant will receive notifications.`
        );
      }
      return updatedUser;
    } else {
      return user;
    }
  });
  await project.save();
  res.redirect("back");
};

exports.getAPI = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      mobileUsers: 1,
      notifyToken: 1,
      notifyExpires: 1,
    }
  );
  if (!project) {
    return res.render("api", {});
  }
  res.render("api", { project });
};
