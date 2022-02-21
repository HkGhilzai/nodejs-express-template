const Sequelize = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        return queryInterface.createTable('worklogs', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            hours_worked: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            notes: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },

    down: async ({ context: queryInterface }) => {
        return queryInterface.dropTable('worklogs');
    }
};
