const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
  10
);

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Project = mongoose.model("Project");

const makeRandomCode = () => {
  return nanoid(6);
};
const apiRoutesAuthRouter = require("./auth");
const { authenticate } = apiRoutesAuthRouter;

// get all participants of the currently activated project
router.get("/", authenticate, async (req, res) => {
  const participants = await getParticipantsOfProject({
    id: req.user.project._id,
  });
  res.status(200).json({ participants });
});

// get one participant with the specific samply id
router.get("/:id", authenticate, async (req, res) => {
  const participants = await getParticipantsOfProject({
    id: req.user.project._id,
  });
  const participant = participants.filter(
    (participant) => participant.id === req.params.id
  );
  res.status(200).json({ participant });
});

// create new participant with a payload (name, email, code)
router.post("/", authenticate, async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      mobileUsers: 1,
    }
  );
  if (!project) {
    res
      .status(400)
      .json({ message: "No activated project in your researcher account" });
  }
  try {
    // check whether there is already a user with the email
    const existingUserWithEmail = await User.findOne({ email: req.body.email });
    let samplyid;
    if (!existingUserWithEmail) {
      const newUser = new User();
      newUser.level = 1;
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      samplyid = makeRandomCode();
      newUser.samplyId = samplyid;
      await newUser.save();
    } else {
      samplyid = existingUserWithEmail.samplyId;
    }

    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email,
        samplyid: samplyid,
        projectid: req.user.project._id,
        code: req.body.code,
      },
      "jwtPrivateKey",
      { expiresIn: req.body.expiresIn }
    );

    // add the user to the study
    if (!project.mobileUsers) {
      project.mobileUsers = [];
    }
    project.mobileUsers.push({
      id: samplyid,
      token: `The invitation was created by the researcher`,
      deactivated: true,
      username: req.body.code, // participant code
      invitation: {
        token: token,
        expiresIn: req.body.expiresIn,
      },
    });
    await project.save();

    res.status(200).json({
      message: "Created a new participant",
      samplyid: samplyid,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update one participant
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const project = await Project.findOne(
      { _id: req.user.project._id },
      {
        mobileUsers: 1,
      }
    );
    if (!project) {
      res
        .status(400)
        .json({ message: "No activated project in your researcher account" });
    }
    if (!project.mobileUsers) {
      project.mobileUsers = [];
    }
    project.mobileUsers = project.mobileUsers.map((user) => {
      if (user.id === req.params.id) {
        user.username = req.body.code;
      }
      return user;
    });
    await project.save();
    res.json({ message: "Updated participant" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete one participant
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const project = await Project.findOne(
      { _id: req.user.project._id },
      {
        mobileUsers: 1,
      }
    );
    if (!project) {
      res
        .status(400)
        .json({ message: "No activated project in your researcher account" });
    }
    if (!project.mobileUsers) {
      project.mobileUsers = [];
    }
    project.mobileUsers = project.mobileUsers.filter(
      (user) => user.id !== req.params.id
    );
    await project.save();
    res.json({ message: "Deleted participant" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getParticipantsOfProject({ id }) {
  const project = await Project.findOne(
    { _id: id },
    {
      mobileUsers: 1,
    }
  );
  if (!project) {
    return [];
  }

  const participants = await Promise.all(
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

  return participants;
}

module.exports = router;
