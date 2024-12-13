const mongoose = require('mongoose');
const { Schema } = mongoose;

const dishSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  categoryName: { type: String, required: true },
  image_url: { type: String, require: true },
});

module.exports = mongoose.model('Dish', dishSchema);
