const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .connect(url)
    .then(() => {
        console.log('Connected to dabase succsessfully')
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
    });
};

module.exports = connectDB;
