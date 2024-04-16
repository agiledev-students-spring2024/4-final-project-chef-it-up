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


let myRecipes = [
  {
    id: 1,
    recipe_name: 'Mr',
    img: `https://picsum.photos/200?id=1`,
    ingredients:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    instructions:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    prep_time: 35,
    cook_time: 54,
    total_time: 103,
    cuisine: 'Russion',
    difficulty_level: 'Hard',
    mealType: 'dinner',
  },

  {
    id: 2,
    recipe_name: 'Mrs',
    img: `https://picsum.photos/200?id=2`,
    ingredients:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    instructions:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    prep_time: 37,
    cook_time: 138,
    total_time: 307,
    cuisine: 'Chinese',
    difficulty_level: 'Hard',
    mealType: 'dessert',
  },
  {
    id: 3,
    recipe_name: 'Dr',
    img: `https://picsum.photos/200?id=3`,
    ingredients:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    instructions:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    prep_time: 53,
    cook_time: 22,
    total_time: 203,
    cuisine: 'Italian',
    difficulty_level: 'Medium',
    mealType: 'lunch',
  },
];

let currentDate = new Date();
let defaultExpiryDate = new Date(currentDate.getTime() + (3 * 24 * 60 * 60 * 1000));

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

]

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
]

let fridgeData = [
  {
    id: 1,
    ingredient_name: 'Chicken',
    img: `https://picsum.photos/200?id=1`,
    expiry_date: '2024-08-26',
    quantity: 1,
  },
  {
    id: 2,
    ingredient_name: 'Butter',
    img: `https://picsum.photos/200?id=2`,
    expiry_date: '2025-05-18',
    quantity: 1,
  },
  {
    id: 3,
    ingredient_name: 'Tomatoes',
    img: `https://picsum.photos/200?id=3`,
    expiry_date: '2024-04-10',
    quantity: 4,
  },
  {
    id: 4,
    ingredient_name: 'Yogurt',
    img: `https://picsum.photos/200?id=4`,
    expiry_date: '2024-06-21',
    quantity: 2,
  },
  {
    id: 5,
    ingredient_name: 'Cheese',
    img: `https://picsum.photos/200?id=5`,
    expiry_date: '2027-01-08',
    quantity: 6,
  },
  {
    id: 6,
    ingredient_name: 'Apples',
    img: `https://picsum.photos/200?id=6`,
    expiry_date: '2031-09-19',
    quantity: 5,
  },
  {
    id: 7,
    ingredient_name: 'Milk',
    img: `https://picsum.photos/200?id=7`,
    expiry_date: '2027-02-02',
    quantity: 1,
  },
  {
    id: 8,
    ingredient_name: 'Hummus',
    img: `https://picsum.photos/200?id=8`,
    expiry_date: '2024-10-15',
    quantity: 6,
  },
  {
    id: 9,
    ingredient_name: 'Orange juice',
    img: `https://picsum.photos/200?id=9`,
    expiry_date: '2026-01-11',
    quantity: 2,
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
    const favoriteRecipes = await FavoriteRecipe.find({ userFavorited: id})
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
  try{
    await FavoriteRecipe.findByIdAndDelete(recipeId);
    res.status(200).json({ message: 'Favorite recipe successfully removed from favorite list' });

  } catch (error){
    console.error(error);
    res.status(404).json({ error: 'Server error unable to remove from favorite recipe list' });
  }
});

// adding a receips to your favorite recipes list
app.post('/api/addToFavorite/:recipeId/:id', async (req, res) => {
  const recipeId = req.params.recipeId;
  const id = req.params.id;


  try {

    const existingFavorite = await FavoriteRecipe.findOne({ userFavorited: id, createdby: recipeId });
    if (existingFavorite) {
      return res.status(400).json({ error: 'Recipe already exists in favorites' });
    }

    const newFavoriteRecipe = new FavoriteRecipe ({
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
  try {
    const ingredients = await Ingredient.find();
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

// add ingredient to fridge
app.post('/api/addIngredient', verifyToken, upload.single('image'), async (req, res) => {
  const userId = req.userId;

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
app.get('/api/editIngredientInfo/:ingredientId', (req, res) => {
  const { ingredientId } = req.params;
  console.log(ingredientId);
  console.log('this is the ingredient to edit: ', ingredientId);
  const ingredient = fridgeData.find((ingredient) => ingredient.id == ingredientId);

  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404).json({ error: 'Ingredient not found' });
  }
});

// edit ingredient
app.put('/api/editIngredient/:ingredientId', (req, res) => {
  const { ingredientId } = req.params;
  const { ingredient_name, expiry_date, quantity } = req.body;

  const indexToEdit = fridgeData.findIndex((ingredient) => ingredient.id == ingredientId);
  console.log('ingredient index to edit: ', indexToEdit);

  if (indexToEdit !== -1) {
    fridgeData[indexToEdit] = {
      ...fridgeData[indexToEdit],
      ingredient_name,
      quantity,
      expiry_date,
    };
    res.status(200).json({ message: 'Ingredient updated successfully' });
  } else {
    res.status(404).json({ error: 'Ingredient not found' });
  }
});

// delete ingredient
app.delete('/api/deleteIngredient/:ingredientId', (req, res) => {
  const { ingredientId } = req.params;
  console.log(ingredientId);

  const indexToRemove = fridgeData.findIndex((ingredient) => ingredient.id == ingredientId);
  console.log('index to remove: ', indexToRemove);

  if (indexToRemove == -1) {
    res.status(404).json({ error: 'Ingredient not found in fridge' });
  } else {
    fridgeData.splice(indexToRemove, 1);
    res.status(200).json({ message: 'Ingredient removed from fridge' });
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

app.delete('/api/deleteRecipe/:recipeId', (req, res) => {
  const { recipeId } = req.params;
  console.log(recipeId);

  const indexToRemove = myRecipes.findIndex((recipe) => recipe.id == recipeId);
  console.log('index to remove: ', indexToRemove);

  if (indexToRemove == -1) {
    res.status(404).json({ error: 'Recipe not found in favorites' });
  } else {
    myRecipes.splice(indexToRemove, 1);
    res.status(200).json({ message: 'Recipe removed from favorites' });
  }
});

app.get('/editRecipeInfo/:recipeId', (req, res) => {
  const { recipeId } = req.params;

  const recipe = myRecipes.find((recipe) => recipe.id == recipeId);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: 'your recipe was not found' });
  }
});

app.put('/editRecipe/:recipeId', (req, res) => {
  const { recipeId } = req.params;
  const {
    recipe_name,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    total_time,
    cuisine,
    difficulty_level,
    mealType,
  } = req.body;

  const indexToEdit = myRecipes.findIndex((recipe) => recipe.id == recipeId);
  console.log('index to edit: ', indexToEdit);

  if (indexToEdit !== -1) {
    myRecipes[indexToEdit] = {
      ...myRecipes[indexToEdit],
      recipe_name,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      total_time,
      cuisine,
      difficulty_level,
      mealType,
    };
    res.status(200).json({ message: 'Recipe updated successfully' });
  } else {
    res.status(404).json({ error: 'Recipe not found' });
  }
});

app.post('/api/login', async (req, res) => {
  username = req.body.username;
  password = req.body.password;

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

app.post('/api/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const starter = req.body.starter;

  if (!username || !password || !starter) {
    return res.status(400).send('Please provide a username, password, and default fridge.');
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
    } 
    else if (starter === 'Meat-Fridge') {
      defaultFridge = meatFridge;
    } 
    else if (starter === 'Vegetarian-Fridge') {
      defaultFridge = vegetarianFridge;
    } 
    else {
      return res.status(400).json({ success: false, message: 'Error: Invalid default fridge selection' });
    }
    const new_user = new User({ username: username, password: password });
    await new_user.save();

    const ingredients = defaultFridge.map(ingredientData => ({
      ingredient_name: ingredientData.ingredient_name,
      img: ingredientData.img,
      quantity: ingredientData.quantity,
      expiry_date: ingredientData.expiry_date,
      createdBy: new_user._id, // Set createdBy to the _id of the new user
    }));

    // Insert all starter data into Ingredient schema at once
    await Ingredient.insertMany(ingredients);

    const token = new_user.generateJWT();
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: token,
      username: username,
    });
  } catch (error) {

  }
});

// Commenting out until we get the database running, may be useful later on
app.get('/api/myProfile/:userId', async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (user) {
      console.log(user)
        res.status(200).json(user)
    }
    else {
        res.status(404).send("No such user exists")
    }
})

app.post('/api/editMyProfile/:userId', async (req, res) => {
  const { userId } = req.params
  oldUsername = req.body.oldUsername
  username = req.body.username;
  oldPassword = req.body.oldPassword;
  newPassword = req.body.newPassword;
  
  try {
    const user = await User.findOne({ username:oldUsername });

    if (!user) {
      return res.status(401).json({ message: 'Error editing profile: Could not find user'})
    }

    if (!user.validPassword(oldPassword)) {
      console.error(`Incorrect former password.`)
      return res.status(401).json({ message: 'Error editing profile: Incorrect Password'})
    }
    bcrypt.hash(newPassword, 10, async function(err, hash) {
      if (err) {
          return res.status(500).json({ status: "error", message: "Error hashing password" });
      }
      const updatedUser = await User.findByIdAndUpdate({_id:userId},{$set:{username:username, password:hash}})
      if(updatedUser){return res.json({status:"success",message:"user updated"})}
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error editing profile.',
      error: error,
    });
  }
});

app.post('/api/addRecipe', verifyToken, upload.single('image'), async (req, res) => {
  const userId = req.userId;

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

app.get('/api/generateRecipe', (req, res) => {
  // Since we don't have ChatGPT api yet, we will just send a hardcoded recipe as an example
  const generated = {
    instructions:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
  };

  if (generated) {
    res.json(generated);
  } else {
    res.status(404).json({ error: 'Error from server when sending generated recipe.' });
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
      recipes = await FavoriteRecipe.find({mealType: mealType, userFavorited: id})
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
      recipes = await FavoriteRecipe.find({difficulty_level: level, userFavorited: id})
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
      recipes = await FavoriteRecipe.find({cuisine: cuisine, userFavorited: id})
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
