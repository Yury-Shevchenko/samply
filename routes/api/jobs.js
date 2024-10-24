const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const apiRoutesAuthRouter = require("./auth");
const { authenticate } = apiRoutesAuthRouter;

const jobController = require("../../controllers/jobController");

// get all jobs of the study
router.get("/", authenticate, async (req, res) => {
  const jobs = await jobController.findAllProjectJobsAPI({
    projectId: req.user.project._id,
  });
  res.status(200).json({ jobs });
});

// get all jobs for specific notification id
router.get("/:notificationid", authenticate, async (req, res) => {
  const jobs = await jobController.findJobsAPI({
    projectId: req.user.project._id,
    notificationId: req.params.notificationid,
  });
  res.status(200).json({ jobs });
});

// get specific job with an id
router.get("/:notificationid/:jobid", authenticate, async (req, res) => {
  const job = await jobController.findJobAPI({
    projectId: req.user.project._id,
    notificationId: req.params.notificationid,
    jobId: req.params.jobid,
  });
  res.status(200).json({ job });
});

// update a job
router.patch("/:notificationid/:jobid", authenticate, async (req, res) => {
  try {
    const job = await jobController.updateJobAPI({
      projectId: req.user.project._id,
      notificationId: req.params.notificationid,
      jobId: req.params.jobid,
      data: req.body,
    });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a job
router.delete("/:notificationid/:jobid", authenticate, async (req, res) => {
  try {
    const numRemoved = await jobController.deleteJobAPI({
      projectId: req.user.project._id,
      notificationId: req.params.notificationid,
      jobId: req.params.jobid,
    });
    res.status(200).json({ numRemoved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
