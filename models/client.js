module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "client",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      plaid_client_id: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true
    }
  );

  Client.associate = models => {
    Client.belongsTo(models.Environment, {
      foreignKey: "environment_id",
      onDelete: "CASCADE"
    });
    Client.hasMany(models.Item, {
      foreignKey: "client_id",
      onDelete: "CASCADE"
    });
  };

  return Client;
};
