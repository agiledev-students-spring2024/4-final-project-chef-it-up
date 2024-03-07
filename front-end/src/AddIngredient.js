import React, { useState }from "react";
import { Link } from 'react-router-dom'
import axios from "axios"
import './AddIngredient.css'
import Select from 'react-select'

const AddIngredient = () =>{
    const [ingredientName, setIngredientName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        
        axios
          .post("Backend",{
            ingredientName:ingredientName,
            quantity:quantity,
            expiryDate:expiryDate,
          })
          .then(response => {
            console.log(`Received server response: ${response.data}`)
          })
          .catch(err => {
            console.log(`Received server error: ${err}`)
            setError(
              "This ain't working just yet, give us some time :)"
            )
          })
      }

    return (
    
    <form className="add-ingredient-form" onSubmit={handleSubmit}>
      <main className="App">
        <h1>Add Ingredient</h1>
        <div class="formField">
          <div>
          <label className="add-ingredient-form-field"  htmlFor="ingredientName" >Enter your ingredient name:</label>
          </div>
         
          <div>
          <input
            id="ingredientName"
            type="text"
            placeholder="Ingredient Name"
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
                placeholder="10"
                onChange={e => setQuantity(e.target.value)}
                required
            />
            </div>
        </div>

        <div className="btn-section">
        <div>
          <Link to="/fridge">
            <button className="submit-ingredient-button" type="submit" > Add Ingredient</button>
            
          </Link>
        </div>
        <div>
          <button className="cancel-submit-ingredient">
            <Link to="/fridge" className="cancel-link">Cancel your changes</Link>

          </button>
          
        </div>

        </div>
        
      </main>
    </form>
    )
};

export default AddIngredient;