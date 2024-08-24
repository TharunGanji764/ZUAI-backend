const PostModel = require("../model/Post");
const UserModel = require("../model/User");
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage: storage });

const createPost = async (req, res) => {
  try {
    const { username } = req;
    const { title, author, topic, content } = req.body;
    const image = req.file ? req.file.path : null;
    const findUser = await UserModel.findOne({ Username: username });
    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const newPost = new PostModel({
      Title: title,
      Author: author,
      Topic: topic,
      Image: image,
      Content: content,
      UserId: findUser._id,
    });
    await newPost.save();
    findUser.Posts.push(newPost);
    await findUser.save();
    return res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const { username } = req;
    const findUser = await UserModel.findOne({ Username: username });
    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await PostModel.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSpecificPost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await PostModel.findById(id);
    if (!findPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(findPost);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, topic, content } = req.body;
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        Title: title,
        Author: author,
        Topic: topic,
        Content: content,
      },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost: [upload.single("image"), createPost],
  getPosts,
  getSpecificPost,
  updatePost,
  deletePost,
};
