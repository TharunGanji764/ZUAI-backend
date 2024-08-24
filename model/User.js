const mongoose = require("mongoose");

const User = new mongoose.Schema({
  Username: { type: "string", required: true, unique: true },
  Email: { type: "string", required: true, unique: true },
  Password: { type: "string", required: true },
  Posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", User);
