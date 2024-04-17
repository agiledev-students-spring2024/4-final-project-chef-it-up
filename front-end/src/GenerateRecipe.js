import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios"
import "./GenerateRecipe.css"

const GenerateRecipe = () =>{
    const [genRecipe, setGenRecipe] = useState([])
    const [generated,setGenerated] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false);

    const userId = localStorage.getItem("userId");

    
    const handleSubmit = async (e) => {
        // Placeholding until chatgpt functionality
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3001/api/generateRecipe/${userId}`);
            
            console.log("API RESPONSE:", response.data)
            setGenRecipe(response.data[0]);
            setGenerated(true);
        }
        catch (error) {
            console.error("generating recipes has failed: ", error);
        }
    }
    

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");
        if (jwtToken) {
            setLoggedIn(true);
        }

    }, )

    if (!loggedIn) {
        return <p>You are not authorized to use this feature. Please <Link to="/">log in</Link> first</p>;
    }

    return (
        <>
            <form className="profile-form" onSubmit={handleSubmit}>
                <h1>Generate Recipes</h1>
                
                <p>Click the button below to generate a random recipe based on the ingredeints in your fridge or if you dont have any ingredeints it will generate a random one. After pressing please wait a moment as it takes time to generate the recipe.</p>

                <button className="generate-recipe-button" type="submit">Generate</button>
            </form>
            <h2>ChatGPT Generated Recipe</h2>
            {generated && genRecipe &&(
                <div className="generated-recipe-container">
                    
                    <h1>{genRecipe.recipe_name}</h1>
                    <div className='difficulty-and-cuisine-container'>
                        <div className="diff-and-cuisine-box">
                            <h3>Cuisine: {genRecipe.cuisine_type}</h3>
                        </div>
                        <div className="diff-and-cuisine-box">
                            <h3>Difficulty: {genRecipe.difficulty_level}</h3>
                        </div>
                        <div className="diff-and-cuisine-box">
                            <h3>Meal type: {genRecipe.mealType}</h3>
                        </div>
                    </div>

                    <div className="time-container">
                        <div className="time-box">
                            <h4>Prep Time: {genRecipe.prep_time} minutes</h4>
                        </div>
                        <div className="time-box">
                            <h4>Cook Time: {genRecipe.cook_time} minutes</h4>
                        </div>
                        <div className="time-box">
                            <h4>Total Time: {genRecipe.total_time} minutes</h4>
                        </div>
                    </div>
                    

                    <h3>Ingredients</h3>
                    <ul>
                        {genRecipe.ingredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Instructions</h3>
                    <ol>
                        {genRecipe.instructions?.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                   
                    
                </div>
            )}
            <form className="return-form">
                <Link className="return-form-link" to="/favoriteRecipes">Go to Favorite Recipes</Link>
            </form>
        </>
    )
};

export default GenerateRecipe;