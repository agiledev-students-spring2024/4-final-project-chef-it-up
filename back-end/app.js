const express = require("express"); // CommonJS import style!
const path = require("path");
const app = express() // instantiate an Express object
const cors = require("cors");
const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
const bcrypt = require('bcrypt');

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(cors());
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
const saltRounds = 10;   
// we will put some server logic here later...


let recipeData = [
    {   
        id: 1,
        recipe_name: "Mrs",
        img: `https://picsum.photos/200?id=1`,
        ingredients: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        instructions: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        prep_time: 64,
        cook_time: 129,
        total_time: 230,
        cuisine: "Indian",
        difficulty_level: "Hard",
        mealType: "dinner"
    },
    {
        id: 2,
        recipe_name: "Mrs",
        img: `https://picsum.photos/200?id=2`,
        ingredients: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
        instructions: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        prep_time: 102,
        cook_time: 172,
        total_time: 89,
        cuisine: "Mexican",
        difficulty_level: "Hard",
        mealType: "breakfast"
    },
    {
        id: 3,
        recipe_name:"Mr",
        img: `https://picsum.photos/200?id=3`,
        ingredients:"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
        instructions:"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        prep_time:35,
        cook_time:54,
        total_time:103,
        cuisine:"Russion",
        difficulty_level:"Hard",
        mealType: "dessert"
    },

    {
        id: 4,
        recipe_name:"Mrs",
        img: `https://picsum.photos/200?id=4`,
        ingredients:"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        instructions:"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        prep_time:37,
        cook_time:138,
        total_time:307,
        cuisine:"Chinese",
        difficulty_level:"Hard",
        mealType: "lunch"
    }
       
];

let favoriteRecipeData = [
    {
        id: 1,
        recipe_name:"Rev",
        img: `https://picsum.photos/200?id=1`,
        ingredients:"Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        instructions:"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        prep_time:63,
        cook_time:175,
        total_time:86,
        cuisine:"Mexican",
        difficulty_level:"Medium",
        mealType: "dessert"
    },

    {
        id: 2,
        recipe_name:"Dr",
        img: `https://picsum.photos/200?id=2`,
        ingredients:"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        instructions:"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        prep_time:53,
        cook_time:22,
        total_time:203,
        cuisine:"Italian",
        difficulty_level:"Medium",
        mealType: "dinner"
    }
];

let myRecipes = [
    {
        id: 1,
        recipe_name:"Mr",
        img: `https://picsum.photos/200?id=1`,
        ingredients:"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
        instructions:"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        prep_time:35,
        cook_time:54,
        total_time:103,
        cuisine:"Russion",
        difficulty_level:"Hard",
        mealType: "dinner"
    },

    {
        id: 2,
        recipe_name:"Mrs",
        img: `https://picsum.photos/200?id=2`,
        ingredients:"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        instructions:"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        prep_time:37,
        cook_time:138,
        total_time:307,
        cuisine:"Chinese",
        difficulty_level:"Hard",
        mealType: "dessert"
    },
    {
        id: 3,
        recipe_name:"Dr",
        img: `https://picsum.photos/200?id=3`,
        ingredients:"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        instructions:"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
        prep_time:53,
        cook_time:22,
        total_time:203,
        cuisine:"Italian",
        difficulty_level:"Medium",
        mealType: "lunch"
    }
    
]
       
let fridgeData = [
    {   
      id: 1,
      ingredient_name: "Chicken",
      img: `https://picsum.photos/200?id=1`,
      expiry_date: "2024-08-26",
      quantity: 1,
    },
    {
      id: 2,
      ingredient_name: "Butter",
      img: `https://picsum.photos/200?id=2`,
      expiry_date: "2025-05-18",
      quantity: 1,
    },
    {
      id: 3,
      ingredient_name: "Tomatoes",
      img: `https://picsum.photos/200?id=3`,
      expiry_date: "2024-04-10",
      quantity: 4,
    },
    {   
      id: 4,
      ingredient_name: "Yogurt",
      img: `https://picsum.photos/200?id=4`,
      expiry_date: "2024-06-21",
      quantity: 2,
    },
    {
      id: 5,
      ingredient_name: "Cheese",
      img: `https://picsum.photos/200?id=5`,
      expiry_date: "2027-01-08",
      quantity: 6,
    },
    {
      id: 6,
      ingredient_name: "Apples",
      img: `https://picsum.photos/200?id=6`,
      expiry_date: "2031-09-19",
      quantity: 5,
    },
    {
      id: 7,
      ingredient_name: "Milk",
      img: `https://picsum.photos/200?id=7`,
      expiry_date: "2027-02-02",
      quantity: 1,
    },
    {
      id: 8,
      ingredient_name: "Hummus",
      img: `https://picsum.photos/200?id=8`,
      expiry_date: "2024-10-15",
      quantity: 6,
    },
    {
      id: 9,
      ingredient_name: "Orange juice",
      img: `https://picsum.photos/200?id=9`,
      expiry_date: "2026-01-11",
      quantity: 2,
    }
]

async function hash_password(password) {
    const hashed_password = await bcrypt.hash(password, saltRounds)
    return hashed_password
}

let backupUser = [
    {
        id:1,
        username:"First Last",
        password:"Password"
    }
]

// browse recipe page
app.get("/api/browseRecipes", (req, res) => {
    res.json(recipeData)

});

// individual Recipe Info page 
app.get("/api/individualRecipeInfo/:recipeId", (req, res) => {
    const { recipeId } = req.params;
    console.log(recipeId);
    const recipe = recipeData.find(recipe => recipe.id == recipeId);
    if (recipe) {
        res.json(recipe);
        
    } else {
        res.status(404).json({ error: "Recipe not found" });
    }


});

// favorite recipes page 

app.get("/api/favoriteRecipes", (req, res) =>{
    res.json(favoriteRecipeData);

});

// individual favorite Recipe Info page 
app.get("/api/individualFavoriteInfo/:recipeId", (req, res) => {
    const { recipeId } = req.params;
    console.log(recipeId);
    const recipe = favoriteRecipeData.find(recipe => recipe.id == recipeId);
    if (recipe) {
        res.json(recipe);
        
    } else {
        res.status(404).json({ error: "Favorite Recipe not found" });
    }


});

// deleting a favorited recipe from the favorited list for now 
app.delete("/api/Unfavorite/:recipeId", (req, res) =>{
    const { recipeId } = req.params;
    console.log(recipeId);

    const indexToRemove = favoriteRecipeData.findIndex(recipe => recipe.id == recipeId);
    console.log("index to remove: ", indexToRemove)

    if (indexToRemove == -1) {
        res.status(404).json({ error: "Recipe not found in favorites" });
       
        
    } else {
        favoriteRecipeData.splice(indexToRemove, 1);
        res.status(200).json({ message: "Recipe removed from favorites" });
       
       
    }


});

// adding a receips to your favorite recipes list 
app.post ("/api/addToFavorite/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  console.log('this is recipe to add to favorite', recipeId);
  const recipe = recipeData.find(recipe => recipe.id == recipeId);

  if (recipe){
      const toAddToFavorite = {
          id: favoriteRecipeData.length + 1,
          recipe_name: recipe.recipe_name,
          img:  `https://picsum.photos/200?id=${recipeId}`,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          cook_time: recipe.cook_time,
          total_time: recipe.total_time,
          cuisine: recipe.cuisine,
          difficulty_level: recipe.difficulty_level,
          mealType:recipe.mealType
  
      };
  
      favoriteRecipeData.push(toAddToFavorite);
      res.status(200).json("successfully pushed to favorite list");

  }

  else{
      res.status(404).json({ error: " Recipe not found" });
  }
})

// display items in fridge
app.get("/api/myFridge", (req, res) => {
    res.json(fridgeData);
})

// retrieve ingredient details 
app.get("/api/myFridge/:ingredientId", (req, res) => {
    const { ingredientId } = req.params;
    console.log("this is the ingredient to display: ", ingredientId);
    const ingredient = fridgeData.find(ingredient => ingredient.id == ingredientId);

    if (ingredient) {
        res.json(ingredient);
    }

    else {
        res.status(404).json({ error: "Ingredient not found"});
    }
})

// add ingredient to fridge
app.post ("/api/addIngredient", (req, res) => {
    console.log('this is ingredient to add to fridge', req.body.id);
    
    const ingredient = {
      id: req.body.id,
      ingredient_name: req.body.ingredient_name,
      quantity: req.body.quantity,
      expiry_date: req.body.expiry_date
    };

    if (ingredient) {
      fridgeData.push(ingredient)
      res.status(200).json("successfully added ingredient to fridge");
    }

    else{
        res.status(404).json({ error: " Recipe not found" });
    }
});

// retrieve ingredient details for editing
app.get("/api/editIngredientInfo/:ingredientId", (req, res) => {
  const { ingredientId } = req.params;
  console.log(ingredientId)
  console.log("this is the ingredient to edit: ", ingredientId);
  const ingredient = fridgeData.find(ingredient => ingredient.id == ingredientId);

  if (ingredient) {
      res.json(ingredient);
  }

  else {
      res.status(404).json({ error: "Ingredient not found"});
  }
})

// edit ingredient
app.put("/api/editIngredient/:ingredientId", (req, res) => {
  const { ingredientId } = req.params
  const { ingredient_name, expiry_date, quantity } = req.body

  const indexToEdit = fridgeData.findIndex(ingredient => ingredient.id == ingredientId);
  console.log("ingredient index to edit: ", indexToEdit)

  if (indexToEdit !== -1) {
      fridgeData[indexToEdit] = { ...fridgeData[indexToEdit],
      ingredient_name,
      quantity,
      expiry_date,
  };
  res.status(200).json({ message: "Ingredient updated successfully" });
} else {
  res.status(404).json({ error: "Ingredient not found" });
}
})

app.get("/api/myRecipes", (req, res) => {
    res.json(myRecipes);

});

app.get("/api/myIndividualRecipe/:recipeId", (req, res) =>{
    const { recipeId } = req.params;
    
    const recipe = myRecipes.find(recipe => recipe.id == recipeId);
    if (recipe) {
        res.json(recipe);
        
    } else {
        res.status(404).json({ error: "your recipe was not found" });
    }

});

app.delete("/api/deleteRecipe/:recipeId", (req, res) =>{
    const { recipeId } = req.params;
    console.log(recipeId);

    const indexToRemove = myRecipes.findIndex(recipe => recipe.id == recipeId);
    console.log("index to remove: ", indexToRemove)

    if (indexToRemove == -1) {
        res.status(404).json({ error: "Recipe not found in favorites" });
       
        
    } else {
        myRecipes.splice(indexToRemove, 1);
        res.status(200).json({ message: "Recipe removed from favorites" });
       
       
    }


});

app.get("/editRecipeInfo/:recipeId", (req, res) =>{
    const { recipeId } = req.params;
    
    const recipe = myRecipes.find(recipe => recipe.id == recipeId);
    if (recipe) {
        res.json(recipe);
        
    } else {
        res.status(404).json({ error: "your recipe was not found" });
    }

});

app.put("/editRecipe/:recipeId", (req, res) =>{
    const { recipeId } = req.params;
    const { recipe_name, ingredients, instructions, prep_time, cook_time, total_time, cuisine, difficulty_level, mealType} = req.body;
    
    const indexToEdit = myRecipes.findIndex(recipe => recipe.id == recipeId);
    console.log("index to edit: ", indexToEdit)

   
    if (indexToEdit !== -1) {
        myRecipes[indexToEdit] = { ...myRecipes[indexToEdit],
        recipe_name,
        ingredients,
        instructions,
        prep_time,
        cook_time,
        total_time,
        cuisine,
        difficulty_level,
        mealType
    };
    res.status(200).json({ message: "Recipe updated successfully" });
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }

    

});



app.post("/api/login", async(req, res) => {
    const { username, password } = req.body

    const user = backupUser.find((user) => user.username === username)
    if (!user) {
        // we will change this to something more general for security, but for testing purposes it remains as is
        return res.status(401).send('Invalid username')
    }

    try {
        //const password_check = await bcrypt.compare(JSON.stringify(password), JSON.stringify(user.password))
        if (!(password == user.password)) {
            // we will change this to something more general for security, but for testing purposes it remains as is
            return res.status(401).send('Invalid password')
        }
        res.status(200).send(user)
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Error from server while logging in')
    }
  });

app.post("/api/register", async(req,res) =>{
    const { username, password, starter } = req.body;

    if (!username || !password || !starter ) {
        return res.status(400).send('Please provide a username, password, and default fridge.');
    }

    try {
        //const hashed_password = await bcrypt.hash(password, saltRounds)
        // currently not handling default fridges yet
        const new_user = {
            id:backupUser.length+1,
            username:username,
            password:password,
        }

        backupUser.push(new_user)
        res.status(200).json("Successfully registered")
    }
    catch(error) {
        console.error(error)
        res.status(500).send('Error from server when registering user.')
    }
})

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

app.post("/api/editMyProfile", (req, res) => {
    const { username, password, userid } = req.body;

    if (!username || !password || !userid ) {
        return res.status(400).send('Please provide a username, password, and be logged in.');
    }
    
    const id = parseInt(userid)

    // just going to physically update the backup for now
    const userIndex = backupUser.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
        backupUser[userIndex] = { 
            id:id,
            username:username,
            password:password
        }
        const user = backupUser.find((user) => user.id === id)
        res.status(200).json(user)
    }
    else{
        res.status(403).send("No such user exists")
    }
})

app.post("/api/addRecipe", (req, res) => {
    const { recipeName, image, ingredients, instructions, prepTime, cookTime,  totalTime, cuisine, difficultyLevel, mealType } = req.body
    const prep = parseInt(prepTime)
    const cook = parseInt(cookTime)
    const total = parseInt(totalTime)
    try {
        const new_recipe = {
            id: recipeData.length + 1,
            recipe_name: recipeName,
            img: `https://picsum.photos/200?id=4`,
            ingredients: ingredients,
            instructions: instructions,
            prep_time: prep,
            cook_time: cook,
            total_time: total,
            cuisine: cuisine,
            difficulty_level: difficultyLevel,
            mealType: mealType
        }

        recipeData.push(new_recipe)

        res.status(200).json("Successfully added new recipe")
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Error from server when adding recipe.')
    }
})

app.get("/api/generateRecipe", (req,res) => {
    // Since we don't have ChatGPT api yet, we will just send a hardcoded recipe as an example
    const generated = {
        instructions:"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    }

    if (generated) {
        res.json(generated)
      }
  
      else{
          res.status(404).json({ error: "Error from server when sending generated recipe." });
    }
})


// export the express app we created to make it available to other modules
module.exports = app
