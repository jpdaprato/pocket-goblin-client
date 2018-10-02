module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "item",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      access_token: {
        type: DataTypes.STRING
      },
      plaid_account_id: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true
    }
  );

  Item.associate = models => {
    Item.hasMany(models.Account, {
      foreignKey: "item_id",
      onDelete: "CASCADE"
    });
    Item.belongsTo(models.Client, {
      foreignKey: "client_id",
      onDelete: "CASCADE"
    });
  };

  return Item;
};
