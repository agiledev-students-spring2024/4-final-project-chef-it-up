import React, { useEffect, useState } from 'react';
import { useParams, Link , useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import './EditRecipe.css';
// import { useRecipeContext } from './RecipeContext';

const EditRecipe = () => {

  const [image, setImage] = useState([]);
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
  const navigate = useNavigate();

  const [editedRecipe, setEditedRecipe] = useState();
  const { recipeId } = useParams();

  const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ]

  const mealTypes = [
    { value: 'breakfast', label: 'breakfast' },
    { value: 'lunch', label: 'lunch' },
    { value: 'dinner', label: 'dinner' },
    { value: 'dessert', label: 'dessert' },
  ]

  const CuisineOptions = [
    { value: 'Other', label: 'Other' },
    { value: 'Italian', label: 'Italian' },
    { value: 'French', label: 'French' },
    { value: 'American', label: 'American' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Mediterranean', label: 'Mediterranean' }
    
]
    

    // const { getRecipe, setSelectedRecipe } = useRecipeContext();
    
    useEffect(() => {
      console.log("useEffect is being called ")
      console.log({recipeId})
      axios.get(`http://localhost:3001/api/editRecipeInfo/${recipeId}`)
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
           setDifficultyLevel(response.data.difficulty_level)
          })
          .catch(error => {
              console.error("Error fetching recipe:", error);
          });
      }, [recipeId]);
      
      const handleImageChange = (e) => {
        const file = e.target.files[0]; // Assuming you're allowing only one image to be uploaded
        setImage([file]);
      };

      const handleSubmit = (e) => {
        e.preventDefault()
        console.log("api to submit edit is being called")
        
        const formData = new FormData();

        formData.append("recipeId", recipeId)
        formData.append("recipeName", recipeName)
        formData.append("image", image[0]) // Assuming image is an array containing the file
        formData.append("ingredients", ingredients)
        formData.append("instructions", instructions)
        formData.append("prepTime", prepTime)
        formData.append("cookTime", cookTime)
        formData.append("totalTime", totalTime)
        formData.append("difficultyLevel", difficultyLevel)
        formData.append("cuisine", cuisine)
        formData.append("mealType", mealType)

        axios.post(`http://localhost:3001/api/editRecipe/${recipeId}`, formData)
        .then(response => {
          console.log("recipe has been edited: ", response.data)
          navigate("/myRecipes")
        })
        .catch((error) =>{
          console.log(`Received server error: ${error}`);
          if (error.response && error.response.data && error.response.data.errors) {
            setError(error.response.data.errors[0].msg);
          } else {
            setError("Failed to add Recipe");
          } 
        })

      
      }

      
    return (
      //onSubmit={handleSubmit}
    
        <form className="add-recipe-form" onSubmit={handleSubmit}>
          <main className="App">
            <h1>Add Your Own Recipe</h1>
            <h2>{error}</h2>
            <div class="formField">
              <div>
              <label className="add-recipe-form-field"  htmlFor="recipeName" >Enter your recipe name:</label>
              </div>
             
              <div>
              <input
                id="recipeName"
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
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
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
                onChange={(e) => setIngredients(e.target.value)}
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
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="prepTime">Enter Preparation Time:</label>
              <br />
              <input
                id="prepTime"
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="cookTime">Enter Cooking Time:</label>
              <br />
              <input
                id="cookTime"
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                required
              />
            </div>
            <div class="formField">
              <label className="add-recipe-form-field" htmlFor="totalTime">Enter Total Time:</label>
              <br />
              <input
                id="totalTime"
                type="number"
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value)}
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
              <Select 
              options={options} 
              defaultValue={options[0]} 
              onChange={e => setDifficultyLevel(e.value)} 
              required />
            </div>

            <h2>Select a meal level</h2>
            <div class="dropdown">
              <Select 
              options={mealTypes} 
              defaultValue={mealTypes[0]} 
              onChange={e => setMealType(e.value)}
              required />
            </div>

            {error && (
              <div>
                <p className="notwork">{error}</p>
              </div>
            )}

            <div className="btn-section">
            <div>
              
                <button className="submit-edit-button" type="submit" >Save Edit</button>
                
              
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