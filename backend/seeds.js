require('dotenv').config();
const connectDB = require('./config/db');
const Category = require('./models/Category'); // Model untuk kategori
const Dish = require('./models/Dish'); // Model untuk dish

// Data seed
const categories = require('./categories.json'); // File JSON untuk kategori
const dishes = require('./dishes.json'); // File JSON untuk dish

const start = async () => {
  try {
    // Hubungkan ke database
    await connectDB(process.env.MONGO_URI);

    // Hapus data lama
    await Category.deleteMany();
    await Dish.deleteMany();

    // Ekstrak kategori unik dari dishes
    const uniqueCategories = [...new Set(dishes.map(dish => dish.categoryName))];

    // Simpan kategori baru
    const savedCategories = await Category.insertMany(
      uniqueCategories.map(name => ({ name }))
    );

    // Validasi kategori untuk setiap dish
    const invalidDishes = dishes.filter(dish => 
      !savedCategories.some(cat => cat.name === dish.categoryName)
    );

    if (invalidDishes.length > 0) {
      throw new Error(`Kategori tidak valid untuk dishes: ${
        invalidDishes.map(d => `${d.name} (${d.categoryName})`).join(', ')
      }`);
    }

    // Simpan dishes ke database
    await Dish.insertMany(dishes);

    console.log('Data seed berhasil disimpan!');
    process.exit(0);
  } catch (error) {
    console.error('Terjadi error saat seeding data:', error);
    process.exit(1);
  }
};

start();
