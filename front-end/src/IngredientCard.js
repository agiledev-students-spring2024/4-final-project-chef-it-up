import React from 'react';
import { Link } from 'react-router-dom';
import './IngredientCard.css';

const IngredientCard = ({ ingredient, onClick }) => {
    
    const imgSrc = `https://picsum.photos/200?id=${ingredient.id}`;

    return (
        <div className="ingredient-card" onClick={onClick}>
        <Link className="ingredient-link" to={`/IngredientDetails/${ingredient.id}`}>
            
                <h1 className='ingredient-title'>{ingredient.name}</h1>
                <img className='ingredient-card-image' src={imgSrc} alt={`${ingredient.name}`} />            
        </Link>
        </div>
    );
};

export default IngredientCard;