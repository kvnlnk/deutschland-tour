import pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "deutschland_tour",
  user: "tour",
  password: "tour_dev_2026",
  max: 10,
  idleTimeoutMillis: 30000,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export function initDb() {
  console.log("🗄️  PostgreSQL connected (localhost:5432/deutschland_tour)");
  return pool;
}

export { pool };
