module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Package', {
    description: DataTypes.STRING,
    trackingNumber: DataTypes.STRING,
  }, {
    paranoid: true  // 👈 enables soft deletes
  });
};
