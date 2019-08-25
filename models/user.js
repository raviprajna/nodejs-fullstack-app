'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    user_city: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Hotel, {
        foreignKey: 'hotel_id',
        as: 'hotels'
      });
    };
  return User;
};