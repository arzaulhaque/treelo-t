const { Pool } = require('pg');

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error(
    'Missing DATABASE_URL. Set it in server/.env to your Neon connection string.'
  );
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    // Neon issues certificates from a trusted CA so full verification is safe.
    // If you see self-signed cert errors in a custom environment, set
    // rejectUnauthorized to false and consult your certificate setup.
    rejectUnauthorized: true,
  },
  // Pool tuning – keep a small warm pool and avoid long-lived idle connections.
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

module.exports = pool;