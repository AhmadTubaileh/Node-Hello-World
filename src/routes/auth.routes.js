const express = require("express");
const router = express.Router();
const users = require("../data/users");
const jws = require("jsonwebtoken");
const registerSchema = require("../schemas/auth.schema");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = users.find((u) => email === u.email);

    if (!user) {
      return res.status(404).json({
        msg: "Email not found",
      });
    } else {
      return res.status(401).json({
        msg: "Password mismatch",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      },
    );

    res.json({
      msg: "Logged in successfully",
      token: token,
    });
  } else {
    res.status(400).json({
      msg: "Email and Password must be provided.",
    });
  }
});

router.post("/register", (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      msg: result.error.issues[0].message,
      code: result.error.issues[0].code,
    });
  }
  const {email,password} = result.data;
  const newUser = {
    email: email,
    password: password,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
