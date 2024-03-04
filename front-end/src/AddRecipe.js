import React, { useState }from "react";
import { Link } from 'react-router-dom'
import axios from "axios"
import Select from 'react-select'
import './AddRecipe.css'

const AddRecipe = () =>{
    const [recipeName, setRecipeName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [prepTime, setPrepTime] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [totalTime, setTotalTime] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("")
    const [error, setError] = useState("")

    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
      ]

    const handleSubmit = e => {
        e.preventDefault()
        
        axios
          .post("Backend",{
            recipeName:recipeName,
            ingredients:ingredients,
            instructions:instructions,
            prepTime:prepTime,
            cookTime:cookTime,
            totalTime:totalTime,
            cuisine:cuisine,
            difficultyLevel:difficultyLevel,
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
    <form onSubmit={handleSubmit}>
      <main className="App">
        <h1>Add Your Own Recipe</h1>
        <div class="formField">
          <label htmlFor="recipeName">Enter your recipe name:</label>
          <br />
          <input
            id="recipeName"
            type="text"
            placeholder="Recipe Name"
            onChange={e => setRecipeName(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label htmlFor="ingredients">Add the ingredients:</label>
          <br />
          <input
            id="ingredients"
            type="text"
            placeholder="Ingredients"
            onChange={e => setIngredients(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label htmlFor="instructions">List Instructions:</label>
          <br />
          <input
            id="instructions"
            type="text"
            placeholder="Instructions"
            onChange={e => setInstructions(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label htmlFor="prepTime">Enter Preparation Time:</label>
          <br />
          <input
            id="prepTime"
            type="text"
            placeholder="Preparation Time"
            onChange={e => setPrepTime(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label htmlFor="cookTime">Enter Cooking Time:</label>
          <br />
          <input
            id="cookTime"
            type="text"
            placeholder="Cook Time"
            onChange={e => setCookTime(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label htmlFor="totalTime">Enter Total Time:</label>
          <br />
          <input
            id="totalTime"
            type="text"
            placeholder="Total Cooking Time"
            onChange={e => setTotalTime(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label htmlFor="cuisine">Enter Cuisine Type:</label>
          <br />
          <input
            id="cuisine"
            type="text"
            placeholder="Cuisine"
            onChange={e => setCuisine(e.target.value)}
            required
          />
        </div>
        <div class="dropdown">
          <p>Select a Difficulty Level</p>
          <Select options={options} defaultValue={options[0]} onChange={e => setDifficultyLevel(e.value)} />
        </div>

        {error && (
            <div>
              <p className="notwork">{error}</p>
              <Link to="/">Bypass due to error</Link>
            </div>
        )}
        <div>
          <Link to="/browseRecipes">
            <input type="submit" value="Add Recipe"/>
          </Link>
        </div>
        <div>
          <Link to="/browseRecipes">Cancel your changes</Link>
        </div>
      </main>
    </form>
    )
};

export default AddRecipe;