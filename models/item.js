module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("item", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    clientId: {
      type: DataTypes.STRING
    },
    accessToken: {
      type: DataTypes.STRING
    },
    plaidAccountId: {
      type: DataTypes.STRING
    }
  });

  Item.associate = models => {
    Item.hasMany(models.Account);
  };

  return Item;
};
