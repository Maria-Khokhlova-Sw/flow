require('dotenv').config();
const db = require('./src/config/db');

async function test() {
  await db.connect();
  const res = await db.query('SELECT NOW()');
  console.log('📅 Текущее время в БД:', res.rows[0].now);
}

test();