const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const promisify = require("es6-promisify");
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const rateLimit = require("express-rate-limit");
const routes = require("./routes/index");
const apiRoutesAuthRouter = require("./routes/api/auth");
const apiRoutesParticipants = require("./routes/api/participants");
const apiRoutesNotifications = require("./routes/api/notifications");
const apiRoutesJobs = require("./routes/api/jobs");
const helpers = require("./helpers");
const errorHandlers = require("./handlers/errorHandlers");
require("./handlers/passport");
const language = require("./config/lang");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const paymentController = require("./controllers/paymentController");
const jobController = require("./controllers/jobController");
const crypto = require("crypto");

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

const hookLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

const app = express();
app.set("views", path.join(__dirname, "views")); // this is the folder where we keep our pug files
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too
app.use(express.static("public"));

// webhook for payment events with stripe
app.post(
  "/payment/webhook",
  bodyParser.raw({ type: "*/*" }),
  paymentController.webhook
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));
app.use(expressValidator());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, sameSite: "lax" }, // 7 days
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  const noncevalue = crypto.randomBytes(20).toString("hex");
  res.setHeader(
    "Content-Security-Policy",
    `worker-src http://localhost https://samply.uni-konstanz.de; script-src https://samply.uni-konstanz.de 'nonce-${noncevalue}'`
  );
  // CORS is needed only for the mobile app API routes — not for web pages
  if (req.path.startsWith("/api/") || req.path.startsWith("/webapi/")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  }
  res.locals.noncevalue = noncevalue;
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  res.locals.visitor_language = req.session && req.session.visitor_language;
  const path = String(req.path).split("/")[1] || "index";

  if (
    res.locals.user != null &&
    res.locals.user.language &&
    language[res.locals.user.language]
  ) {
    res.locals.l =
      language[res.locals.user.language][path] || language["english"][path];
    res.locals.layout =
      language[res.locals.user.language]["layout"] ||
      language["english"]["layout"];
    res.locals.language = res.locals.user.language.substring(0, 2);
    if (res.locals.language == "ge") {
      res.locals.language = "de";
    }
  } else {
    if (res.locals.visitor_language) {
      const visitor_lang = res.locals.visitor_language;
      res.locals.locale_language = visitor_lang || "english";
      res.locals.l = language[visitor_lang][path] || language["english"][path];
      res.locals.layout =
        language[visitor_lang]["layout"] || language["english"]["layout"];
      res.locals.language = visitor_lang.substring(0, 2);
      if (res.locals.language == "ge") {
        res.locals.language = "de";
      }
    } else {
      if (req.headers && req.headers["accept-language"]) {
        const lang = req.headers["accept-language"].slice(0, 2);
        if (lang == "de") {
          res.locals.locale_language = "german";
          res.locals.l = language["german"][path];
          res.locals.layout = language["german"]["layout"];
          res.locals.language = "de";
        } else if (lang == "nl") {
          res.locals.locale_language = "dutch";
          res.locals.l = language["dutch"][path];
          res.locals.layout = language["dutch"]["layout"];
          res.locals.language = "nl";
        } else {
          res.locals.locale_language = "english";
          res.locals.l = language["english"][path];
          res.locals.layout = language["english"]["layout"];
          res.locals.language = "en";
        }
      }
    }
  }
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
// Apply rate limiting before routes
app.use("/auth/", authLimiter);
app.use("/account/forgot", authLimiter);
app.use("/account/reset", authLimiter);
app.use("/api/login", authLimiter);
app.use("/api/createaccount", authLimiter);
app.use("/api/reset", authLimiter);
app.use("/api/notify", hookLimiter);
app.use("/api/", apiLimiter);
app.use("/webapi/", apiLimiter);

app.use("/", routes);

app.use("/webapi/v1/auth", apiRoutesAuthRouter.router);
app.use("/webapi/v1/participants", apiRoutesParticipants);
app.use("/webapi/v1/notifications", apiRoutesNotifications);
app.use("/webapi/v1/jobs", apiRoutesJobs);

app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);
if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);

module.exports = app;
