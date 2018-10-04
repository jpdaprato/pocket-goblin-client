module.exports = (sequelize, DataTypes) => {
  const TopSpending = sequelize.define(
    "topspending",
    {
      client_id: DataTypes.UUID,
      category: DataTypes.ARRAY(DataTypes.STRING),
      sum: DataTypes.FLOAT
    },
    {
      treatAsView: true,
      viewDefinition: `
        CREATE VIEW "topspendings" AS 
        SELECT 
          clients.id as client_id,
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
          clients
        ON
          clients.id = items.client_id
        GROUP BY
          ROLLUP (
            clients.id,
            transactions.category
            )
        ORDER BY
        	sum desc; 
      `
    }
  );

  return TopSpending;
};
