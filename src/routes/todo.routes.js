const express = require("express");
const router = express.Router();

const todo = [];

router.get("/", (req, res) => {
  res.send(todo);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = todo.find((task) => task.id === id);

  if (!task) {
    res.status(404).json({
      msg: "task not found.",
    });
  }
  res.json(task);
});

router.post("/", (req, res) => {
  if (req.body.task) {
    const newTask = {
      id: todo.length + 1,
      taskName: req.body.task,
    };

    todo.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({
      msg: "task is missing",
    });
  }
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskName = req.body.task;

  const task = todo.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({
      msg: "task not found",
    });
  }

  if (taskName) {
    task.taskName = taskName;
  }

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todo.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      msg: "task not found",
    });
  }
  todo.splice(index, 1);
  res.json({
    msg: "Deleted successfully",
  });
});

module.exports = router;
