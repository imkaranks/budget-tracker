const { User } = require("../database");
const { NotFoundError } = require("../utils/AppError");

class UserService {
  static instance;

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUserById(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}

module.exports = UserService.getInstance();
