const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const Result = mongoose.model("Result");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
  10
);
const crypto = require("crypto");

const { Expo } = require("expo-server-sdk");
let expo = new Expo();

const confirmOwner = (project, user) => {
  if (!project.creator.equals(user._id) || user.level <= 10) {
    throw Error("You must own a project in order to edit it!");
  }
};

exports.deletegroup = async (req, res) => {
  const { groupId } = req.body;
  let project = await Project.findOne(
    { _id: req.user.project._id },
    { creator: 1, mobileUsers: 1 }
  );
  confirmOwner(project, req.user);
  const mobileUsers = [...project.mobileUsers].map((user) => {
    if (user.group && user.group.id == groupId) {
      const updatedUser = { ...user._doc };
      delete updatedUser.group;
      return updatedUser;
    } else {
      return user;
    }
  });
  project.mobileUsers = mobileUsers;
  await project.save();
  req.flash("success", `The group is deleted`);
  res.redirect("back");
};

exports.creategroup = async (req, res) => {
  const { participants, groupName } = req.body;
  if (!participants || !participants.length) {
    req.flash("error", `No participants selected`);
    res.redirect("back");
    return;
  }
  let project = await Project.findOne(
    { _id: req.user.project._id },
    { creator: 1, mobileUsers: 1 }
  );
  confirmOwner(project, req.user);
  let id;
  // check that there is no group with the same name
  const sameName = project.mobileUsers.filter(
    (user) => user && user.group && user.group.name === groupName
  );
  if (sameName.length) {
    id = sameName[0].group.id;
  } else {
    id = nanoid(4);
  }

  const mobileUsers = [...project.mobileUsers].map((user) => {
    if (participants.includes(user.id)) {
      return {
        ...user._doc,
        group: {
          id,
          name: groupName,
        },
      };
    } else {
      return user;
    }
  });
  project.mobileUsers = mobileUsers;
  await project.save();
  req.flash("success", `The new group is created`);
  res.redirect("back");
};

// reset notification token with the expiration date
exports.resetNotifyToken = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    { creator: 1 }
  );
  confirmOwner(project, req.user);

  project.notifyToken = crypto.randomBytes(20).toString("hex");
  project.notifyExpires = req.body.notifyExpires;
  await project.save();

  req.flash("success", `The new token is created`);
  res.redirect("back");
};

exports.notify = async (req, res) => {
  // Parse request and get all information
  const { token, projectID, groupID, participantID, expireIn } = req.body;

  // Find the project and the participant group (project ID, group ID, participant ID)
  const project = await Project.findOne(
    {
      _id: projectID,
      notifyToken: token,
      notifyExpires: { $gt: Date.now() },
    },
    { mobileUsers: 1, name: 1, notifyInformation: 1 }
  );

  // If there is no project, return non-authorized response
  if (!project) {
    return res.send("401");
  }

  let users = project.mobileUsers;

  let tokens;
  if (groupID) {
    // extract the IDs of other people in the group
    tokens = users
      .filter((user) => user && user.group && user.group.id === groupID)
      .filter((user) => user && user.id !== participantID)
      .map((user) => ({
        id: user.id,
        token: user.token,
        group: user.group,
        username: user.username,
      }));
  } else {
    if (participantID) {
      // extract the ID of only one participant
      tokens = users
        .filter((user) => user && user.id === participantID)
        .map((user) => ({
          id: user.id,
          token: user.token,
          group: user.group,
          username: user.username,
        }));
    } else {
      return res.send("401");
    }
  }

  if (!tokens || tokens.length === 0) {
    return res.send("401");
  }

  // Send a notification to the other people in the group (immediately)
  // Define the content of the notification
  const content = {
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
  };
  const timestampSent = Date.now();

  let messages = [];
  for (let pushToken of tokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken.token)) {
      console.error(
        `Push token ${pushToken.token} is not a valid Expo push token`
      );
      continue;
    }

    // calculate what is the batch number by looking at how many notifications were sent for the project
    const countRecords = await Result.where({
      project: projectID,
      samplyid: pushToken.id,
    }).countDocuments();
    const batch = countRecords + 1;

    const messageId = makeRandomCodeForMessageID();
    const customizedUrl = content.url
      .replace("%SAMPLY_ID%", pushToken.id)
      .replace("%PARTICIPANT_CODE%", pushToken.username)
      .replace("%GROUP_CODE%", groupID)
      .replace("%MESSAGE_ID%", messageId)
      .replace("%TIMESTAMP_SENT%", timestampSent)
      .replace("%BATCH%", batch);
    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
    messages.push({
      to: pushToken.token,
      sound: "default",
      title: content.title,
      body: content.message,
      data: {
        title: content.title,
        message: content.message,
        url: customizedUrl,
        messageId,
        expireAt: expireIn ? Date.now() + parseInt(expireIn * 1000 * 60) : null,
      },
      id: pushToken.id,
      priority: "high",
      channelId: "default",
      _displayInForeground: true,
      batch: batch,
      categoryId: projectID, // Use the study ID as the category ID
    });
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).

  let chunks = expo.chunkPushNotifications(messages);
  // let tickets = [];

  await Promise.all(
    chunks.map(async (chunk) => {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      ticketChunk.map(async (ticket, i) => {
        const result = new Result({
          project: projectID,
          project_name: project.name,
          samplyid: chunk[i].id,
          data: chunk[i].data,
          ticket: ticket,
          messageId: chunk[i].data.messageId,
          events: [{ status: "sent", created: Date.now() }],
          batch: chunk[i].batch,
        });
        await result.save();
      });
    })
  );

  res.send();
};

// const makeRandomCodeForMessageID = () => {
//   return "mes-xxx-xxx-xxx-xxx".replace(/[xy]/g, function (c) {
//     var r = (Math.random() * 16) | 0,
//       v = c == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

const makeRandomCodeForMessageID = () => {
  return nanoid(15);
};
