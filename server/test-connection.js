require("dotenv").config();
const mongoose = require("mongoose");

console.log("Checking environment variables...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Found (starts with " + process.env.MONGO_URI.substring(0, 10) + "...)" : "Missing");

if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is undefined. Please check your .env file.");
    process.exit(1);
}

console.log("Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB!");
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection failed:", err.message);
        process.exit(1);
    });
