module.exports = (sequelize, DataTypes) => {
  const Environment = sequelize.define("environment", {
    type: DataTypes.STRING,
    secret: DataTypes.STRING
  });

  Environment.associate = models => {
    Environment.hasMany(models.Client, {
      foreignKey: "environmentId",
      onDelete: "CASCADE"
    });
  };

  return Environment;
};
