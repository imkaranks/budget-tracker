const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const { users } = require("./user");
const { categories } = require("./category");

const randomDate = (year, month) => {
  const day = Math.floor(Math.random() * 28) + 1; // 1-28 to avoid month overflow
  return new Date(year, month - 1, day);
};

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

// const transactions = [
//   {
//     user: users[0]._id,
//     category: categories[0]._id,
//     type: "income",
//     amount: 3000,
//     description: "October salary",
//     date: new Date("2025-10-01"),
//   },
//   {
//     user: users[0]._id,
//     category: categories[1]._id,
//     type: "expense",
//     amount: 250,
//     description: "Weekly groceries",
//     date: new Date("2025-10-05"),
//   },
//   {
//     user: users[1]._id,
//     category: categories[2]._id,
//     type: "income",
//     amount: 1500,
//     description: "Freelance project",
//     date: new Date("2025-10-03"),
//   },
//   {
//     user: users[1]._id,
//     category: categories[3]._id,
//     type: "expense",
//     amount: 1200,
//     description: "October rent",
//     date: new Date("2025-10-02"),
//   },
// ];

const transactions = [
  // John Doe - current month
  {
    user: users[0]._id,
    category: categories[0]._id,
    type: "income",
    amount: 3000,
    description: "Salary",
    date: randomDate(currentYear, currentMonth),
  },
  {
    user: users[0]._id,
    category: categories[1]._id,
    type: "expense",
    amount: 250,
    description: "Weekly groceries",
    date: randomDate(currentYear, currentMonth),
  },
  {
    user: users[0]._id,
    category: categories[1]._id,
    type: "expense",
    amount: 150,
    description: "Snacks",
    date: randomDate(currentYear, currentMonth),
  },

  // John Doe - previous month
  {
    user: users[0]._id,
    category: categories[0]._id,
    type: "income",
    amount: 1000,
    description: "Bonus",
    date: randomDate(prevYear, prevMonth),
  },
  {
    user: users[0]._id,
    category: categories[1]._id,
    type: "expense",
    amount: 400,
    description: "Monthly groceries",
    date: randomDate(prevYear, prevMonth),
  },
  {
    user: users[0]._id,
    category: categories[1]._id,
    type: "expense",
    amount: 200,
    description: "Grocery top-up",
    date: randomDate(prevYear, prevMonth),
  },

  // Jane Doe - current month
  {
    user: users[1]._id,
    category: categories[2]._id,
    type: "income",
    amount: 1500,
    description: "Freelance project",
    date: randomDate(currentYear, currentMonth),
  },
  {
    user: users[1]._id,
    category: categories[3]._id,
    type: "expense",
    amount: 1200,
    description: "Rent",
    date: randomDate(currentYear, currentMonth),
  },
  {
    user: users[1]._id,
    category: categories[2]._id,
    type: "income",
    amount: 800,
    description: "Extra freelance work",
    date: randomDate(currentYear, currentMonth),
  },
  {
    user: users[1]._id,
    category: categories[3]._id,
    type: "expense",
    amount: 100,
    description: "Utilities",
    date: randomDate(currentYear, currentMonth),
  },

  // Jane Doe - previous month
  {
    user: users[1]._id,
    category: categories[3]._id,
    type: "expense",
    amount: 1200,
    description: "Rent",
    date: randomDate(prevYear, prevMonth),
  },
  {
    user: users[1]._id,
    category: categories[2]._id,
    type: "income",
    amount: 500,
    description: "Freelance side gig",
    date: randomDate(prevYear, prevMonth),
  },
  {
    user: users[1]._id,
    category: categories[3]._id,
    type: "expense",
    amount: 150,
    description: "Groceries",
    date: randomDate(prevYear, prevMonth),
  },
  {
    user: users[1]._id,
    category: categories[3]._id,
    type: "expense",
    amount: 200,
    description: "Maintenance",
    date: randomDate(prevYear, prevMonth),
  },
];

const seedTransaction = async () => {
  try {
    await Transaction.deleteMany();
    await Transaction.insertMany(transactions);
    console.log("✅ Database seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    throw err;
  }
};

module.exports = { transactions, seedTransaction };
