const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");
const { nanoid } = require("nanoid");

const receiptSchema = new mongoose.Schema({
  receiptId: String,
  created: {
    type: Date,
    default: Date.now
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project"
  },
  payer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You must supply a payer!"
  },
  payee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You must supply a payee!"
  },
  status: String,
  paymentInfo: {
    eventId: String,
    currency: String,
    amount: Number,
    fee: Number,
    url: String
  }
});

module.exports = mongoose.model("Receipt", receiptSchema);
