module.exports = (sequelize, DataTypes) => {
  const Cashflow = sequelize.define(
    "cashflow",
    {
      user_id: DataTypes.UUID,
      account_type: DataTypes.STRING,
      year: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      sum: DataTypes.FLOAT
    },
    {
      treatAsView: true,
      viewDefinition: `
        CREATE VIEW "cashflows" AS 
        SELECT 
          users.id as user_id,
          accounts."type" as account_type,
          EXTRACT(YEAR from transactions.post_date) "year",
          EXTRACT(MONTH from transactions.post_date) "month",
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
            accounts."type",
            EXTRACT(YEAR from post_date),
            EXTRACT(MONTH FROM post_date)
            );
      `
    }
  );

  return Cashflow;
};
