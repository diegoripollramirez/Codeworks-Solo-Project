'use strict'

const mongoose = require('mongoose');

// Definir el esquema del modelo
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  mealShedule: {
    type: Array,
    default: [
      [null, null], // Monday
      [null, null], // Tuesday
      [null, null], // Wednesday
      [null, null], // Thursday
      [null, null], // Friday
      [null, null], // Saturday
      [null, null], // Sunday
    ]
  }
}, { timestamps: false });

// Crear el modelo a partir del esquema
const userModel = mongoose.model('userModel', userSchema);

// Exportar el modelo
module.exports = userModel;
