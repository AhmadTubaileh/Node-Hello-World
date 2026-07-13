
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.routes");
const loginRoutes = require("./routes/login.routes");

app.use(express.json());
app.use("/login",loginRoutes);
app.use("/todo",todoRoutes);

module.exports = app;