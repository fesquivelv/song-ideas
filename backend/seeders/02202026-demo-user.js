const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hasedPassword = await bcrypt.hash('password123', 10);

        return queryInterface.bulkInsert('users', [{
            id: '550e8400-e29b-41d4-a716-446655440000',
            email: 'dev@example.com',
            password: hasedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', { email: 'dev@example.com' }, {});
    }
};