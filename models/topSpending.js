module.exports = (sequelize, DataTypes) => {
  const TopSpending = sequelize.define(
    "topspending",
    {
      user_id: DataTypes.UUID,
      category: DataTypes.ARRAY(DataTypes.STRING),
      sum: DataTypes.FLOAT
    },
    {
      treatAsView: true,
      viewDefinition: `
        CREATE VIEW "topspendings" AS 
        SELECT 
          users.id as user_id,
          transactions.category,
          SUM(transactions.amount) as sum
        FROM
          transactions
        JOIN 
          accounts
        ON
          accounts.id = transactions.account_id
        JOIN
          items
        ON
          items.id = accounts.item_id
        JOIN
          users
        ON
          users.id = items.user_id
        GROUP BY
          ROLLUP (
            users.id,
            transactions.category
            )
        ORDER BY
        	sum desc; 
      `
    }
  );

  return TopSpending;
};
