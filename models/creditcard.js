'use strict';
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define('CreditCard', {
    cardname: DataTypes.STRING,
    cardnbr: DataTypes.STRING,
    expired_date: DataTypes.STRING
  }, {});
  CreditCard.associate = function(models) {
    CreditCard.belongsTo(models.Person, {
      foreignKey: 'card_id', 
    });
  };
  return CreditCard;
};
