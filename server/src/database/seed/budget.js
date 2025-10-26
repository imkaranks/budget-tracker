const mongoose = require("mongoose");
const Budget = require("../models/budget");
const { users } = require("./user");

// Get current month and year
const now = new Date();
const currentMonth = now.getMonth() + 1; // JS months are 0-indexed
const currentYear = now.getFullYear();

// Previous month calculation
let prevMonth = currentMonth - 1;
let prevYear = currentYear;
if (prevMonth === 0) {
  prevMonth = 12;
  prevYear -= 1;
}

// const budgets = [
//   {
//     user: users[0]._id,
//     month: 10,
//     year: 2025,
//     amount: 5000,
//   },
//   {
//     user: users[1]._id,
//     month: 10,
//     year: 2025,
//     amount: 7000,
//   },
// ];

const budgets = [
  { user: users[0]._id, month: currentMonth, year: currentYear, amount: 5000 },
  { user: users[1]._id, month: currentMonth, year: currentYear, amount: 7000 },
];

const seedBudget = async () => {
  try {
    await Budget.deleteMany();
    await Budget.insertMany(budgets);
    console.log("✅ Budget seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding budget:", err);
    throw err;
  }
};

module.exports = { budgets, seedBudget };
