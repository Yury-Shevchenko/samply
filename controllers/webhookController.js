const axios = require("axios");
const mongoose = require("mongoose");
const { URL } = require("url");
const Project = mongoose.model("Project");

const PRIVATE_IP_RE =
  /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|169\.254\.|::1|fc00:|fd)/i;

function isSafeWebhookUrl(raw) {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    const host = parsed.hostname;
    if (PRIVATE_IP_RE.test(host)) return false;
    if (host === "localhost") return false;
    return true;
  } catch {
    return false;
  }
}

exports.triggerWebhook = async ({ projectId, event, data }) => {
  const project = await Project.findOne(
    { _id: projectId },
    {
      settings: 1,
    }
  );

  if (!project || !project.settings) return;

  const { enableWebhooks, webhookEndpoint, webhookEvents } = project.settings;

  if (
    enableWebhooks &&
    webhookEndpoint &&
    isSafeWebhookUrl(webhookEndpoint) &&
    webhookEvents.length &&
    webhookEvents.includes(event)
  ) {
    const payload = {
      event,
      data,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(webhookEndpoint, payload, { timeout: 5000 });
      // console.log(`Webhook sent successfully to ${webhookEndpoint}`);
    } catch (error) {
      console.error(
        `Failed to send webhook to ${webhookEndpoint}:`,
        error.message
      );
    }
  }
};
