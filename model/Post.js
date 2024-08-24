const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Topic: { type: String, required: true },
  Image: { type: String, required: false },
  Content: { type: String, required: true },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", Post);
