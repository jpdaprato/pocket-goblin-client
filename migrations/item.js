module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("items", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      accessToken: {
        type: Sequelize.STRING
      },
      plaidAccountId: {
        type: Sequelize.STRING
      },
      //TODO: Look into why the model was not found
      // clientId: {
      //   type: Sequelize.UUID,
      //   onDelete: "CASCADE",
      //   references: {
      //     model: "clients",
      //     key: "id"
      //   }
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("items");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
