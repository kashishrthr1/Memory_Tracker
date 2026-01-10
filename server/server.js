require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
// Cron job removed - decay is now calculated at read time instead of daily updates

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
