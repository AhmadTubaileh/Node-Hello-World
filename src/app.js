
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.routes");
const registerRoutes = require("./routes/register.routes");
const loginRoutes = require("./routes/login.routes");
const authMiddleware = require("./middleware/auth.middleware");

app.use(express.json());
app.use("/register",registerRoutes);
app.use("/login",loginRoutes);
app.use("/todo", authMiddleware, todoRoutes);

module.exports = app;