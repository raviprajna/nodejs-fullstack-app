'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    hotel_id: DataTypes.INTEGER,
    hotel_name: DataTypes.STRING,
    hotel_address: DataTypes.STRING
  }, {});
  Hotel.associate = function(models) {
      Hotel.belongsTo(models.User, {
        foreignKey: 'hotel_id'
      });
  };
  return Hotel;
};