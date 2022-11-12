const { Product, Unit } = require('../models');
const respondHelper = require('../helpers/response');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const getProduct = async () => {
  try {
    const get = await Product.findAll({});

    return get;
  } catch (err) {
    throw err;
  }
};

const getByIdProduct = async (id) => {
  try {
    const getId = await Product.findOne({ where: { id: id } });

    return getId;
  } catch (err) {
    throw err;
  }
};
// untuk update :
// item = {
//   item_id
//   unit_id
//   title
//   stock
//   promo
//   thumbnail
//}
const updateProduct = async (product_id, newItem) => {
  try {
    const update = await Product.update(
      {
        unit: newItem.unit,
        title: newItem.title,
        stock: newItem.stock,
        promo: newItem.promo,
        updateAt: new Date(),
      },
      { where: { id: product_id } }
    );
    console.log(`Update : ${update}`);
    const rsltupdate = await Product.findOne({
      where: {
        id: 1,
      },
    });
    return rsltupdate.dataValues;
  } catch (error) {
    console.log(error.message);
  }
};
/* untuk insert
item = {
  title
  category_id
  price
  stock
  qty_unit
  unit_id
  promo
  max_promo
  info
  thumbnail

}
*/
const newProduct = async (item) => {
  try {
    const insert = await Product.create({
      title: item.title,
      category_id: item.category_id,
      price: item.price,
      stock: item.stock,
      unit: item.unit,
      promo: item.promo,
      max_promo: item.max_promo,
      info: item.info,
      thumbnail: item.thumbnail,
      createdAt: new Date(),
      updateAt: new Date(),
    });
    return insert;
  } catch (err) {
    console.log(err);
  }
};
// const test = async ()=> {
//   const item = {
//     title: 'Kangkung',
//     category_id : 1,
//     price : 5000,
//     stock : 5,
//     qty_unit: 1,
//     unit_id : 1,
//     promo : 5,
//     max_promo : 3,
//     info : '1 wortel setara kurang lebih 500 gram'
//   }
//   const newprod = await newProduct(item)
//   console.log(newprod)
// }
// test()
const getPopularProduct = async () => {
  const textquery = `SELECT * from "Products" where "Products".id in 
(	
  SELECT product_id from "Order_Items" as oi JOIN "Orders" as o ON o.id = oi.order_id
  WHERE Status = 'Proses' OR Status = 'Selesai'
  GROUP BY product_id
  ORDER By COUNT(product_id) desc
);`;
  const get = db.sequelize.query(textquery, { type: QueryTypes.SELECT });
  return get;
};
module.exports = {
  getProduct,
  getByIdProduct,
  updateProduct,
  newProduct,
  getPopularProduct,
};
