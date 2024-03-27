import React, { useState, useEffect } from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import './FavoriteRecipes.css'
// import { useRecipeContext } from './RecipeContext';

const FavoriteRecipes = () =>{
    const [recipes, setRecipes] = useState([])
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
        <div className="recipes-card-container">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} baseUrl="/favoriteRecipes"/>
            
            ))}

        </div>
    </div>
    )
};

export default FavoriteRecipes;