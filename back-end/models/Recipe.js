const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
    recipe_name: { type: String, required: true },
    img: { type: Buffer, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    prep_time: { type: Number, required: true },
    cook_time: { type: Number, required: true },
    total_time: { type: Number, required: true },
    cuisine: { type: String, required: true },
    difficulty_level: { type: String, required: true },
    mealType: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;