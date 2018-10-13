module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "account",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      subtype: DataTypes.STRING,
      current_balance: DataTypes.FLOAT,
      plaid_account_id: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      }
    },
    {
      underscored: true
    }
  );

  Account.associate = models => {
    Account.belongsTo(models.Item, {
      foreignKey: "item_id",
      onDelete: "CASCADE"
    });
    Account.hasMany(models.Transaction, {
      foreignKey: "account_id",
      onDelete: "CASCADE"
    });
  };

  return Account;
};
