module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    category: DataTypes.ARRAY(DataTypes.STRING),
    categoryId: DataTypes.STRING,
    type: DataTypes.STRING,
    postDate: DataTypes.DATE,
    plaidAccountId: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Transaction.associate = models => {
    Transaction.belongsTo(models.Account);
  };

  return Transaction;
};
