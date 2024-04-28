import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./IngredientDetails.css";
import { Link, useNavigate } from "react-router-dom";
// import { useIngredientContext } from './IngredientContext';

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const [ingredient, setIngredient] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect is being called ");
    axios
      .get(`http://104.236.7.34:3001/api/myFridge/${ingredientId}`)
      .then((response) => {
        setIngredient(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [ingredientId]);

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  const handleDeleteButtonClick = () => {
    axios
      .delete(`http://104.236.7.34:3001/api/deleteIngredient/${ingredientId}`)
      .then((response) => {
        console.log(
          " ingredient has been removed from fridge: ",
          response.data
        );
        navigate('/fridge')

      })
      .catch((err) => {
        console.log(" error trying to remove ingredient: ", err);
      });
  };

  return (
    <div className="ingredient-details">
      <Link className="link-back-fridge" to="/fridge">
        <h3 className="navigate-back-my-fridge"> &#x2190; My Fridge </h3>
      </Link>

      <div className="ingredient-name-and-image-container">
        <div>
          <h1>{ingredient.ingredient_name}</h1>
        </div>
        <img className="ingredient-image" src={`http://104.236.7.34:3001/${ingredient.img}`} alt="ingredient" />
      </div>

      <div className="expiry-date-and-quantity-container">
        <div className="expiry-date-and-quantity-box">
          <h4>Expiry Date: {ingredient.expiry_date.slice(0,10)} </h4>
        </div>
        <div className="expiry-date-and-quantity-box">
          <h4>Quantity: {ingredient.quantity} </h4>
        </div>
      </div>

      <div className="ingredient-btn-section">
        <div>
          <Link to={`/editIngredient/${ingredientId}`}>
            <button className="nav-to-edit-button" type="submit">
              {" "}
              Edit Ingredient
            </button>
          </Link>
        </div>
        <div>
          
            <button
              className="delete-button"
              type="click"
              onClick={handleDeleteButtonClick}
            >
              {" "}
              Delete Ingredient{" "}
            </button>
    
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
