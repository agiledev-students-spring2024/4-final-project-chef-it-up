import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './IngredientDetails.css'
import { Link } from 'react-router-dom';
// import { useIngredientContext } from './IngredientContext';


const IngredientDetails = () => {

    const { ingredientId } = useParams();
    const [ingredient, setIngredient] = useState();
    // const { getIngredient } = useIngredientContext(); 

   useEffect(() => {
    console.log("useEffect is being called ")
    axios.get(`http://localhost:3001/api/myFridge/${ingredientId}`)
        .then(response => {
            setIngredient(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error("Error fetching recipe:", error);

        });
    }, [ingredientId]);

    if (!ingredient) {
        return <div>No ingredient selected!</div>;
    }

    // const imgSrc = `https://picsum.photos/200?id=${ingredientId}`;

    const handleDeleteButtonClick = () => {
        
        axios.delete(`http://localhost:3001/api/deleteIngredient/${ingredientId}`)
        .then(response => {
            console.log(" ingredient has been removed from fridge: ", response.data)

        })
        .catch( err =>{
            console.log(" error trying to remove ingredient: ", err)

        })

    }

    return (
        <div className="ingredient-details">
        
            <Link className='link-back-fridge' to='/fridge' >
                <h3 className='navigate-back-my-fridge'> &#x2190; My Fridge </h3>
            </Link>
        
            <div className='ingredient-name-and-image-container'>
                <div>
                <h1>{ingredient.ingredient_name}</h1>

                </div>
               
                <img src={ingredient.img} alt='ingredient'/>
            </div>

            <div className="expiry-date-and-quantity-container">
                <div className="expiry-date-and-quantity-box">
                    <h4>Expiry Date: {ingredient.expiry_date} </h4>
                </div>
                <div className="expiry-date-and-quantity-box">
                    <h4>Quantity: {ingredient.quantity} </h4>
                </div>
            </div>

            <div className="ingredient-btn-section" >
                <div>
                    <Link to={`/editIngredient/${ingredientId}`}>
                        <button className="nav-to-edit-button" type="submit"> Edit Ingredient</button>
                    </Link>
                </div>
                <div>
                    <Link to="/fridge">
                        <button className="delete-button" type="click" onClick={handleDeleteButtonClick}> Delete Ingredient </button>
            
                    </Link> 
                </div>

            </div>
            
        </div>

    )

}

export default IngredientDetails;