const mongoose = require("mongoose");
const User = require("../models/user");

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

const seedUser = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("✅ Users seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    throw err;
  }
};

module.exports = { users, seedUser };
