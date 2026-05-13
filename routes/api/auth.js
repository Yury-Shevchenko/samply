const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Project = mongoose.model("Project");

const confirmOwnerOrMember = ({ user, project }) => {
  if (user.level <= 10) {
    throw Error("You must be a researcher in order to do it!");
  }
  const isCreator = project.creator.equals(user._id);
  const isMember = project.members
    .map((id) => id.toString())
    .includes(user._id.toString());
  if (!(isCreator || isMember)) {
    throw Error(
      "You must be a creator or a member of a project in order to do it!"
    );
  }
};

// authenticate middleware for researcher
const authenticate = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }

  next();
};

// researcher authentication
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (user.validPassword(password)) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "14d" }
      );
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ message: "Error" });
    }
  } else {
    res.status(400).json({ message: "Error" });
  }
});

// List all my studies
router.get("/studies", authenticate, async (req, res) => {
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
      webhook: 1,
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
      webhook: 1,
    }
  );
  const studies = [...projects, ...invitedprojects];
  res.status(200).json({ studies });
});

// Get the information about the currently selected study
router.get("/studies/selected", authenticate, async (req, res) => {
  try {
    const study = await Project.find(
      { _id: req.user.project._id },
      {
        name: 1,
        description: 1,
        members: 1,
        tests: 1,
        currentlyActive: 1,
        creator: 1,
        slug: 1,
        public: 1,
        settings: 1,
      }
    );
    res.status(200).json({ study });
  } catch (error) {
    console.error("GET /studies/selected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Activate specific study
router.post("/select/study", authenticate, async (req, res) => {
  const { id } = req.body;
  try {
    const project = await Project.findOne({ _id: id });
    confirmOwnerOrMember({ user: req.user, project });
    const user = await User.findById(req.user._id);
    user.project = project;
    await user.save();
    res.json({ message: "Selected project" });
  } catch (error) {
    console.error("POST /select/study error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update specific study
router.patch("/study/:id", authenticate, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    confirmOwnerOrMember({ user: req.user, project });
    const STUDY_ALLOWED_FIELDS = [
      "name", "description", "currentlyActive", "public", "welcomeMessage",
      "codeMessage", "groupMessage", "messageAfterJoin", "completionMessage",
      "geofencingInstruction", "settings",
    ];
    STUDY_ALLOWED_FIELDS.forEach((key) => {
      if (req.body[key] !== undefined) {
        project[key] = req.body[key];
      }
    });
    await project.save();
    res.json({ message: "Updated study" });
  } catch (error) {
    console.error("PATCH /study/:id error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// test webhook
router.post("/test", async (req, res) => {
  console.log("test worked", req.body);
  res.json({ message: "Test worked" });
});

module.exports = {
  router: router,
  authenticate: authenticate,
};
