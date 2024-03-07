import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualFavoriteDetail.css'
import { Link } from 'react-router-dom';
import { useRecipeContext } from './RecipeContext';

const IndividualFavoriteDetail = () =>{

    const { recipeId } = useParams();
    const { getRecipe } = useRecipeContext();
    
    if (!getRecipe) {
        return <div>No recipe selected!</div>;
    }

    const imgSrc = `https://picsum.photos/200?id=${recipeId}`;

    const handleUnfavoriteButtonClick= () => {
        // Placeholder for saving functionality
        alert(`You clicked the button to add the recipe to your favorite list: ${getRecipe.recipe_name} recipe.`);
    };

    return (
        <div className="individual-recipe">
        
            <Link className='link-back-favorite' to='/favoriteRecipes' >
                <h3 className='navigate-back-favorite'> &#x2190; Browse Favorite Recipes</h3>
            </Link>
        
            <div className='img-and-cuisine-container'>
                <div>
                <h1>{getRecipe.recipe_name}</h1>

                </div>
               
                <img src={imgSrc} alt='pciture of dish'/>
                <div className='difficulty-and-cuisine-container'>
                    <div className="diff-and-cuisine-box">
                        <h3>Cuisine: {getRecipe.cuisine}</h3>
                    </div>
                    <div className="diff-and-cuisine-box">
                        <h3>Difficulty: {getRecipe.difficulty_level}</h3>
                    </div>
                    
                </div>
            </div>

            <div className="time-container">
                <div className="time-box">
                    <h4>Prep Time: {getRecipe.prep_time} minutes</h4>
                </div>
                <div className="time-box">
                    <h4>Cook Time: {getRecipe.cook_time} minutes</h4>
                </div>
                <div className="time-box">
                    <h4>Total Time: {getRecipe.total_time} minutes</h4>
                </div>
            </div>

            

            <div className='ingredient-container'>
                <h2 className='ingredient-title'>Ingredients:</h2>
                <ul>
                    <li>{getRecipe.ingredients}</li>
                    <li>{getRecipe.ingredients}</li>
                    <li>{getRecipe.ingredients}</li>
                    
                 </ul>
                
            </div>
            
            <div className='direction-container' >
                <h2 className='direction-title' >Directions:</h2>
                <ol>
                    <li>{getRecipe.instructions}</li>
                    <li>{getRecipe.instructions}</li>
                    <li>{getRecipe.instructions}</li>
                </ol>
 
            </div>
            
            

            <Link to='/favoriteRecipes'>
                <button className="unfavrorite-recipe-button" onClick={handleUnfavoriteButtonClick}>
                    Unfavorite Recipe
                </button>

            </Link>
            
            
        </div>

    )

}

export default IndividualFavoriteDetail;