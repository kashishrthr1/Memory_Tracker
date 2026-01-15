const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Aapka Vite frontend URL
  credentials: true,               // Authorization headers allow karne ke liye
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/topics", require("./routes/topicRoutes"));
app.use("/api/contact", require("./routes/contact"));



module.exports = app;
