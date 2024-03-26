// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
let mockUsers = [
    {
        id:1,
        username:"First Last",
        password:"Password",
        fridge:[
            {
                ingredientName:"Tomato",
                ingredientimage:"tomato.png",
                expiryDate:"01/12/25",
                quantity:"105"
            }
        ],
        favorites:[1],
    }
]

let recipes = [
    {
        id:1,
        recipeName:"Fried Egg",
        ingredients:"1x Egg",
        instructions:"Place an egg minus the shell in a pan at a medium flame for 4 minutes until it is no longer transparent",
        prepTime:"20 seconds",
        cookTime:"4-5 minutes",
        totalTime:"4 minutes 50 seconds average",
        cuisine:"English",
        difficultyLevel:"Easy"
    }
]

app.post("/login", (req, res) => {
    res.status(200).send("User has logged in");
  });
// we will put some server logic here later...

// export the express app we created to make it available to other modules
module.exports = app