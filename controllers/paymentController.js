const mongoose = require("mongoose");
const User = mongoose.model("User");

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const DOMAIN = "http://localhost";

// create a stripe account link
exports.createAccountLink = async (req, res) => {
  console.log("req.body", req.body);
  let accountId;
  if (req.body.stripeAccountId) {
    accountId = req.body.stripeAccountId;
  } else {
    const account = await stripe.accounts.create({
      type: "express",
      email: req.body.email
    });
    // update user
    accountId = account.id;
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        stripeAccountId: accountId
      },
      {}
    ).exec();
  }

  const accountLinks = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${DOMAIN}/account`,
    return_url: `${DOMAIN}/account`,
    type: "account_onboarding"
  });

  console.log("accountLinks", accountLinks);
  res.redirect(accountLinks.url);
};

exports.webhook = async (req, res) => {
  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_KEY_DEV;
  const signature = req.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }
  let subscription;
  let status;
  // Handle the event
  switch (event.type) {
    case "account.updated":
      // subscription = event.data.object;
      console.log("event.data", event.data);
      // check the user and update in the database if needed
      await User.findOneAndUpdate(
        { stripeAccountId: event.data.object.id },
        {
          stripeInformation: {
            charges_enabled: event.data.object.charges_enabled,
            details_submitted: event.data.object.details_submitted,
            payouts_enabled: event.data.object.payouts_enabled
          }
        },
        {}
      ).exec();

      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
  res.send();
};

exports.payoutToParticipant = async (req, res) => {
  res.render("payout", {});
};
