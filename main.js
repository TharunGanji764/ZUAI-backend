require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./Routes/UserRoute");
const PostRoutes = require("./Routes/PostRoute");

app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const MongoUrl = process.env.MONGO_URI;

mongoose
  .connect(MongoUrl)
  .then(() => console.log("DB connected....."))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use("/user", userRoutes);
app.use(PostRoutes);

app.listen(port, () => {
  console.log("Server Running....");
});
