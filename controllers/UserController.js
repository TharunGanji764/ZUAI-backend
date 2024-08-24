const UserModel = require("../model/User");
const dotenv = require("dotenv");
dotenv.config();
const jwtToken = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const UserExists = await UserModel.findOne({ Username: username });
    if (UserExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new UserModel({
      Username: username,
      Email: email,
      Password: password,
    });
    await newUser.save();
    return res.status(200).json({ message: "User Registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await UserModel.findOne({ Username: username });
    if (!findUser) {
      return res.status(400).json({ error: "User not found" });
    }
    if (password !== findUser.Password) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    const payload = {
      username: findUser.Username,
    };
    const jwt = jwtToken.sign(payload, secretKey);
    return res.status(200).json({ jwt });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("Posts");
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { Register, Login, getUsers };
