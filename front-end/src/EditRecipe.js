import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EditRecipe.css';
// import { useRecipeContext } from './RecipeContext';

const EditRecipe = () =>{


    const [recipeName, setRecipeName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [prepTime, setPrepTime] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [totalTime, setTotalTime] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("")
    const [mealType, setMealType] = useState("")
    const [error, setError] = useState("")

    const [editedRecipe, setEditedRecipe] = useState();
    const { recipeId } = useParams();

    const options = [
      { value: 'easy', label: 'easy' },
      { value: 'medium', label: 'medium' },
      { value: 'hard', label: 'hard' },
    ]
  
    const mealTypes = [
      { value: 'breakfast', label: 'breakfast' },
      { value: 'lunch', label: 'lunch' },
      { value: 'dinner', label: 'dinner' },
      { value: 'dessert', label: 'dessert' },
    ]

    const CuisineOptions = [
      { value: 'other', label: 'Other' },
      { value: 'italian', label: 'Italian' },
      { value: 'french', label: 'French' },
      { value: 'american', label: 'American' },
      { value: 'indian', label: 'Indian' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'chinese', label: 'Chinese' },
      { value: 'japanese', label: 'japanese' },
      { value: 'korean', label: 'korean' },
      { value: 'Thai', label: 'Thai' },
      { value: 'Mediterranean', label: 'Mediterranean' }
      
    ]
    

    // const { getRecipe, setSelectedRecipe } = useRecipeContext();
    
    useEffect(() => {
      console.log("useEffect is beig called ")
      axios.get(`http://localhost:3001/editRecipeInfo/${recipeId}`)
          .then(response => {
            setEditedRecipe(response.data)
            setRecipeName(response.data.recipe_name);
            setIngredients(response.data.ingredients);
            setInstructions(response.data.instructions);
            setPrepTime(response.data.prep_time);
            setCookTime(response.data.cook_time);
            setTotalTime(response.data.total_time);
            setCuisine(response.data.cuisine);
            setMealType(response.data.mealType)
            console.log(response.data)
          })
          .catch(error => {
              console.error("Error fetching recipe:", error);
  
          });
      }, [recipeId]);
      
      if (!editedRecipe) {
          return <div>still loading!</div>;
      }

      const handleSubmit = (e) => {
        
        
        console.log("api to submit edit is being called")

        axios.put(`http://localhost:3001/editRecipe/${recipeId}`, 
        {
          id: recipeId,
          recipe_name: recipeName,
          imgSrc: `https://picsum.photos/200?id=${recipeId}`,
          ingredients: ingredients,
          instructions: instructions,
          prep_time: prepTime,
          cook_time: cookTime,
          total_time: totalTime,
          difficulty_level: difficultyLevel,
          cuisine: cuisine,
          mealType: mealType

        })
        .then(response => {
          console.log("recipe has been edited: ", response.data)

        })
        .catch( err =>{
          console.log("error trying to edit recipe: ", err)

        })

      
      }

      
    return (
      //onSubmit={handleSubmit}
    
        <form className="add-recipe-form" onClick={handleSubmit}>
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
                value={recipeName}
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
                value={ingredients}
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
                value={instructions}
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
                value={prepTime}
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
                value={cookTime}
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
                value={totalTime}
                onChange={e => setTotalTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="add-recipe-form-field" htmlFor="cuisine">Enter Cuisine Type:</label>
                <br />
              <div class="dropdown">
                <Select options={CuisineOptions} defaultValue={CuisineOptions[0]} onChange={e => setCuisine(e.value)} />
              </div>

            </div>
            
            <h2>Select a difficulty level</h2>
            <div class="dropdown">
              <Select options={options} defaultValue={options[0]} onChange={e => setDifficultyLevel(e.value)} />
            </div>

            <h2>Select a meal level</h2>
            <div class="dropdown">
              <Select options={mealTypes} defaultValue={mealTypes[0]} onChange={e => setMealType(e.value)} />
            </div>
    
            {error && (
                <div>
                  <p className="notwork">{error}</p>
                  <Link to="/">Bypass due to error</Link>
                </div>
            )}
            <div className="btn-section">
            <div>
              
                <button className="submit-edit-button" type="submit" >
                  <Link to="/myRecipes" className="cancel-link">Save Edit</Link> 
                </button>
                
              
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