const mongoose = require("mongoose");
const Agenda = require("agenda");

// Make sure node 7.6+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major <= 7 && minor <= 5) {
  console.log(
    "You are on an older version of node. Please go to nodejs.org and download version 7.6 or greater."
  );
  process.exit();
}

// import environmental variables from variables.env file
require("dotenv").config({ path: "variables.env" });

// Connect to Database and handle bad connections
const databaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_DEV
    : process.env.DATABASE;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

//import all models
require("./models/User");
require("./models/Result");
require("./models/Project");
require("./models/Job");
require("./models/Receipt");
require("./models/PendingNotification");

// Start the notification cron
require("./services/notificationCron").start();

// Start the app
const app = require("./app");
app.set("port", process.env.PORT || 80);
// Bind to loopback only — Express is fronted by nginx in prod and called from
// the Next.js server action via localhost in dev. Keeping port 3000 off the
// public interface ensures endpoints like /auth/researcher/email/register
// can't be reached even if a firewall rule is missing.
const server = app.listen(app.get("port"), "127.0.0.1", () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
