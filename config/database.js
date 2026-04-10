const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Connect failed, retry after 5s...");
    setTimeout(connect, 5000);
  }
};

module.exports = { connect };