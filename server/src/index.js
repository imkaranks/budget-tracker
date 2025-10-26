require("dotenv").config();

const { dbConnect, seedDatabase } = require("./database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await dbConnect();
    // await seedDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
