const Dish = require("../models/Dish");
const Category = require("../models/Category");

exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    
    if (!dishes || dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }
    
    res.status(200).json(dishes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dishes", error: error.message });
  }
};

exports.getDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findById(id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(200).json(dish);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dish", error: error.message });
  }
};

exports.createDish = async (req, res) => {
  try {
    const { categoryName, name, description, price, rating } = req.body;

    if (!categoryName || !name || !price) {
      return res
        .status(400)
        .json({ message: "Category, name, and price are required." });
    }

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newDish = new Dish({
      categoryName,
      name,
      description,
      price,
      rating,
    });

    await newDish.save();

    res.status(201).json({
      message: "Dish created successfully",
      dish: newDish,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating dish", error: error.message });
  }
};

exports.updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, name, description, price, rating } = req.body;

    const dish = await Dish.findById(id);

    if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
    }

    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      dish.categoryName = categoryName;
    }
 
    if (name) dish.name = name; 
    if (description) dish.description = description; 
    if (price) dish.price = price;
    if (rating) dish.rating = rating; 

    await dish.save();

    res.status(200).json({ message: "Dish updated successfully", dish });
  } catch (error) {
    res.status(500).json({ message: "Error updating dish", error: error.message })
  }
};

exports.deleteDishById = async (req, res) => {
  try {

    const { id } = req.params;
    const dish = await Dish.findById(id);

    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    await dish.deleteOne();

    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dish', error: error.message })
  }
};
