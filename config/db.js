// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    // console.log('MongoDB URI:', mongoURI);
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected...');
  } catch (err) {``
  console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
