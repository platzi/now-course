// dependencies
const Sequelize = require('sequelize');

// constants
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT || 5432;

// db
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

/**
 * Model ToDo
 * @type {Object}
 */
const Todo = sequelize.define(
  'todo',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      unique: true,
    },
    content: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'completed', 'deleted'],
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  }
);

module.exports = {
  db: sequelize,
  Todo,
};
