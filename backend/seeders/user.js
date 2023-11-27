const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        f_name: 'John',
        l_name: 'Doe',
        email: 'admin2@admin.com',
        phone: '1234567890',
        profile_img: 'noimg',
        password: await bcrypt.hash('1234', 10), 
        roles: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more users as needed
    ];

    return queryInterface.bulkInsert('t_users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    // Remove the seeded data
    return queryInterface.bulkDelete('t_users', null, {});
  },
};
