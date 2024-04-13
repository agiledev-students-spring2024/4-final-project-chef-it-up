import React from "react";
import { Link } from "react-router-dom";
import "./IngredientCard.css";

const IngredientCard = ({ ingredient, baseUrl }) => {
  const imgSrc = `http://localhost:3001/${ingredient.img}`;

  return (
    <div className="ingredient-card">
      <Link className="ingredient-link" to={`${baseUrl}/${ingredient._id}`}>
        <h1 className="ingredient-title">{ingredient.ingredient_name}</h1>
        <img
          className="ingredient-card-image"
          src={imgSrc}
          alt={`${ingredient.name}`}
        />
      </Link>
    </div>
  );
};

export default IngredientCard;
