#!/bin/bash

# Membuat folder proyek backend
mkdir -p backend/{controllers,models,routes,config}

# Membuat file server utama
cat <<EOF > backend/server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Routes Placeholder
// app.use('/api/categories', require('./routes/categoryRoutes'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOF

# Membuat file koneksi database
cat <<EOF > backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
EOF

# Membuat file model
cat <<EOF > backend/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
EOF

cat <<EOF > backend/models/Dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Dish', dishSchema);
EOF

cat <<EOF > backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
EOF

# Membuat file .env
cat <<EOF > backend/.env
MONGO_URI=your_mongodb_connection_string
EOF

echo "Backend structure has been created!"
