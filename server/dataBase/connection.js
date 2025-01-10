'use strict'
const mongoose = require('mongoose');

const dbName = 'mealSchedule';
const mongoDB = `mongodb://127.0.0.1/${dbName}`;

mongoose.set("strictQuery", false);

async function connection() {
  try {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

//Exportar la conexion con mongoose
module.exports =  connection;