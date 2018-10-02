module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("account", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    subtype: DataTypes.STRING,
    current_balance: DataTypes.NUMBER,
    item_id: {
      type: DataTypes.NUMBER,
      unique: true
    },
    plaid_account_id: {
      type: DataTypes.NUMBER,
      unique: true
    }
  });

  Account.associate = models => {};

  return Account;
};
