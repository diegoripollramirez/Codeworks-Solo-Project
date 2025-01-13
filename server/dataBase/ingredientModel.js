'use strict'

const mongoose = require('mongoose');

// Definir el esquema del modelo
const ingredientsSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
  unit: { type: String },
}, { timestamps: false });

// Crear el modelo a partir del esquema
const ingredientModel = mongoose.model('ingredientModel', ingredientsSchema);

// Exportar el modelo
module.exports = ingredientModel;
