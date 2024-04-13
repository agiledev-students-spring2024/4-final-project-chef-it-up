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

let recipeData = [
  {
    id: 1,
    recipe_name: 'Mrs',
    img: `https://picsum.photos/200?id=1`,
    ingredients:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    instructions:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    prep_time: 64,
    cook_time: 129,
    total_time: 230,
    cuisine: 'Indian',
    difficulty_level: 'Easy',
    mealType: 'dinner',
  },
  {
    id: 2,
    recipe_name: 'Mrs',
    img: `https://picsum.photos/200?id=2`,
    ingredients:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    instructions:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    prep_time: 102,
    cook_time: 172,
    total_time: 89,
    cuisine: 'Mexican',
    difficulty_level: 'Hard',
    mealType: 'breakfast',
  },
  {
    id: 3,
    recipe_name: 'Mr',
    img: `https://picsum.photos/200?id=3`,
    ingredients:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    instructions:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    prep_time: 35,
    cook_time: 54,
    total_time: 103,
    cuisine: 'Russion',
    difficulty_level: 'Medium',
    mealType: 'dessert',
  },

  {
    id: 4,
    recipe_name: 'Mrs',
    img: `https://picsum.photos/200?id=4`,
    ingredients:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    instructions:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    prep_time: 37,
    cook_time: 138,
    total_time: 307,
    cuisine: 'Chinese',
    difficulty_level: 'Hard',
    mealType: 'lunch',
  },
];

let favoriteRecipeData = [
  {
    id: 1,
    recipe_name: 'Rev',
    img: `https://picsum.photos/200?id=1`,
    ingredients:
      'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    instructions:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    prep_time: 63,
    cook_time: 175,
    total_time: 86,
    cuisine: 'Mexican',
    difficulty_level: 'Easy',
    mealType: 'dessert',
  },

  {
    id: 2,
    recipe_name: 'Dr',
    img: `https://picsum.photos/200?id=2`,
    ingredients:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    instructions:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    prep_time: 53,
    cook_time: 22,
    total_time: 203,
    cuisine: 'Italian',
    difficulty_level: 'Medium',
    mealType: 'dinner',
  },
];

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
app.get('/api/myFridge/:ingredientId', (req, res) => {
  const { ingredientId } = req.params;
  console.log('this is the ingredient to display: ', ingredientId);
  const ingredient = fridgeData.find((ingredient) => ingredient.id == ingredientId);

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
    //const hashed_password = await bcrypt.hash(password, saltRounds)
    // currently not handling default fridges yet
    const new_user = new User({ username: username, password: password });
    await new_user.save();
    const token = new_user.generateJWT();
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: token,
      username: username,
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
//app.get("/api/myProfile/:userid"), (req, res) => {
//    const { userid } = req.params
//    const user = backupUser.find((user) => user.id === userid)
//    if (user) {
//        res.status(200).json(user)
//    }
//    else {
//        res.status(404).send("No such user exists")
//    }
//}
//
//app.get("/api/editMyProfile"), (req, res) => {
//    const { username, password } = req.params
//
//    const user = backupUser.find((user) => user.username === username)
//    if (user && user.password === password) {
//        res.json(user.id)
//    }
//    else {
//        res.status(404).send("No such user exists")
//    }
//}

app.post('/api/editMyProfile', (req, res) => {
  const { username, password, userid } = req.body;

  if (!username || !password || !userid) {
    return res.status(400).send('Please provide a username, password, and be logged in.');
  }

  const id = parseInt(userid);

  // just going to physically update the backup for now
  const userIndex = backupUser.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    backupUser[userIndex] = {
      id: id,
      username: username,
      password: password,
    };
    const user = backupUser.find((user) => user.id === id);
    res.status(200).json(user);
  } else {
    res.status(403).send('No such user exists');
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
