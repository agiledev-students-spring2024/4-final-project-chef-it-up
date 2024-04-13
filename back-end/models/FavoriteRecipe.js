const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FavoriteRecipeSchema = new Schema({
  recipe_name: { type: String, required: true },
  img: {type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  prep_time: { type: Number, required: true },
  cook_time: { type: Number, required: true },
  total_time: { type: Number, required: true },
  cuisine: { type: String, required: true },
  difficulty_level: { type: String, required: true },
  mealType: { type: String, required: true },
  userFavorited: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const FavoriteRecipe = mongoose.model('FavoriteRecipe', FavoriteRecipeSchema);

module.exports = FavoriteRecipe;
