const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const registerSchema = require("../schemas/auth.schema");
const pool = require("../database/db");

async function getUser(email) {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result;
}

async function insertUser(email, password) {
  const result = await pool.query(
    `
    INSERT INTO users (email,password)
    VALUES ($1,$2)
    RETURNING *
    `,
    [email, password],
  );
  return result;
}

router.post("/login", async (req, res) => {
  const zodResult = registerSchema.safeParse(req.body);

  if (!zodResult.success) {
    return res.status(400).json({
      msg: zodResult.error.issues[0].message,
    });
  }
  const { email, password } = zodResult.data;
  const getUserResult = await getUser(email);
  const user = getUserResult.rows[0];

  if (!user) {
    return res.status(404).json({
      msg: "Email not found",
    });
  } else if (user.password !== password) {
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
});

router.post("/register", async (req, res) => {
  const zodResult = registerSchema.safeParse(req.body);

  if (!zodResult.success) {
    return res.status(400).json({
      msg: zodResult.error.issues[0].message,
      code: zodResult.error.issues[0].code,
    });
  }
  const { email, password } = zodResult.data;
  const newUser = {
    email: email,
    password: password,
  };

  const insertUserResult = await insertUser(email, password);
  console.log(insertUserResult.rows[0]);

  res.status(201).json(newUser);
});

module.exports = router;
