const bcrypt = require('bcrypt');

module.exports = {
    up: async ({ context: queryInterface }) => {
        const saltRounds = 8;

        return queryInterface.bulkInsert('users', [
            {
                first_name: 'Admin',
                last_name: 'User',
                email: 'admin@tms.com',
                password: await bcrypt.hash('word2P@ss', saltRounds),
                role: 'ADMIN',
                preferences: JSON.stringify({}),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                first_name: 'User',
                last_name: 'Manager',
                email: 'manager@tms.com',
                password: await bcrypt.hash('word2P@ss', saltRounds),
                role: 'USER_MANAGER',
                preferences: JSON.stringify({}),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                first_name: 'Regular',
                last_name: 'User',
                email: 'regular@tms.com',
                password: await bcrypt.hash('word2P@ss', saltRounds),
                role: 'REGULAR',
                preferences: JSON.stringify({}),
                created_at: new Date(),
                updated_at: new Date()
            },
        ], {});
    },

    down: ({ context: queryInterface }) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
