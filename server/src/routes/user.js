const express = require("express");
const { getUserById } = require("../controllers/user");
const { protect } = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.route("/:id").get(protect, getUserById);

module.exports = userRouter;
