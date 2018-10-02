module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("transaction", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      category: Sequelize.ARRAY(Sequelize.STRING),
      categoryId: Sequelize.STRING,
      type: Sequelize.STRING,
      postDate: Sequelize.DATE,
      plaidAccountId: {
        type: Sequelize.STRING
      },
      //TODO: Look into why the model was not found
      // accountId: {
      //   type: Sequelize.UUID,
      //   onDelete: "CASCADE",
      //   references: {
      //     model: "accounts",
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
    return queryInterface.dropTable("transaction");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
