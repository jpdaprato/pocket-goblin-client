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
          clients.id as "client_id",
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
              clients
            ON
              items.client_id = clients.id
            GROUP BY 
              clients.id
      `
    }
  );

  return Snapshot;
};
