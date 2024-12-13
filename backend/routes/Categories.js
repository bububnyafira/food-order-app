const express = require('express');
const router = express.Router();
const { getCategoryById, getAllCategories, updateCategory, createCategory, deleteCategoryById } = require('../controllers/categoryController');

router.route('/')
    .get(getAllCategories)
    .post(createCategory)

router.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategoryById)

module.exports = router;