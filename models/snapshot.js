module.exports = (sequelize, DataTypes) => {
  const Snapshot = sequelize.define(
    "snapshot",
    {
      cash_flow: DataTypes.FLOAT,
      total_debt: DataTypes.FLOAT,
      total_savings: DataTypes.FLOAT
    },
    {
      treatAsView: true,
      viewDefinition: `
        CREATE VIEW "snapshots" AS 
        SELECT
          users.id as "users_id",
          (SELECT SUM("current_balance")
        FROM "accounts" 
        WHERE ("type" = 'credit')) as "total_debt",
          (SELECT SUM("current_balance")
            FROM "accounts" 
            WHERE ("type" = 'depository')) as "total_savings"
            FROM
              accounts
            JOIN
              transactions
            ON
              transactions.account_id = accounts.id
            JOIN
              items
            ON
              accounts.item_id = items.id
            JOIN
              users
            ON
              items.user_id = users.id
            GROUP BY 
              users.id
      `
    }
  );

  return Snapshot;
};
