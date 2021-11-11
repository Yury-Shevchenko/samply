const mongoose = require("mongoose");
const papaparse = require("papaparse");
const fs = require("fs");
const stream = require("stream");
const flatMap = require("flatmap");

const User = mongoose.model("User");
const Receipt = mongoose.model("Receipt");

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const DOMAIN =
  process.env.NODE_ENV == "production"
    ? "https://samply.uni-konstanz.de"
    : "http://localhost";

const { nanoid } = require("nanoid");

// create a stripe account link
exports.createAccountLink = async (req, res) => {
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

  res.redirect(accountLinks.url);
};

exports.webhook = async (req, res) => {
  let event;
  const endpointSecret =
    process.env.NODE_ENV == "production"
      ? process.env.STRIPE_WEBHOOK_KEY
      : process.env.STRIPE_WEBHOOK_KEY_DEV;
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
    // participant account is created
    case "account.updated":
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

    // payment to participant completed
    case "charge.succeeded":
      const session = event.data.object;
      // find participant
      const stripeAccount = session.destination;
      const receiptEmail = session.receipt_email;
      if (!stripeAccount || !receiptEmail) {
        return;
      }
      const payer = await User.findOne({ email: receiptEmail }, { _id: 1 });
      const payee = await User.findOne(
        { stripeAccountId: stripeAccount },
        { _id: 1 }
      );
      // create new receipt
      const receipt = await new Receipt({
        receiptId: nanoid(8),
        payer: payer._id,
        payee: payee._id,
        status: "charge.succeeded",
        paymentInfo: {
          eventId: event.id,
          currency: session.currency,
          amount: session.amount,
          fee: session.application_fee_amount,
          url: session.receipt_url
        }
      }).save();
      break;

    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
  res.send();
};

exports.payoutToParticipant = async (req, res) => {
  const participant = await User.findOne(
    { samplyId: req.params.id },
    {
      name: 1,
      email: 1,
      stripeAccountId: 1,
      stripeInformation: 1
    }
  );
  res.render("payout", { participant: participant, samplyid: req.params.id });
};

exports.receiptsToParticipant = async (req, res) => {
  // find receipts
  const participant = await User.findOne(
    { samplyId: req.params.id },
    {
      name: 1,
      email: 1,
      stripeAccountId: 1,
      stripeInformation: 1
    }
  );
  const receipts = await Receipt.find(
    { payee: participant._id, payer: req.user._id },
    { created: 1, receiptId: 1, status: 1, paymentInfo: 1 }
  );
  res.render("receipts", {
    participant: participant,
    receipts: receipts,
    samplyid: req.params.id
  });
};

exports.createcheckoutsession = async (req, res) => {
  const amount = parseInt(parseFloat(req.body.amount.replace(",", ".")) * 100);

  if (!amount) {
    req.flash("error", `Enter the valid amount to pay!`);
    res.redirect("back");
    return;
  }
  // calculate the platform fee (5% including Stripe fees)
  const platformCommission = parseInt(amount / 20);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: req.user.email,
    line_items: [
      {
        name: "Samply",
        amount,
        currency: req.body.currency,
        quantity: 1
      }
    ],
    payment_intent_data: {
      application_fee_amount: platformCommission,
      transfer_data: {
        destination: req.body.stripeAccountId
      }
    },
    mode: "payment",
    success_url: `${DOMAIN}/payout/${req.body.samplyid}/`,
    cancel_url: `${DOMAIN}/payout/${req.body.samplyid}/`
  });
  res.redirect(303, session.url);
};

// download receipts for a participant
exports.downloadReceipts = async (req, res) => {
  const participant = await User.findOne(
    { samplyId: req.params.id },
    {
      _id: 1
    }
  );
  let keys = [];
  const name = "Receipts";
  res.setHeader("Content-disposition", "attachment; filename=" + name + ".csv");
  const input = new stream.Readable({ objectMode: true });
  input._read = () => {};
  var cursor = await Receipt.find(
    { payee: participant._id, payer: req.user._id },
    { created: 1, receiptId: 1, status: 1, paymentInfo: 1 }
  )
    .cursor()
    .on("data", obj => {
      if (obj) {
        let data = {};
        const line = [
          {
            receiptId: obj.receiptId,
            status: obj.status,
            date: obj.created,
            currency: obj.paymentInfo.currency,
            amount: obj.paymentInfo.amount,
            fee: obj.paymentInfo.fee,
            url: obj.paymentInfo.url
          }
        ];
        const preKeys = flatMap(line, function(e) {
          return Object.keys(e);
        });
        const tempkeys = Array.from(new Set(preKeys));
        const new_items = tempkeys.filter(x => !keys.includes(x));
        let parsed;
        if (new_items.length > 0) {
          keys = keys.concat(new_items);
          parsed = papaparse.unparse({ data: line, fields: keys }) + "\r\n";
        } else {
          const preparsed =
            papaparse.unparse({ data: line, fields: keys }) + "\r\n";
          parsed = preparsed.replace(/(.*\r\n)/, "");
        }
        input.push(parsed);
      }
    })
    .on("end", function() {
      input.push(null);
    })
    .on("error", function(err) {
      console.log(err);
    });
  const processor = input.pipe(res);
};
