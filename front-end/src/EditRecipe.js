import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import './EditRecipe.css';
import { useRecipeContext } from './RecipeContext';

const EditRecipe = () =>{
    const [recipeName, setRecipeName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [prepTime, setPrepTime] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [totalTime, setTotalTime] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("")
    const [error, setError] = useState("")

    const { getRecipe, setSelectedRecipe } = useRecipeContext();
    const [editedRecipe, setEditedRecipe] = useState(getRecipe || {});

    const options = [
      { value: 'easy', label: 'easy' },
      { value: 'medium', label: 'medium' },
      { value: 'hard', label: 'hard' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the recipe in context
        setSelectedRecipe(editedRecipe);
        // Redirect or perform other actions
    };


    return (
    
        <form className="add-recipe-form" onSubmit={handleSubmit}>
          <main className="App">
            <h1>Add Your Own Recipe</h1>
            <div class="formField">
              <div>
              <label className="add-recipe-form-field"  htmlFor="recipeName" >Enter your recipe name:</label>
              </div>
             
              <div>
              <input
                id="recipeName"
                type="text"
                value={editedRecipe.recipe_name}
                onChange={e => setEditedRecipe(e.target.value)}
                required
              />
              </div>
              
            </div>
    
            <div class="formField">
              <div>
              <label className="add-recipe-form-field"  htmlFor="recipeImage">Upload image of recipe:</label>
              </div>
             
              <div>
              <input
                id="recipeImage"
                type="file"
                accept="image/*"
                onChange={e => setRecipeName(e.target.value)}
                required
              />
              </div>
              
            </div>
    
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="ingredients">Add the ingredients:</label>
              <br />
              <textarea
                id="ingredients"
                type="text"
                value={editedRecipe.ingredients}
                onChange={e => setIngredients(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="instructions">List Instructions:</label>
              <br />
              <textarea
                id="instructions"
                type="text"
                value={editedRecipe.instructions}
                onChange={e => setInstructions(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="prepTime">Enter Preparation Time:</label>
              <br />
              <input
                id="prepTime"
                type="text"
                value={editedRecipe.prep_time}
                onChange={e => setPrepTime(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="cookTime">Enter Cooking Time:</label>
              <br />
              <input
                id="cookTime"
                type="text"
                value={editedRecipe.cook_time}
                onChange={e => setCookTime(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="totalTime">Enter Total Time:</label>
              <br />
              <input
                id="totalTime"
                type="text"
                value={editedRecipe.total_time}
                onChange={e => setTotalTime(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="cuisine">Enter Cuisine Type:</label>
              <br />
              <input
                id="cuisine"
                type="text"
                value={editedRecipe.cuisine}
                onChange={e => setCuisine(e.target.value)}
                required
              />
            </div>
            <h2>Select a difficulty level</h2>
            <div class="dropdown">
              <Select options={options} defaultValue={options[0]} onChange={e => setDifficultyLevel(e.value)} />
            </div>
    
            {error && (
                <div>
                  <p className="notwork">{error}</p>
                  <Link to="/">Bypass due to error</Link>
                </div>
            )}
            <div className="btn-section">
            <div>
              <Link to="/myRecipes">
                <button className="submit-edit-button" type="submit" >Save Edit</button>
                
              </Link>
            </div>
            <div>
              <button className="cancel-edit-recipe">
                <Link to="/myRecipes" className="cancel-link">Cancel Edit</Link>
    
              </button>
              
            </div>
    
            </div>
            
          </main>
        </form>
    )

};

export default EditRecipe;