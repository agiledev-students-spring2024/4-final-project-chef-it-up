const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require('path');
const cors = require('cors');
const multer = require('multer'); // middleware to handle HTTP POST requests with file uploads
const axios = require('axios'); // middleware for making requests to APIs
require('dotenv').config({ silent: true }); // load environmental variables from a hidden file named .env
const morgan = require('morgan'); // middleware for nice logging of incoming HTTP requests
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const fs = require('fs')
const OpenAI = require('openai');
const { body, validationResult } = require('express-validator');



const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY
})

// use this JWT strategy within passport for authentication handling
const jwtStrategy = require('./config/jwt-config.js'); // import setup options for using JWT in passport
passport.use(jwtStrategy);
// tell express to use passport middleware
app.use(passport.initialize());
// use the morgan middleware to log all incoming http requests
app.use(morgan('dev'));

app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/ingredients', express.static(path.join(__dirname, 'ingredients')));

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB.`);
} catch (err) {
  console.log(`Error connecting to MongoDB user account authentication will fail: ${err}`);
}

const User = require('./models/User.js');
const Recipe = require('./models/Recipe.js');
const FavoriteRecipe = require('./models/FavoriteRecipe.js');
const Ingredient = require('./models/Ingredient.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // store files into a directory named 'uploads'
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // rename the files to include the current time and date
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let currentDate = new Date();
let defaultExpiryDate = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000);

// Format the expiry date as YYYY-MM-DD
let formattedDefaultDate = defaultExpiryDate.toISOString().split('T')[0];

let basicFridge = [
  {
    ingredient_name: 'Chicken breast',
    img: 'ingredients/chicken-breast.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 2,
  },
  {
    ingredient_name: 'Ground beef',
    img: 'ingredients/ground-meat.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 2,
  },

  {
    ingredient_name: 'Carrots',
    img: 'ingredients/carrots.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 2,
  },
  {
    ingredient_name: 'Broccoli',
    img: 'ingredients/broccoli.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Onion',
    img: 'ingredients/onion.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Potatoes',
    img: 'ingredients/potatoes.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Garlic',
    img: 'ingredients/garlic.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Mushroom',
    img: 'ingredients/mushrooms.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },

  {
    ingredient_name: 'milk',
    img: 'ingredients/milk.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'bread',
    img: 'ingredients/bread.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'butter',
    img: 'ingredients/butter.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'cheese',
    img: 'ingredients/cheese.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'apple',
    img: 'ingredients/apple.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'bananas',
    img: 'ingredients/bananas.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'mandarins',
    img: 'ingredients/mandarins.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'strawberry',
    img: 'ingredients/strawberry.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
];

let meatFridge = [
  {
    ingredient_name: 'Chicken breast',
    img: 'ingredients/chicken-breast.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 2,
  },
  {
    ingredient_name: 'Ground beef',
    img: 'ingredients/ground-meat.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 2,
  },
  {
    ingredient_name: 'Bacon',
    img: 'ingredients/bacon.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 5,
  },
  {
    ingredient_name: 'Eggs',
    img: 'ingredients/eggs.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 12,
  },
  {
    ingredient_name: 'Lamb',
    img: 'ingredients/lamb.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 1,
  },
  {
    ingredient_name: 'Pork',
    img: 'ingredients/pork.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 1,
  },
  {
    ingredient_name: 'Salmon',
    img: 'ingredients/salmon.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 1,
  },
  {
    ingredient_name: 'Shrimp',
    img: 'ingredients/shrimp.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 1,
  },
  {
    ingredient_name: 'Sausage',
    img: 'ingredients/sausage.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 1,
  },
  {
    ingredient_name: 'Steak',
    img: 'ingredients/steak.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 1,
  },
  {
    ingredient_name: 'Tuna',
    img: 'ingredients/tuna.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 1,
  },
];

let vegetarianFridge = [
  {
    ingredient_name: 'Carrots',
    img: 'ingredients/carrots.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 2,
  },
  {
    ingredient_name: 'Broccoli',
    img: 'ingredients/broccoli.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Onion',
    img: 'ingredients/onion.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Potatoes',
    img: 'ingredients/potatoes.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Garlic',
    img: 'ingredients/garlic.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Mushroom',
    img: 'ingredients/mushrooms.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Asparagus',
    img: 'ingredients/asparagus.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'brussels sprouts',
    img: 'ingredients/brussels-sprouts.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Corn',
    img: 'ingredients/corn.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },

  {
    ingredient_name: 'Cucumber',
    img: 'ingredients/cucumbers.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Peas',
    img: 'ingredients/green.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Spinach',
    img: 'ingredients/spinach.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
  {
    ingredient_name: 'Tomatoes',
    img: 'ingredients/tomatoes.jpg',
    expiry_date: formattedDefaultDate,
    quantity: 3,
  },
];

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  const extractedToken = token.split(' ')[1];

  // Verify token
  jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('error cannot verify page');
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    console.log('success token verified');
    req.userId = decoded.id; // Attach user ID to request object
    next(); // Proceed to the next middleware
  });
};

app.get('/api/browseRecipes', verifyToken, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipe data' });
  }
});

// individual Recipe Info page
app.get('/api/individualRecipeInfo/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  const recipe = await Recipe.findById(recipeId);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

// favorite recipes page

app.get('/api/favoriteRecipes/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const favoriteRecipes = await FavoriteRecipe.find({ userFavorited: id });
    res.status(200).json(favoriteRecipes);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Server error could not fetch favorite recipes' });
  }
});

// individual favorite Recipe Info page
app.get('/api/individualFavoriteInfo/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;
  const id = req.params.id;

  try {
    const favoriteRecipe = await FavoriteRecipe.findById(recipeId);
    if (!favoriteRecipe) {
      return res.status(404).json({ error: 'Favorite Recipe not found' });
    }

    res.json(favoriteRecipe);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Server error cannot get favorite recipe details' });
  }
});

// deleting a favorited recipe from the favorited list for now
app.delete('/api/Unfavorite/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  try {
    await FavoriteRecipe.findByIdAndDelete(recipeId);
    res.status(200).json({ message: 'Favorite recipe successfully removed from favorite list' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Server error unable to remove from favorite recipe list' });
  }
});

// adding a receips to your favorite recipes list
app.post('/api/addToFavorite/:recipeId/:id', async (req, res) => {
  const recipeId = req.params.recipeId;
  const id = req.params.id;

  try {
    const existingFavorite = await FavoriteRecipe.findOne({
      userFavorited: id,
      createdby: recipeId,
    });
    
    if (existingFavorite) {
      return res.status(400).json({ error: 'Recipe already exists in favorites' });
    }

    const newFavoriteRecipe = new FavoriteRecipe({
      recipe_name: req.body.recipe_name,
      img: req.body.img,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      total_time: req.body.total_time,
      cuisine: req.body.cuisine,
      difficulty_level: req.body.difficulty_level,
      mealType: req.body.mealType,
      userFavorited: id,
      createdBy: recipeId,
    });

    await newFavoriteRecipe.save();
    res.status(200).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Server error cannot add to favorites' });
  }
});

// display items in fridge
app.get('/api/myFridge', verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const ingredients = await Ingredient.find({createdBy: userId});
    res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve ingredients in fridge' });
  }
});

// retrieve ingredient details
app.get('/api/myFridge/:ingredientId', async (req, res) => {
  const { ingredientId } = req.params;
  const ingredient = await Ingredient.findById(ingredientId);

  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404).json({ error: 'Ingredient not found' });
  }
});

const addIngredientValidation = [
  body('ingredientName').notEmpty().withMessage('Ingredient name is required'),
  body('quantity').notEmpty().withMessage('Quantity is required').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('expiryDate').notEmpty().withMessage('Expiry date is required')
];

app.post('/api/addIngredient', verifyToken, upload.single('image'), addIngredientValidation, async (req, res) => {
  const userId = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ingredientName, quantity, expiryDate } = req.body;

  const Quantity = parseInt(quantity);

  try {
    const ingredient = Ingredient({
      ingredient_name: ingredientName,
      img: req.file.path,
      quantity: Quantity,
      expiry_date: expiryDate,
      createdBy: userId,
    });

    await ingredient.save();

    res.status(200).json('Successfully added ingredient to fridge');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error from server when adding ingredient.');
  }
});

// retrieve ingredient details for editing
app.get('/api/editIngredientInfo/:ingredientId', async  (req, res) => {
  const { ingredientId } = req.params;
 
  const ingredient = await Ingredient.findById(ingredientId);
  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404).json({ error: 'Ingredient not found' });
  }
});

// edit ingredient
app.post('/api/editIngredient/:ingredientId', upload.single('image'), addIngredientValidation, async (req, res) => {
  const { ingredientId } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ingredientName, expiryDate, quantity } = req.body;
  try {
    const ingredientToEdit = Ingredient.findById(ingredientId);
    console.log('Ingredient to edit: ', ingredientName);
    if (ingredientToEdit) {
      const updatedIngredient = await Ingredient.findByIdAndUpdate(
        { _id: ingredientId },
        {
          $set: {
            ingredient_name: ingredientName,
            img: req.file.path,
            quantity: quantity,
            expiry_date: expiryDate,
          },
        }
      );
      if (updatedIngredient) {
        return res.json({ status: 'success', message: 'ingredient updated' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error editing ingredient.',
      error: error,
    });
  }
});

// delete ingredient
app.delete('/api/deleteIngredient/:ingredientId', async (req, res) => {
  const { ingredientId } = req.params;
  console.log(ingredientId);

  try {
    const ingredient = await Ingredient.findById(ingredientId);
    const { imageLocation } = ingredient.img;
    if (ingredient) {
      try {
        await ingredient.deleteOne();
      } catch (err) {
        console.error(err);
        res.status(500).send('Error from server when deleting ingredient.');
      }
      res.status(200).send('ingredient successfully deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error from server when deleting ingredient.');
  }
});

app.get('/api/myRecipes', verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const recipes = await Recipe.find({ createdBy: userId });
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipe data' });
  }
});

app.get('/api/myIndividualRecipe/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  const recipe = await Recipe.findById(recipeId);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: 'your recipe was not found' });
  }
});

app.delete('/api/deleteRecipe/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  console.log(recipeId);
  try {
    const recipe = await Recipe.findById(recipeId);
    const { imageLocation } = recipe.img;
    if (recipe) {
      try {
        await recipe.deleteOne();
      } catch (err) {
        console.error(err);
        res.status(500).send('Error from server when deleting recipe.');
      }
      //try{
      //  fs.unlinkSync(imageLocation)
      //} catch (err){
      //  console.error(err);
      //  res.status(500).send('Error from server when deleting recipe image.');
      //}
      res.status(200).send('recipe successfully deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error from server when deleting recipe.');
  }
});

app.get('/api/editRecipeInfo/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: 'your recipe was not found' });
  }
});

const addRecipeValidation = [
  body('recipeName').notEmpty().withMessage('Recipe name is required'),
  body('ingredients').notEmpty().withMessage('Ingredients are required'),
  body('instructions').notEmpty().withMessage('Instructions are required'),
  body('prepTime').notEmpty().withMessage('Preparation time is required').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('cookTime').notEmpty().withMessage('Cooking time is required').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('totalTime').notEmpty().withMessage('Total time is required').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('cuisine').notEmpty().withMessage('Cuisine is required'),
  body('difficultyLevel').notEmpty().withMessage('Difficulty level is required'),
  body('mealType').notEmpty().withMessage('Meal type is required'),
];

app.post('/api/editRecipe/:recipeId', upload.single('image'), addRecipeValidation, async (req, res) => {
  const { recipeId } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    recipeName,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    totalTime,
    cuisine,
    difficultyLevel,
    mealType,
  } = req.body;

  try {
    const recipeToEdit = Recipe.findById(recipeId);
    console.log('Recipe to edit: ', difficultyLevel);
    if (recipeToEdit) {
      const updatedUser = await Recipe.findByIdAndUpdate(
        { _id: recipeId },
        {
          $set: {
            recipe_name: recipeName,
            img: req.file.path,
            ingredients: ingredients,
            instructions: instructions,
            prep_time: prepTime,
            cook_time: cookTime,
            total_time: totalTime,
            cuisine: cuisine,
            difficulty_level: difficultyLevel,
            mealType: mealType,
          },
        }
      );
      if (updatedUser) {
        return res.json({ status: 'success', message: 'user updated' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error editing recipe.',
      error: error,
    });
  }
});

const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

app.post('/api/login', validateLogin, async (req, res) => {
  username = req.body.username;
  password = req.body.password;

  const message = validationResult(req);
  if (!message.isEmpty()) {
    return res.status(400).json({ message: message.array() });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Error loggin in: Invalid username or password' });
    }

    if (!user.validPassword(password)) {
      console.error(`Incorrect password.`);
      return res.status(401).json({
        success: false,
        message: 'Error logging in: Incorrect password.',
      });
    }

    console.log('User logged in successfully.');
    const token = user.generateJWT(); // generate a signed token
    res.json({
      success: true,
      message: 'User logged in successfully.',
      token: token,
      userId: user._id,
      username: user.username,
    }); // send the token to the client to store
  } catch (error) {
    console.error(error);
    res.status(500).send('Error from server while logging in');
  }
});

app.post('/api/register', validateLogin, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const starter = req.body.starter;

  if (!username || !password || !starter) {
    return res.status(400).send('Please provide a username, password, and default fridge.');
  }

  const message = validationResult(req);
  if (!message.isEmpty()) {
    return res.status(400).json({ message: message.array() });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: 'Error cannot register: Username already exists' });
    }

    let defaultFridge;
    if (starter === 'Basic-Fridge') {
      defaultFridge = basicFridge;
    } else if (starter === 'Meat-Fridge') {
      defaultFridge = meatFridge;
    } else if (starter === 'Vegetarian-Fridge') {
      defaultFridge = vegetarianFridge;
    } else if (starter === 'None'){
      defaultFridge = null;
    }else {
      return res
        .status(400)
        .json({ success: false, message: 'Error: Invalid default fridge selection' });
    }

    const new_user = new User({ username: username, password: password });
    await new_user.save();

    if (defaultFridge){
      const ingredients = defaultFridge.map((ingredientData) => ({
        ingredient_name: ingredientData.ingredient_name,
        img: ingredientData.img,
        quantity: ingredientData.quantity,
        expiry_date: ingredientData.expiry_date,
        createdBy: new_user._id, // Set createdBy to the _id of the new user
      }));
  
      // Insert all starter data into Ingredient schema at once
      await Ingredient.insertMany(ingredients);

    }
    

    const token = new_user.generateJWT();
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: token,
      username: username,
      userId: new_user._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error registering account.',
      error: error,
    });
  }
});

// Commenting out until we get the database running, may be useful later on
app.get('/api/myProfile/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('No such user exists');
  }
});

const validateEditProfile = [
  body('username').notEmpty().withMessage('Username is required'),
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword').notEmpty().withMessage('New password is required'),
];

app.post('/api/editMyProfile/:userId', validateEditProfile,  async (req, res) => {
  const { userId } = req.params;
  oldUsername = req.body.oldUsername;
  username = req.body.username;
  oldPassword = req.body.oldPassword;
  newPassword = req.body.newPassword;

  const message = validationResult(req);
  if (!message.isEmpty()) {
    return res.status(400).json({ message: message.array() });
  }

  try {
    const user = await User.findOne({ username: oldUsername });

    if (!user) {
      return res.status(401).json({ message: 'Error editing profile: Could not find user' });
    }

    if (!user.validPassword(oldPassword)) {
      console.error(`Incorrect former password.`);
      return res.status(401).json({ message: 'Error editing profile: Incorrect Password' });
    }
    bcrypt.hash(newPassword, 10, async function (err, hash) {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Error hashing password' });
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $set: { username: username, password: hash } }
      );
      if (updatedUser) {
        return res.json({ status: 'success', message: 'user updated' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error editing profile.',
      error: error,
    });
  }
});

app.post('/api/addRecipe', verifyToken, upload.single('image'), addRecipeValidation, async (req, res) => {
  const userId = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    recipeName,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    totalTime,
    cuisine,
    difficultyLevel,
    mealType,
  } = req.body;
  const prep = parseInt(prepTime);
  const cook = parseInt(cookTime);
  const total = parseInt(totalTime);

  try {
    const new_recipe = Recipe({
      recipe_name: recipeName,
      img: req.file.path,
      ingredients: ingredients,
      instructions: instructions,
      prep_time: prep,
      cook_time: cook,
      total_time: total,
      cuisine: cuisine,
      difficulty_level: difficultyLevel,
      mealType: mealType,
      createdBy: userId,
    });

    await new_recipe.save();

    res.status(200).json('Successfully added new recipe');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error from server when adding recipe.');
  }
});

app.get('/api/generateRecipe/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = await User.findById(id);

  if (!user){
    return res.status(401).json({ message: 'Error cannot find user' });
  }

  const ingredients = await Ingredient.find({createdBy: id}).select('ingredient_name');

  const ingredientNames = ingredients.map(ingredient => ingredient.ingredient_name);

  const exampleFormat = `
  [
    {"recipe_name": "Recipe name 1", 
    "ingredients": ["Ingredient 1", "Ingrendient 2",...], 
    "instructions": ["Step number 1 to make Recipe 1.","Step number 2 to make Recipe 1",...], 
    "prep_time": "Time in minutes for preperation to make Recipe 1.", 
    "cook_time": "Time in minutes to cook recipe 1.", 
    "total_time": "total time it takes so (prep_time + cook_time) to cook recipe 1", 
    "cuisine_type" : "the type of cuisine ex: american, Japanase...",  
    "difficulty_level": "difficulty level ranging from easy, medium, and hard", 
    "mealType": "the type of meal so breakfast, lunch, dinner, or dessrt"}
  ]`

  let prompt = `Using only the following ingredients: ${ingredientNames.join(', ')}, generate a recipe in JSON format. 
      Each recipe should match this example Format ${exampleFormat}`;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
        
    })

    const generatedRecipe = response.choices[0].message.content;
    console.log(generatedRecipe);
    const cleanGenerateRecipe = JSON.parse(generatedRecipe);
    console.log(cleanGenerateRecipe);
    res.json(cleanGenerateRecipe);

  } catch (error){
      console.error('Error generating recipes:', error);
      res.status(500).send('Error generating recipe');
  }
});

app.get('/api/filterRecipes/mealtypes/:type/:num/:id', async (req, res) => {
  const mealType = req.params.type;
  const num = req.params.num;
  const id = req.params.id;

  let recipes;
  try {
    if (num == 1) {
      recipes = await Recipe.find({ mealType: mealType });
    } else if (num == 2) {
      recipes = await FavoriteRecipe.find({ mealType: mealType, userFavorited: id });
    } else {
      recipes = await Recipe.find({ mealType: mealType, createdBy: id });
    }

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/filterRecipes/difficulty/:level/:num/:id', async (req, res) => {
  const level = req.params.level;
  const num = req.params.num;
  const id = req.params.id;

  let recipes;

  try {
    if (num == 1) {
      recipes = await Recipe.find({ difficulty_level: level });
    } else if (num == 2) {
      recipes = await FavoriteRecipe.find({ difficulty_level: level, userFavorited: id });
    } else {
      recipes = await Recipe.find({ difficulty_level: level, createdBy: id });
    }

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/filterRecipes/cuisine/:cuisine/:num/:id', async (req, res) => {
  const cuisine = req.params.cuisine;
  const num = req.params.num;
  const id = req.params.id;
  let recipes;

  try {
    if (num == 1) {
      recipes = await Recipe.find({ cuisine: cuisine });
    } else if (num == 2) {
      recipes = await FavoriteRecipe.find({ cuisine: cuisine, userFavorited: id });
    } else {
      recipes = await Recipe.find({ cuisine: cuisine, createdBy: id });
    }

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// export the express app we created to make it available to other modules
module.exports = app;
