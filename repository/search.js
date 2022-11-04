const { Product } = require('../models');
const { Order } = require('../models');
const { Order_Item } = require('../models');
const { QueryTypes } = require('sequelize');
const db = require ('../models');
const textquery = `SELECT * from "Products" where "Products".id in 
(	
  SELECT product_id from "Order_Items" as oi JOIN "Orders" as o ON o.id = oi.order_id
  WHERE Status = 'Proses' OR Status = 'Selesai'
  GROUP BY product_id
  ORDER By COUNT(product_id) desc
);`
const getResult = () => {
  const get = db.sequelize.query(textquery, {type : QueryTypes.SELECT})
  return get
}

module.exports = {
  getResult
}
/* Querynya :
  SELECT p.product_id, title
  FROM "Order_Items" as oi join "Orders" as o on oi.order_id = o.id JOIN "Products" p on oi.product_id = p.id
  WHERE Status LIKE 'Proses' OR status LIKE 'Selesai' GROUP BY product_id ORDER BY COUNT(product_id) ;
 
ATAU 

  SELECT * from "Products" where "Products".id in 
  (	
    SELECT product_id from "Order_Items" as oi JOIN "Orders" as o ON o.id = oi.order_id)
    WHERE Status = 'Proses' OR Status = 'Selesai'
    GROUP BY product_id
    ORDER By COUNT(product_id) desc
  );
 */
