// import and instantiate express

const backupData = [
    {   
       id: 1,
       recipe_name: "Mrs",
       ingredients: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
       instructions: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
       prep_time: 64,
       cook_time: 129,
       total_time: 230,
       cuisine: "Indian",
       difficulty_level: "Hard"
     },
     {
       id: 2,
       recipe_name: "Mrs",
       ingredients: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
       instructions: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
       prep_time: 102,
       cook_time: 172,
       total_time: 89,
       cuisine: "Mexican",
       difficulty_level: "Hard"
     }
   
   ];

let backupUser = [
    {
        id:1,
        username:"First Last",
        password:"Password",
    }
]

   
const express = require("express"); // CommonJS import style!
const path = require("path");
const app = express() // instantiate an Express object

const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests

const saltRounds = 10;   

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

app.post("/login", (req, res) => {
    res.status(200).send("User has logged in");
  });
app.register("/register", async(req,res) =>{
    const { username, password, fridge } = req.body;

    if (!username || !password || !fridge ) {
        return res.status(400).send('Please provide a username, password, and default fridge.');
    }

    try {
        const hashed_password = await bcrypt.hash(password, saltRounds)

        const new_user = {
            id:backupUser.length+1,
            username:username,
            password:hashed_password,
        }

        backupUser.push(new_user)
        const { password:_, ...user_nopass } = new_user
        res.status(200).json("Successfully registered")
    }
    catch(error) {
        console.error(error)
        res.status(500).send('Error from server when registering user.')
    }
})

app.get("/myProfile/:userid"), (req, res) => {
    const { userid } = req.params
    const user = backupUser.find((user) => user.id === userid)
    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).send("No such user exists")
    }
}

app.get("/editMyProfile/:userid"), (req, res) => {
    const { userid } = req.params
    const user = backupUser.find((user) => user.id === userid)
    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).send("No such user exists")
    }
}

app.post("/editMyProfile/:userid"), (req, res) => {
    const { username, password, userid } = req.params;

    const updated_user = {
        id:userid,
        username:username,
        password:password
    }
    // just going to physically update the backup for now
    const userIndex = backupUser.findIndex((user) => user.id === userid)
    if (userIndex !== -1) {
        backupUser[index] = { ...backupUser[index],...updated_user }
    }
    else{
        res.status(404).send("No such user exists")
    }
    
    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(500).send("Error for server updating user.")
    }
}

app.post("/addRecipe"), (req, res) => {
    const { recipe_name, ingredients, instructions, cook_time, total_time, cuisine, difficulty_level } = req.params
    if (!recipe_name || !ingredients || !instructions || !cook_time || !total_time || !cuisine || !difficulty_level ) {
        return res.status(400).send('Please fill in all the forms.');
    }

    try {
        const new_recipe = {
            id: backupData.length + 1,
            recipe_name: recipe_name,
            ingredients: ingredients,
            instructions: instructions,
            cook_time: cook_time,
            total_time: total_time,
            cuisine: cuisine,
            difficulty_level: difficulty_level
        }

        backupData.push(new_recipe)
        res.status(200).json("Successfully added new recipe")
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Error from server when adding recipe.')
    }
}

// we will put some server logic here later...

// export the express app we created to make it available to other modules
module.exports = app