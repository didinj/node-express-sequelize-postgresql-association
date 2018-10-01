'use strict';
module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    company_id: DataTypes.INTEGER,
    branch_name: DataTypes.STRING,
    branch_address: DataTypes.STRING,
    branch_city: DataTypes.STRING
  }, {});
  Branch.associate = function(models) {
    Branch.belongsTo(models.Company, {
      foreignKey: 'company_id'
    });
  };
  return Branch;
};
