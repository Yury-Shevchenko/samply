const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const Result = mongoose.model("Result");
const User = mongoose.model("User");
const PendingNotification = mongoose.model("PendingNotification");
const { deleteByStatus } = require("../services/notificationScheduler");
const { agenda } = require("./jobController");

exports.getAllStudies = async (req, res) => {
  const projects = await Project.debugProjects();
  res.render("admin/studies", { projects: projects });
};

exports.removeStudy = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  const resultsCount = await Result.where({
    project: req.params.id,
  }).countDocuments();
  // delete all jobs scheduled by this project

  if (resultsCount > 0) {
    const deletedResultsPromise = Result.deleteMany({ project: req.params.id });
    const projectRemovePromise = project.remove();
    await Promise.all([deletedResultsPromise, projectRemovePromise]);
    req.flash("success", `${res.locals.layout.flash_project_deleted}`);
    res.redirect("/admin/studies");
  } else {
    project.remove((projectErr, removedProject) => {
      req.flash("success", `${res.locals.layout.flash_project_deleted}`);
      res.redirect("/admin/studies");
    });
  }
};

exports.toggleStudyStatus = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id }, { public: 1 });
  project.public = !project.public;
  project.requestedForApproval = false;
  await project.save();
  req.flash("success", `Status updated`);
  res.redirect("back");
};

exports.getAllUsers = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 500;
  const skip = page * limit - limit;

  const usersPromise = User.find().skip(skip).limit(limit);
  const countPromise = User.where().countDocuments();
  const [users, count] = await Promise.all([usersPromise, countPromise]);

  const pages = Math.ceil(count / limit);
  res.render("admin/users", { users, page, pages, count, skip });
};

exports.getPendingNotifications = async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const limit = 100;
  const skip = (page - 1) * limit;

  const status = req.query.status || "";
  const projectId = req.query.projectId || "";

  const filter = {};
  if (status) filter.status = status;
  if (projectId) filter.projectId = projectId;

  const [notifications, count, agendaJobs, projects] = await Promise.all([
    PendingNotification.find(filter)
      .sort({ scheduledFor: 1 })
      .skip(skip)
      .limit(limit)
      .populate("projectId", "name slug"),
    PendingNotification.countDocuments(filter),
    agenda.jobs({ nextRunAt: { $exists: true } }),
    Project.find({}, { name: 1 }).sort({ name: 1 }),
  ]);

  // Group remaining Agenda jobs by name
  const agendaByType = {};
  for (const job of agendaJobs) {
    const name = job.attrs.name;
    agendaByType[name] = (agendaByType[name] || 0) + 1;
  }
  const agendaTotal = agendaJobs.length;

  const pages = Math.ceil(count / limit);
  res.render("admin/pendingNotifications", {
    notifications,
    page,
    pages,
    count,
    skip,
    status,
    projectId,
    projects,
    agendaByType,
    agendaTotal,
  });
};

exports.deleteNotificationsByStatus = async (req, res) => {
  const { status, projectId } = req.body;
  const deletedCount = await deleteByStatus(status, projectId || null);
  req.flash("success", `Deleted ${deletedCount} ${status} notifications`);
  const qs = status ? `status=${status}` : "";
  const pqs = projectId ? `projectId=${projectId}` : "";
  res.redirect(`/admin/notifications?${[qs, pqs].filter(Boolean).join("&")}`);
};

exports.removeUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const resultsCount = await Result.where({
    samplyid: user.samplyId,
  }).countDocuments();
  if (resultsCount > 0) {
    const deletedResultsPromise = Result.deleteMany({ user: req.params.id });
    const userRemovePromise = user.remove();
    await Promise.all([deletedResultsPromise, userRemovePromise]);
    req.flash(
      "success",
      `${res.locals.layout.flash_user_deleted}, ${resultsCount} history results were deleted.`
    );
    res.redirect("/admin/users");
  } else {
    user.remove((userErr, removedProject) => {
      req.flash("success", `${res.locals.layout.flash_user_deleted}`);
      res.redirect("/admin/users");
    });
  }
};
