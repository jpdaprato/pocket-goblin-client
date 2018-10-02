module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("client", {
    plaidClientId: {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      type: DataTypes.STRING,
      unique: true
    }
  });

  Client.associate = models => {
    Client.belongsTo(models.Environment);
  };

  return Client;
};
