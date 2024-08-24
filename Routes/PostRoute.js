const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostsController");
const authenticate = require("../middleware/authMiddleware");

router.post("/posts", authenticate, PostController.createPost);
router.get("/posts", authenticate, PostController.getPosts);
router.get("/posts/:id", authenticate, PostController.getSpecificPost);
router.put("/posts/:id", authenticate, PostController.updatePost);
router.delete("/posts/:id", authenticate, PostController.deletePost);

module.exports = router;
