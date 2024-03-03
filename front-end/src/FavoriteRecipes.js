import React, { useState, useEffect } from "react";
import './FavoriteRecipes.css'

const FavoriteRecipes = () =>{
    const [recipes, setRecipes] = useState([])
    const fetchFavorites = () => {
        fetch('backend database')  
        .then(response => response.json())
        .then((data) => setRecipes(data.results))
    }


    return (
        <h1>Favorite Recipes</h1>
    )
};

export default FavoriteRecipes;