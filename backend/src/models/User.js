const db = require('../config/db');

class User {
  constructor(email, publicKey, passwordHash) {
    this.email = email;
    this.publicKey = publicKey;
    this.passwordHash = passwordHash;
  }

  static async create(user) {
    const query = `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, created_at
    `;
    const values = [user.email, user.passwordHash];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query('SELECT id, email, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = User;