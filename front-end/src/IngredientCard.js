import React from 'react';
import { Link } from 'react-router-dom';
import './IngredientCard.css';

const IngredientCard = ({ ingredient }) => {
    
    const imgSrc = `https://picsum.photos/100?id=${ingredient.id}`;

    return (
        <div className="ingredient-card">
        <Link to={`/IngredientDetails/${ingredient.id}`} className="ingredient-link">
            
                <h1 className='ingredient-title'>{ingredient.name}</h1>
                <img src={imgSrc} alt={`${ingredient.name}`} />            
        </Link>
        </div>
    );
};

export default IngredientCard;