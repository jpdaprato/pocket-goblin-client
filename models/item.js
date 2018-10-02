module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("item", {
    clientId: {
      type: DataTypes.STRING,
      unique: true
    },
    accessToken: {
      type: DataTypes.STRING,
      unique: true
    },
    plaidAccountId: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Item.associate = models => {
    Item.hasMany(models.Account);
  };

  return Item;
};
