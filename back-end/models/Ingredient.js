const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new mongoose.Schema({
  ingredient_name: { type: String, required: true },
  img: { type: String, required: true },
  quantity: { type: String, required: true },
  expiry_date: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
