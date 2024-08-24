const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.get("/getUsers", userController.getUsers);

module.exports = router;
