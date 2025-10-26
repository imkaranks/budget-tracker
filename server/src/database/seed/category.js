const mongoose = require("mongoose");
const Category = require("../models/category");
const { users } = require("./user");

const categories = [
  {
    _id: new mongoose.Types.ObjectId("68f11e18b04cd93e25621daa"),
    user: users[0]._id,
    name: "Salary",
    type: "income",
  },
  {
    _id: new mongoose.Types.ObjectId("68f22e18b04cd93e25621dab"),
    user: users[0]._id,
    name: "Groceries",
    type: "expense",
  },
  {
    _id: new mongoose.Types.ObjectId("68f33e18b04cd93e25621dac"),
    user: users[1]._id,
    name: "Freelance",
    type: "income",
  },
  {
    _id: new mongoose.Types.ObjectId("68f44e18b04cd93e25621dad"),
    user: users[1]._id,
    name: "Rent",
    type: "expense",
  },
];

const seedCategory = async () => {
  try {
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("✅ Category seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding category:", err);
    throw err;
  }
};

module.exports = { categories, seedCategory };
