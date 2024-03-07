import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import './EditIngredient.css';
import { useIngredientContext } from './IngredientContext';

const EditIngredient = () =>{
    const [ingredientName, setIngredientName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [error, setError] = useState("")

    const { getIngredient, setSelectedIngredient } = useIngredientContext();
    const [editedIngredient, setEditedIngredient] = useState(getIngredient || {});

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the ingredient in context
        setSelectedIngredient(editedIngredient);
        // Redirect or perform other actions
    };


    return (
    
        <form className="add-ingredient-form" onSubmit={handleSubmit}>
          <main className="App">
            <h1>Edit Ingredient</h1>
            <div class="formField">
              <div>
              <label className="add-ingredient-form-field"  htmlFor="ingredientName" >Enter your ingredient name:</label>
              </div>
             
              <div>
              <input
                id="ingredientName"
                type="text"
                value={editedIngredient.name}
                onChange={e => setIngredientName(e.target.value)}
                required
              />
              </div>
              
            </div>
    
            <div class="formField">
                <div>
                <label className="add-ingredient-form-field"  htmlFor="ingredientImage">Upload image of ingredient:</label>
                </div>
                
                <div>
                <input
                    id="ingredientImage"
                    type="file"
                    accept="image/*"
                    onChange={e => setIngredientName(e.target.value)}
                    required
                />
            </div>
              
            </div>

            <div class="formField">
            <div>
            <label className="add-ingredient-form-field" htmlFor="ingredientExpiryDate">Enter expiry date</label>
            </div>

            <div>
            <input
                id="ingredientExpiryDate"
                type="date"
                value={editedIngredient.expiry_date}
                onChange={e => setExpiryDate(e.target.value)}
                required
            />
            </div>
        </div>

            <div class="formField">
            <div>
            <label className="add-ingredient-form-field" htmlFor="ingredientQuantity">Enter quantity</label>
            </div>

            <div>
            <input
                id="ingredientQuantity"
                type="number"
                value={editedIngredient.quantity}
                onChange={e => setQuantity(e.target.value)}
                required
            />
            </div>
        </div>

            {error && (
                <div>
                  <p className="notwork">{error}</p>
                  <Link to="/">Bypass due to error</Link>
                </div>
            )}
            <div className="btn-section">
            <div>
              <Link to="/fridge">
                <button className="submit-edit-button" type="submit" >Save Edit</button>
                
              </Link>
            </div>
            <div>
              <button className="cancel-edit-recipe">
                <Link to="/fridge" className="cancel-link">Cancel Edit</Link>
    
              </button>
              
            </div>
    
            </div>
            
          </main>
        </form>
    )

};

export default EditIngredient;