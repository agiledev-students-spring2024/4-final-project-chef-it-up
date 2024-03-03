import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    
    const imgSrc = `https://picsum.photos/200?id=${recipe.id}`;

    return (
        <div className="recipe-card">
        <Link to={`/Individualrecipe/${recipe.id}`} className="recipe-link">
            
                <h1 className='receipe-title'>{recipe.recipe_name}</h1>
                <img src={imgSrc} alt={`Image of ${recipe.name}`} />
                <p>Difficulty: {recipe.difficulty_level}</p>
            
        </Link>
        </div>
    );
};

export default RecipeCard;