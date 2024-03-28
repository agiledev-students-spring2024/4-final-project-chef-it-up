import React from 'react';
import { Link } from 'react-router-dom';
import './IngredientCard.css';

const IngredientCard = ({ ingredient, baseUrl }) => {
    
    const imgSrc = `https://picsum.photos/200?id=${ingredient.id}`;

    return (
        <div className="ingredient-card">
        <Link className="ingredient-link" to={`${baseUrl}/${ingredient.id}`}>
            
                <h1 className='ingredient-title'>{ingredient.ingredient_name}</h1>
                <img className='ingredient-card-image' src={imgSrc} alt={`${ingredient.name}`} />            
        </Link>
        </div>
    );
};

export default IngredientCard;