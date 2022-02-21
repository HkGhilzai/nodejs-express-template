const { Sequelize } = require('sequelize');

module.exports = {
    up: ({ context: queryInterface }) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(254),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(72),
                allowNull: false
            },
            role: {
                type: Sequelize.ENUM(['REGULAR', 'USER_MANAGER', 'ADMIN']),
                defaultValue: 'REGULAR'
            },
            preferences: {
                type: Sequelize.JSON,
                allowNull: false,
                defaultValue: {}
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },
    down: ({ context: queryInterface }) => queryInterface.dropTable('users'),
};
