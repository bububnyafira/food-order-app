const express = require('express');
const router = express.Router();
const { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrderById } = require('../controllers/orderController');

router.route('/')
    .get(getAllOrders)
    .post(createOrder);

router.route('/:id')
    .get(getOrderById)
    .put(updateOrderStatus)
    .delete(deleteOrderById)

module.exports = router;