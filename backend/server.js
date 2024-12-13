require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const dishRouter = require('./routes/Dishes');
const orderRouter = require('./routes/Orders');
const categoryRouter = require('./routes/Categories')
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/dishes', cors(), dishRouter);
app.use('/api/orders', cors(), orderRouter);
app.use('/api/categories', cors(), categoryRouter);

// Start Server
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server sedang berjalan di port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
