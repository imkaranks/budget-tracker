const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/auth");
const { protect } = require("../middlewares/auth");
const { validate } = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validators/auth");
const authRouter = express.Router();

authRouter.route("/register").post(validate(registerSchema), registerUser);

authRouter.route("/login").post(validate(loginSchema), loginUser);

authRouter.route("/me").get(protect, getMe);

module.exports = authRouter;
