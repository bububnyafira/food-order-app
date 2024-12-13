const express = require('express');
const router = express.Router();
const { getAllDishes, getDishById, updateDish, deleteDishById, createDish } = require('../controllers/dishController');

router.route('/')
    .get(getAllDishes)
    .post(createDish)

router.route('/:id')
    .get(getDishById)
    .put(updateDish)
    .delete(deleteDishById)

module.exports = router;