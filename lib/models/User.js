const pool = require('../utils/pool');

module.exports = class User {
  userId;
  userEmail;
  hashedUserPassword;

  constructor(rows) {
    this.userId = rows.id;
    this.userEmail = rows.email;
    this.hashedUserPassword = rows.password;
  }


  static async findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);

    if (rows.length === 0) return null;
    return new User(rows[0]);
  }

  static async createUser(email, password) {
    const { rows } = await pool.query(
      'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
      [email, password]
    );

    return new User(rows[0]);
  }
};
