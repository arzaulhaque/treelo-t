const { Pool } = require('pg');

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error(
    'Missing DATABASE_URL. Set it in server/.env to your Neon *Direct* connection string.'
  );
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    // Neon requires TLS; this disables cert verification (common for Neon examples).
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;