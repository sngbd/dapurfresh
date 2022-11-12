'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Help',
      [
        {
          id: 1,
          title: 'Cara Memesan Product',
          description:
            '1. Cari Produk yang kamu inginkan <br> 2. Tambahkan aja produknya dengan menekan tombol tambah <br> 3. Tekan keranjang yang ada dibawah layar kamu untuk masuk ke halaman checkout <br> 4. Pastikan data-data kamu valid yaa. Jika ada produk yang tidak ditemukan, kamu bisa tambahin di Catatan Tambahan <br> 5. Terakhir, tombol pesan dehh',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
