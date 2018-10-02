module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("client", {
    plaidClientId: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Client.associate = models => {
    Client.belongsTo(models.Environment);
  };

  return Client;
};
