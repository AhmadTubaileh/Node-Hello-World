const express = require("express");
const registerSchema = require("../schemas/auth.schema");
const router = express.Router();
const users = require("../data/users");

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:email", (req, res) => {
  const email = req.params.email;
  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(404).json({
      msg: "user not found",
    });
  }
  res.json(user);
});

router.post("/", (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      msg: result.error.issues[0].message,
      code: result.error.issues[0].code,
    });
  }

  const { email, password } = result.data;
  const newUser = {
    email: email,
    password: password,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.delete("/:email", (req, res) => {
  const email = req.params.email;
  const index = users.findIndex((user) => user.email === email);

  if (index === -1) {
    return res.status(404).json({
      msg: "email not found",
    });
  }
  users.splice(index, 1);
  res.json({
    msg: "Deleted successfully",
  });
});

module.exports = router;
