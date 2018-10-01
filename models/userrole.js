'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};