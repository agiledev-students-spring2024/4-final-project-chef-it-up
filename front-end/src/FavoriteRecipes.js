import React, { useState, useEffect } from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import './FavoriteRecipes.css'
// import { useRecipeContext } from './RecipeContext';

const FavoriteRecipes = () =>{
    const [recipes, setRecipes] = useState([])
    const mealType = ['breakfast', 'lunch', 'dinner', 'dessert'];
    const difficultyLevel = ['easy', 'medium', 'hard'];
    // const [userData, setUserData] = useState([])
    // const { getCurrRecipe } = useRecipeContext();
    
    useEffect(() =>{
        console.log("fetching random data for 2 recipes")
        axios.get(('http://localhost:3001/api/favoriteRecipes')) //running low on free uses https://my.api.mockaroo.com/recipes.json?key=5f2d0960
            .then(response => {
                console.log("API response:", response.data);
                setRecipes(response.data)
            })
            .catch(err =>{
                console.log(`Error getting data`);
                console.error(err);

            })

    }, [])

    /*const handleRecipeClick = (recipe) => {
      getCurrRecipe(recipe);
    };
    */



    return (
        <div className="recipes-contianer">
        <h1>Favorite Recipes</h1>

        <div>
                <h2>Filter By:</h2>
                <div>
                    <h3>Meal Type:</h3>
                    {mealType.map(type => (
                        <button className="filter-buttons"  key={type} >{type}</button>
                    ))}
                </div>
                <div>
                    <h3>Difficulty Level:</h3>
                    {difficultyLevel.map(level => (
                        <button className="filter-buttons" key={level} >{level}</button>
                    ))}
                </div>
            </div>


        <div className="recipes-card-container">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} baseUrl="/favoriteRecipes"/>
            
            ))}

        </div>
    </div>
    )
};

export default FavoriteRecipes;