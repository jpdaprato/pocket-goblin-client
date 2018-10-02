module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      category: DataTypes.ARRAY(DataTypes.STRING),
      category_id: DataTypes.STRING,
      type: DataTypes.STRING,
      post_date: DataTypes.DATE,
      plaid_account_id: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true
    }
  );

  Transaction.associate = models => {
    Transaction.belongsTo(models.Account),
      {
        foreignKey: "account_id",
        onDelete: "CASCADE"
      };
  };

  return Transaction;
};
