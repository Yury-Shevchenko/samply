const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const resultSchema = new mongoose.Schema({
  messageId: String,
  created: {
    type: Date,
    default: Date.now
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project"
  },
  samplyid: String,
  data: {
    title: String,
    message: String,
    url: String,
    expireAt: Number // timestamp
  },
  ticket: JSON,
  events: [
    {
      status: String,
      created: Date,
      data: JSON
    }
  ], // sent, tapped
  project_name: String,
  batch: Number
});

function autopopulate(next) {
  this.populate("author");
  next();
}

resultSchema.pre("find", autopopulate);
resultSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Result", resultSchema);
