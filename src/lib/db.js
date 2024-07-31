// src/lib/db.ts
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'venuchander',
  host: 'localhost',
  database: 'tsoc',
  password: 'Postgrespro',
  port: 5432,
});

export default pool;
