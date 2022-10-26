require('dotenv').config();

const orderRepository = require('../repository/orderRepository');

const createOrder = async (req, res) => {
    try {
        // calculate sub_total and total cost
        const order_items = req.body.order_items;
        var sub_total = 0;
        for (const order_item of order_items) {
            sub_total += order_item.price;
        }
        req.body.total = sub_total + req.body.delivery_cost;
        req.body.sub_total = sub_total;

        // get order id after insert
        let order_id = await orderRepository.idOrderAfterInserted();

        // assign no_order
        const tr_date = new Date(req.body.transaction_date);
        req.body.no_order = "OR-" + tr_date.getFullYear() + '-'
        + tr_date.getMonth() + '-'
        + tr_date.getDay() + '-'
        + order_id;

        // assign order id to every order item
        const order_itemsJson = req.body.order_items;
        for (const order_item of order_itemsJson) {
            // set order_id in every order item
            order_item.order_id = order_id;
        }

        // create order 
        // by creating order in "Orders" table, 
        // creating order item in "Order_Items" table, 
        // and deleting user cart in Carts table
        const order = await orderRepository.createOrder(req.body);

        return res.respondCreated(order, "Order created");
    } catch (error) {
        return res.respondServerError(error.message);
    }
}

module.exports = {
    createOrder
}