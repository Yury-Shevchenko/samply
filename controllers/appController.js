const mongoose = require("mongoose");
const Project = mongoose.model("Project");

exports.researcherPage = async (req, res) => {
  res.render("researcher", { action: req.params.action });
};

exports.participantPage = async (req, res) => {
  if (req.user) {
    res.redirect("/account");
  } else {
    res.render("participant", {
      action: req.params.action,
      email: req.params.email
    });
  }
};

exports.docs = (req, res) => {
  res.render("docs", { page: req.params.page || "intro" });
};

exports.forgot = async (req, res) => {
  res.render("login", { title: "Welcome", forgot: true });
};

exports.testing = async (req, res) => {
  const study = req.params.id;
  const project = await Project.findOne(
    { _id: study },
    {
      name: 1,
      slug: 1,
      description: 1,
      welcomeMessage: 1
    }
  );
  const projects = await Project.getCurrentProjects();
  res.render("testing", { project, projects, study });
};

exports.news = (req, res) => {
  res.render("news", { page: req.params.page || "intro" });
};
