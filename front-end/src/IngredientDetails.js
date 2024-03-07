import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './IngredientDetails.css'
import { Link } from 'react-router-dom';
import { useIngredientContext } from './IngredientContext';


const IngredientDetails = () => {

    const { ingredientId } = useParams();
    const { getIngredient } = useIngredientContext(); 
    
    if (!getIngredient) {
        return <div>No ingredient selected!</div>;
    }

    const imgSrc = `https://picsum.photos/200?id=${ingredientId}`;

   
    return (
        <div className="ingredient-details">
        
            <Link className='link-back-fridge' to='/fridge' >
                <h3 className='navigate-back-my-fridge'> &#x2190; My Fridge </h3>
            </Link>
        
            <div className='ingredient-name-and-image-container'>
                <div>
                <h1>{getIngredient.name}</h1>

                </div>
               
                <img src={imgSrc} alt='ingredient'/>
            </div>

            <div className="expiry-date-and-quantity-container">
                <div className="expiry-date-and-quantity-box">
                    <h4>Expiry Date: {getIngredient.expiry_date} </h4>
                </div>
                <div className="expiry-date-and-quantity-box">
                    <h4>Quantity: {getIngredient.quantity} </h4>
                </div>
            </div>

            <div className="ingredient-btn-section" >
                <div>
                    <Link to="/fridge">
                        <button className="nav-to-edit-button" type="submit"> Edit Ingredient</button>
                    </Link>
                </div>
                <div>
                    <Link to="/frige">
                        <button className="delete-button" type="submit"> Delete Ingredient </button>
            
                    </Link> 
                </div>

            </div>
            
        </div>

    )

}

export default IngredientDetails;