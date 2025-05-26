const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Import model factories
const defineUser = require('./User');
const definePackage = require('./Package');

// Define models
const User = defineUser(sequelize, DataTypes);
const Package = definePackage(sequelize, DataTypes);

// Set up associations
User.hasMany(Package);
Package.belongsTo(User);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Package,
};
