module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("client", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    plaidClientId: {
      type: DataTypes.STRING
    }
  });

  Client.associate = models => {
    Client.belongsTo(models.Environment);
  };

  return Client;
};
