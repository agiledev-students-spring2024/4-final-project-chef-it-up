import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

// note: got rid of the onClick part in RecipeCard = ({ recipe, baseUrl})
// also got rid of onClick for <div className="recipe-card" onClick={onClick}> (line 13)

const RecipeCard = ({ recipe, baseUrl}) => {
    
    const imgSrc = `http://localhost:3001/${recipe.img}`

    return (
        <div className="recipe-card">
        <Link className="recipe-link" to={`${baseUrl}/${recipe._id}`}>
                 
                <h1>{recipe.id}</h1>
                <h1 className='receipe-title'>{recipe.recipe_name}</h1>
                <img className='recipe-card-img' src={imgSrc} alt={`Image of ${recipe.recipe_name}`} />
                <h2>Cuisine type: {recipe.cuisine}</h2>
                <h2>Difficulty: {recipe.difficulty_level}</h2>
            
        </Link>
        </div>
    );
};

export default RecipeCard;

