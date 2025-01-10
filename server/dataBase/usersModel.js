'use strict'

const mongoose = require('mongoose');

// Definir el esquema del modelo
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: false });

// Crear el modelo a partir del esquema
const userModel = mongoose.model('userModel', userSchema);

// Exportar el modelo
module.exports = userModel;
