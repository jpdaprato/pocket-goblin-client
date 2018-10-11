module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        required: true
      },
      sub: {
        type: DataTypes.STRING,
        unique: true,
        required: true
      }
    },
    {
      underscored: true
    }
  );

  User.associate = models => {
    User.hasMany(models.Item, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });
  };

  return User;
};
