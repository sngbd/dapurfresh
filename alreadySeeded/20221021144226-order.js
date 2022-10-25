'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
      'Orders',
      [
        {
          name: 'Kelompok1',
          phone_number: "8745623",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 8, 8, 14, 37, 8),
          sub_total: 28000,
          delivery_cost: 3000,
          total: 31000,
          note: "-",
          user_id: 1,
          status: "Batal",
          no_order: "OR-2022-9-8-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "8745623",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 18, 18, 42, 11),
          sub_total: 7000,
          delivery_cost: 3000,
          total: 10000,
          note: "-",
          user_id: 1,
          status: "Batal",
          no_order: "OR-2022-10-18-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "8745623",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 19, 5, 20, 19),
          sub_total: 8000,
          delivery_cost: 3000,
          total: 11000,
          note: "-",
          user_id: 1,
          status: "Batal",
          no_order: "OR-2022-10-19-3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "46578751",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 20, 16, 44, 40),
          sub_total: 12000,
          delivery_cost: 3000,
          total: 15000,
          note: "-",
          user_id: 1,
          status: "Proses",
          no_order: "OR-2022-10-20-4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "6786756452",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 21, 11, 16, 24),
          sub_total: 75000,
          delivery_cost: 3000,
          total: 78000,
          note: "-",
          user_id: 1,
          status: "Batal",
          no_order: "OR-2022-10-21-5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "4373653154",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 22, 13, 5, 33),
          sub_total: 64000,
          delivery_cost: 3000,
          total: 67000,
          note: "-",
          user_id: 1,
          status: "Proses",
          no_order: "OR-2022-10-22-6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "86536425",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 23, 15, 17, 2),
          sub_total: 16000,
          delivery_cost: 3000,
          total: 19000,
          note: "-",
          user_id: 1,
          status: "Proses",
          no_order: "OR-2022-10-23-7",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "536742634",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 24, 12, 41, 58),
          sub_total: 17000,
          delivery_cost: 3000,
          total: 20000,
          note: "-",
          user_id: 1,
          status: "Proses",
          no_order: "OR-2022-10-24-8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "85364274",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 25, 7, 28, 34),
          sub_total: 20000,
          delivery_cost: 3000,
          total: 23000,
          note: "-",
          user_id: 1,
          status: "Batal",
          no_order: "OR-2022-10-25-9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "7632542",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 25, 10, 43, 7),
          sub_total: 24000,
          delivery_cost: 3000,
          total: 27000,
          note: "-",
          user_id: 1,
          status: "Proses",
          no_order: "OR-2022-10-25-10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kelompok1',
          phone_number: "041431",
          address: "Jl. Mangga 3",
          transaction_date: new Date(2022, 9, 25, 17, 0, 2),
          sub_total: 51000,
          delivery_cost: 3000,
          total: 54000,
          note: "-",
          user_id: 1,
          status: "Batal",
          no_order: "OR-2022-10-25-11",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {

  }
};
