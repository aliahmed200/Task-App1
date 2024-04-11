const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/connnectDB.js");
const Task = require("./models/taskModel.js");
const App = express();
const taskRoutes = require("./Routes/taskRoutes.js");

//middle ware
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

App.use(
  cors({
    origin: ["http://localhost:3000", "http://Task-App.onrender.com"],
  })
);

App.use("/api/tasks", taskRoutes);

// Routes
App.get("/", (req, res) => {
  res.send("home page");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    App.listen(PORT, () => {
      console.log(`server running on  port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
