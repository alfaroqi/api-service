"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Alfaroqi",
          profession: "Backend Developer",
          role: "admin",
          email: "alfaroqi@gmail.com",
          password: await bcrypt.hash("123456", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "John Doe",
          profession: "Front End Developer",
          role: "student",
          email: "john@gmail.com",
          password: await bcrypt.hash("123456", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
