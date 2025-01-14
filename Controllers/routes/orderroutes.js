const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrderStatus } = require('../orderController');

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').put(updateOrderStatus);

module.exports = router;
