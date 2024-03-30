import React, { useState, useEffect } from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import './FavoriteRecipes.css'
import Select from 'react-select'
import { Link } from "react-router-dom";
// import { useRecipeContext } from './RecipeContext';

const FavoriteRecipes = () =>{
    const [recipes, setRecipes] = useState([])

    const mealTypeLabel = ['breakfast', 'lunch', 'dinner', 'dessert'];
    const difficultyLevelLabel = ['easy', 'medium', 'hard'];
    const CuisineOptions = [
        { value: 'other', label: 'Other' },
        { value: 'italian', label: 'Italian' },
        { value: 'french', label: 'French' },
        { value: 'american', label: 'American' },
        { value: 'indian', label: 'Indian' },
        { value: 'mexican', label: 'Mexican' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'japanese', label: 'japanese' },
        { value: 'korean', label: 'korean' },
        { value: 'Thai', label: 'Thai' },
        { value: 'Mediterranean', label: 'Mediterranean' }
        
      ]
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
            <Link className='link-back-browse' to='/browseRecipes' >
                <h3 className='navigate-back-browse'> &#x2190; Browse Recipes</h3>
            </Link>
            <h1>Favorite Recipes</h1>
            <div className="browse-recipe-filter">

                <h2>filter by cuisine</h2>
                <div className="search-container">
                
                    <form className="search-cuisine">
                    
                         <Select className="dropdown-recipe" options={CuisineOptions} defaultValue={CuisineOptions[0]} />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
                

                <div>
                   

                <div>
                    <h2>filter by meal type:</h2>
                    {mealTypeLabel.map(type => (
                        <button className="filter-buttons"  key={type} >{type}</button>
                    ))}
                </div>
                <div className="difficulty-nav">
                    <h2>filter by difficulty level:</h2>
                    {difficultyLevelLabel.map(level => (
                        <button className="filter-buttons" key={level} >{level}</button>
                    ))}
                </div>

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