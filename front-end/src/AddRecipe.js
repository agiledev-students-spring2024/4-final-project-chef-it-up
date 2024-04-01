import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import "./AddRecipe.css";

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [image, setImage] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [mealType, setMealType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const options = [
    { value: "easy", label: "easy" },
    { value: "medium", label: "medium" },
    { value: "hard", label: "hard" },
  ];

  const meals = [
    { value: "breakfast", label: "breakfast" },
    { value: "lunch", label: "lunch" },
    { value: "dinner", label: "dinner" },
    { value: "dessert", label: "dessert" },
  ];

  const CuisineOptions = [
    { value: "other", label: "Other" },
    { value: "italian", label: "Italian" },
    { value: "french", label: "French" },
    { value: "american", label: "American" },
    { value: "indian", label: "Indian" },
    { value: "mexican", label: "Mexican" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "japanese" },
    { value: "korean", label: "korean" },
    { value: "Thai", label: "Thai" },
    { value: "Mediterranean", label: "Mediterranean" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeName,
        image,
        ingredients,
        instructions,
        prepTime,
        cookTime,
        totalTime,
        cuisine,
        difficultyLevel,
        mealType,
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/browseRecipes");
          return response.json();
        } else if (response.status === 401) {
          throw new Error("Invalid recipe");
        }
        console.log(`Received server response: ${response.data}`);
      })
      .catch((err) => {
        console.log(`Received server error: ${err}`);
        setError("Failed to add recipe");
      });
    //axios
    //  .post("http://localhost:3001/api/addRecipe",{
    //    recipeName:recipeName,
    //    ingredients:ingredients,
    //    instructions:instructions,
    //    prepTime:prepTime,
    //    cookTime:cookTime,
    //    totalTime:totalTime,
    //    cuisine:cuisine,
    //    difficultyLevel:difficultyLevel,
    //    mealType:mealType
    //  })
    //  .then(response => {
    //    console.log(`Received server response: ${response.data}`)
    //  })
    //  .catch(err => {
    //    console.log(`Received server error: ${err}`)
    //    setError(
    //      "This ain't working just yet, give us some time :)"
    //    )
    //  })
  };

  return (
    <form className="add-recipe-form" onSubmit={handleSubmit}>
      <main className="App">
        <h1>Add Your Own Recipe</h1>
        <div class="formField">
          <div>
            <label className="add-recipe-form-field" htmlFor="recipeName">
              Enter your recipe name:
            </label>
          </div>

          <div>
            <input
              id="recipeName"
              type="text"
              placeholder="Recipe Name"
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="formField">
          <div>
            <label className="add-recipe-form-field" htmlFor="recipeImage">
              Upload image of recipe:
            </label>
          </div>

          <div>
            <input
              id="recipeImage"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="formField">
          <label className="add-recipe-form-field" htmlFor="ingredients">
            Add the ingredients:
          </label>
          <br />
          <textarea
            id="ingredients"
            type="text"
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label className="add-recipe-form-field" htmlFor="instructions">
            List Instructions:
          </label>
          <br />
          <textarea
            id="instructions"
            type="text"
            placeholder="Instructions"
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label className="add-recipe-form-field" htmlFor="prepTime">
            Enter Preparation Time:
          </label>
          <br />
          <input
            id="prepTime"
            type="text"
            placeholder="Preparation Time"
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label className="add-recipe-form-field" htmlFor="cookTime">
            Enter Cooking Time:
          </label>
          <br />
          <input
            id="cookTime"
            type="text"
            placeholder="Cook Time"
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </div>
        <div class="formField">
          <label className="add-recipe-form-field" htmlFor="totalTime">
            Enter Total Time:
          </label>
          <br />
          <input
            id="totalTime"
            type="text"
            placeholder="Total Cooking Time"
            onChange={(e) => setTotalTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="add-recipe-form-field" htmlFor="cuisine">
            Enter Cuisine Type:
          </label>
          <br />
          <div class="dropdown">
            <Select
              options={CuisineOptions}
              defaultValue={CuisineOptions[0]}
              onChange={(e) => setCuisine(e.value)}
            />
          </div>
        </div>

        <h2>Select a difficulty level</h2>
        <div class="dropdown">
          <Select
            options={options}
            defaultValue={options[0]}
            onChange={(e) => setDifficultyLevel(e.value)}
          />
        </div>
        <h2>Select a meal type</h2>
        <div class="dropdown">
          <Select
            options={meals}
            defaultValue={meals[0]}
            onChange={(e) => setMealType(e.value)}
          />
        </div>

        {error && (
          <div>
            <p className="notwork">{error}</p>
            <Link to="/">Bypass due to error</Link>
          </div>
        )}
        <div className="btn-section">
          <div>
            <button className="submit-recipe-button" type="submit">
              {" "}
              Add Recipe
            </button>
          </div>
          <div>
            <button className="cancel-submit-recipe">
              <Link to="/browseRecipes" className="cancel-link">
                Cancel your changes
              </Link>
            </button>
          </div>
        </div>
      </main>
    </form>
  );
};

export default AddRecipe;
