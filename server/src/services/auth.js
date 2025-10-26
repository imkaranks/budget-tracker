const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../database");
const { BadRequestError, NotFoundError } = require("../utils/AppError");

class AuthService {
  static instance;

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  }

  async registerUser({ name, email, password }) {
    if (!name || !email || !password) {
      throw new BadRequestError("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const user = await User.create({ name, email, password });
    const token = this.generateToken(user._id);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new BadRequestError("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestError("Invalid email or password");

    const token = this.generateToken(user._id);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async getMe(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}

module.exports = AuthService.getInstance();
