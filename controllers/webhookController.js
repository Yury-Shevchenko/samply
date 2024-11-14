const axios = require("axios");
const mongoose = require("mongoose");
const Project = mongoose.model("Project");

exports.triggerWebhook = async ({ projectId, event, data }) => {
  const project = await Project.findOne(
    { _id: projectId },
    {
      settings: 1,
    }
  );

  const { enableWebhooks, webhookEndpoint, webhookEvents } = project.settings;

  if (
    enableWebhooks &&
    webhookEndpoint &&
    webhookEvents.length &&
    webhookEvents.includes(event)
  ) {
    const payload = {
      event,
      data,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(webhookEndpoint, payload);
      // console.log(`Webhook sent successfully to ${webhookEndpoint}`);
    } catch (error) {
      console.error(
        `Failed to send webhook to ${webhookEndpoint}:`,
        error.message
      );
    }
  }
};
