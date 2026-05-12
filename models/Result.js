const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const resultSchema = new mongoose.Schema({
  messageId: String,
  created: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
  },
  samplyid: String,
  data: {
    title: String,
    message: String,
    url: String,
    expireAt: Number, // timestamp
  },
  ticket: JSON,
  events: [
    {
      status: String,
      created: Date,
      data: JSON,
    },
  ], // sent, tapped
  project_name: String,
  batch: Number,
  finid: String, // id that is connected to reminder jobs
});

// Indexes for the most common query patterns
resultSchema.index({ project: 1 });
resultSchema.index({ samplyid: 1 });
resultSchema.index({ project: 1, samplyid: 1 });
resultSchema.index({ project: 1, created: -1 });
resultSchema.index({ created: -1 });
resultSchema.index({ messageId: 1 });

module.exports = mongoose.model("Result", resultSchema);
