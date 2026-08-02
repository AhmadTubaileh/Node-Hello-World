const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // this is changed at production stage not development (due to certificate downgrade)
  },
});

module.exports = pool;
