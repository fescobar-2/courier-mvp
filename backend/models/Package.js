const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./User');

const Package = sequelize.define('Package', {
  trackingCode: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'received' },
  weight: { type: DataTypes.FLOAT },
  flightDate: { type: DataTypes.DATE },
});

Package.belongsTo(User);
User.hasMany(Package);

module.exports = Package;