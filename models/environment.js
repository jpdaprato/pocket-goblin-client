module.exports = (sequelize, DataTypes) => {
  const Environment = sequelize.define(
    "environment",
    {
      type: DataTypes.STRING,
      secret: DataTypes.STRING
    },
    {
      underscored: true
    }
  );

  Environment.associate = models => {
    Environment.hasMany(models.Client, {
      foreignKey: "environment_id",
      onDelete: "CASCADE"
    });
  };

  return Environment;
};
