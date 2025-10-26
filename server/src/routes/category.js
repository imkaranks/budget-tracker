const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { protect } = require("../middlewares/auth");
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(protect, createCategory)
  .get(protect, getCategories);

categoryRouter
  .route("/:id")
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = categoryRouter;
