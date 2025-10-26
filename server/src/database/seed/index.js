/*
const mongoose = require("mongoose");
const { User, Budget, Category, Transaction } = require("../database");

const users = [
  {
    _id: new mongoose.Types.ObjectId("68e22e18b04cd93e25621dac"),
    name: "John Doe",
    email: "john@example.com",
    password: "$2b$10$6ucD7TansSdHxtixMEMbY.3qPZ9NLLkZbgcwFirKJdtakMf65bx2.",
  },
  {
    _id: new mongoose.Types.ObjectId("68e74ed9631738788a6dff5e"),
    name: "Jane Doe",
    email: "jane@example.com",
    password: "$2b$10$6ucD7TansSdHxtixMEMbY.3qPZ9NLLkZbgcwFirKJdtakMf65bx2.",
  },
];

const budgets = [
  {
    user: users[0]._id,
    month: 10,
    year: 2025,
    amount: 5000,
  },
  {
    user: users[1]._id,
    month: 10,
    year: 2025,
    amount: 7000,
  },
];

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

const transactions = [
  {
    user: users[0]._id,
    category: categories[0]._id,
    type: "income",
    amount: 3000,
    description: "October salary",
    date: new Date("2025-10-01"),
  },
  {
    user: users[0]._id,
    category: categories[1]._id,
    type: "expense",
    amount: 250,
    description: "Weekly groceries",
    date: new Date("2025-10-05"),
  },
  {
    user: users[1]._id,
    category: categories[2]._id,
    type: "income",
    amount: 1500,
    description: "Freelance project",
    date: new Date("2025-10-03"),
  },
  {
    user: users[1]._id,
    category: categories[3]._id,
    type: "expense",
    amount: 1200,
    description: "October rent",
    date: new Date("2025-10-02"),
  },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany();
    await Budget.deleteMany();
    await Category.deleteMany();
    await Transaction.deleteMany();
    await User.insertMany(users);
    await Budget.insertMany(budgets);
    await Category.insertMany(categories);
    await Transaction.insertMany(transactions);
    console.log("✅ Database seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    throw err;
  }
};

module.exports = { users, budgets, categories, transactions, seedDatabase };
*/

const { seedUser } = require("./user");
const { seedBudget } = require("./budget");
const { seedCategory } = require("./category");
const { seedTransaction } = require("./transaction");

const seedDatabase = async () => {
  try {
    await seedUser();
    await seedBudget();
    await seedCategory();
    await seedTransaction();
    console.log("✅ Database seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    throw err;
  }
};

module.exports = seedDatabase;
