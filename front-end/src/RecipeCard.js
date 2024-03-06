import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, baseUrl }) => {
    
    const imgSrc = `https://picsum.photos/200?id=${recipe.id}`;

    return (
        <div className="recipe-card">
        <Link className="recipe-link" to={`${baseUrl}/${recipe.id}`}>
            
                <h1 className='receipe-title'>{recipe.recipe_name}</h1>
                <img src={imgSrc} alt={`Image of ${recipe.name}`} />
                <h2>Cuisine type: {recipe.cuisine}</h2>
                <h2>Difficulty: {recipe.difficulty_level}</h2>
            
        </Link>
        </div>
    );
};

export default RecipeCard;