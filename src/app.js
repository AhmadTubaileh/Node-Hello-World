const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", authMiddleware, todoRoutes);


module.exports = app;
