const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Project = mongoose.model("Project");

const apiRoutesAuthRouter = require("./auth");
const { authenticate } = apiRoutesAuthRouter;

const jobController = require("../../controllers/jobController");

// get all notifications of the currently activated project
router.get("/", authenticate, async (req, res) => {
  const notifications = await getNotificationsOfProject({
    id: req.user.project._id,
  });
  res.status(200).json({ notifications });
});

// get one notification with the specific id
router.get("/:id", authenticate, async (req, res) => {
  const notifications = await getNotificationsOfProject({
    id: req.user.project._id,
  });
  const notification = notifications.filter(
    (notification) => notification.id === req.params.id
  );
  res.status(200).json({ notification });
});

// create new notification
router.post("/", authenticate, async (req, res) => {
  try {
    const { schedule, target, randomize } = req.body;
    if (schedule === "one-time") {
      if (target === "fixed-times") {
        await jobController.createScheduleNotification(req, res);
      }
      if (target === "user-specific") {
        await jobController.createFixedIndividualNotification(req, res);
      }
    }
    if (schedule === "repeat") {
      if (target === "fixed-intervals") {
        await jobController.createIntervalNotification(req, res);
      }
      if (target === "user-specific") {
        if (randomize) {
          await jobController.createIntervalNotification(req, res);
        } else {
          await jobController.createIndividualNotification(req, res);
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a notification
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const project = await Project.findOne(
      { _id: req.user.project._id },
      {
        notifications: 1,
      }
    );
    if (!project) {
      res
        .status(400)
        .json({ message: "No activated project in your researcher account" });
    }
    if (!project.notifications) {
      project.notifications = [];
    }
    project.notifications = project.notifications.map((notification) => {
      if (notification.id === req.params.id) {
        Object.keys(req.body).map((key) => (notification[key] = req.body[key]));
      }
      return notification;
    });
    await project.save();
    res.json({ message: "Updated notification" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a notification
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const project = await Project.findOne(
      { _id: req.user.project._id },
      {
        notifications: 1,
      }
    );
    if (!project) {
      res
        .status(400)
        .json({ message: "No activated project in your researcher account" });
    }
    if (!project.notifications) {
      project.notifications = [];
    }
    project.notifications = project.notifications.filter(
      (user) => user.id !== req.params.id
    );
    await project.save();
    res.json({ message: "Deleted notification" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getNotificationsOfProject({ id }) {
  const project = await Project.findOne(
    { _id: id },
    {
      notifications: 1,
    }
  );
  if (!project) {
    return [];
  }
  const notifications = project.notifications || [];
  return notifications;
}

module.exports = router;
