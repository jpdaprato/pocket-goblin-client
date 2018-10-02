module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("items", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      clientId: {
        type: Sequelize.STRING
      },
      accessToken: {
        type: Sequelize.STRING
      },
      plaidAccountId: {
        type: Sequelize.STRING
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
