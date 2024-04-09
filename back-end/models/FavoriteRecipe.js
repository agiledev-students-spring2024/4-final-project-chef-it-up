const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FavoriteRecipeSchema = new Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }, // Reference to the Recipe to be favorited
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who favorited the Recipe
});

const FavoriteRecipe = mongoose.model('FavoriteRecipe', FavoriteRecipeSchema);

module.exports = FavoriteRecipe;
