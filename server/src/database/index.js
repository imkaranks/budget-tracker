module.exports = {
  dbConnect: require("./connect"),
  seedDatabase: require("./seed"),
  Budget: require("./models/budget"),
  Category: require("./models/category"),
  Transaction: require("./models/transaction"),
  User: require("./models/user"),
};
