const { Category } = require("../database");
const { BadRequestError, NotFoundError } = require("../utils/AppError");

class CategoryService {
  static instance;

  static getInstance() {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async createCategory(userId, { name, type }) {
    if (!name || !type) throw new BadRequestError("Name and type are required");
    const category = await Category.create({ user: userId, name, type });
    return category;
  }

  async getCategories(userId) {
    const categories = await Category.find({ user: userId }).sort({
      createdAt: -1,
    });
    return categories;
  }

  async updateCategory(userId, categoryId, data) {
    const category = await Category.findOneAndUpdate(
      { _id: categoryId, user: userId },
      data,
      { new: true }
    );
    if (!category) throw new NotFoundError("Category not found");
    return category;
  }

  async deleteCategory(userId, categoryId) {
    const category = await Category.findOneAndDelete({
      _id: categoryId,
      user: userId,
    });
    if (!category) throw new NotFoundError("Category not found");
    return category;
  }
}

module.exports = CategoryService.getInstance();
