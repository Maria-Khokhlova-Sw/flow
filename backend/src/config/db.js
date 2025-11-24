const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

client.on('error', (err) => {
  console.error('❌ PostgreSQL error:', err);
});

module.exports = {
  connect: async () => {
    try {
      await client.connect();
      console.log('✅ Подключено к PostgreSQL');
    } catch (err) {
      console.error('❌ Ошибка подключения к БД:', err);
      process.exit(1); // завершить, если БД недоступна
    }
  },
  query: (text, params) => client.query(text, params)
};