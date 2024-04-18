import React, { useState, useEffect } from "react";
import "./BrowseRecipes.css";
import RecipeCard from "./RecipeCard";
import Select from "react-select";
// import { useRecipeContext } from './RecipeContext';
import axios from "axios";
import { Link } from "react-router-dom";

const BrowseRecipes = () => {
  const jwtToken = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  const mealTypeLabel = ["breakfast", "lunch", "dinner", "dessert"];
  const difficultyLevelLabel = ["Easy", "Medium", "Hard"];

  const CuisineOptions = [
    { value: "Other", label: "Other" },
    { value: "Italian", label: "Italian" },
    { value: "French", label: "French" },
    { value: "American", label: "American" },
    { value: "Indian", label: "Indian" },
    { value: "Mexican", label: "Mexican" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Thai", label: "Thai" },
    { value: "Mediterranean", label: "Mediterranean" },
  ];

  const num = 1;

  // const { getCurrRecipe } = useRecipeContext(); // gets the getrecip which is called the setSelectedRecipe
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // if we already have a JWT token in local storage, set this to true, otherwise false

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/browseRecipes", {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Send the JWT token in the authorization header
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false);
      });
  }, []);

  const filterByCuisine = async (cuisine) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/filterRecipes/cuisine/${cuisine}/${num}/${userId}`
      );
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error("Error filtering recipes by cuisine:", error);
    }
  };

  const filterByMealType = async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/filterRecipes/mealtypes/${type}/${num}/${userId}`
      );
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error("Error filtering recipes by meal type:", error);
    }
  };

  const filterByDifficultyLevel = async (level) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/filterRecipes/difficulty/${level}/${num}/${userId}`
      );
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error("Error filtering recipes by difficulty level:", error);
    }
  };

  /* commented out for now as may refactor 
    const handleRecipeClick = (recipe) => {
      getCurrRecipe(recipe);
    };
    */

  // note: got rid of onClick={() => handleRecipeClick(recipe)} in <RecipeCard key={recipe.id} recipe={recipe} baseUrl="/individualRecipe" /> (line 59)

  return (
    <div className="recipes-contianer">
      {isLoggedIn ? (
        <>
          <h1>Browse Recipes</h1>

          <div className="browse-recipe-filter">
            <h2>Filter by cuisine</h2>
            <div className="search-container">
              <div className="search-cuisine">
                <Select
                  className="dropdown-recipe"
                  options={CuisineOptions}
                  defaultValue={CuisineOptions[0]}
                  onChange={(e) => setCuisine(e.value)}
                />
                <button
                  className="search-button"
                  onClick={() => filterByCuisine(cuisine)}
                >
                  Search
                </button>
              </div>
            </div>

            <div>
            <h2>Filter by meal type:</h2>
              <div className="meal-nav">
                
                {mealTypeLabel.map((type) => (
                  <button
                    className="filter-buttons"
                    key={type}
                    onClick={() => filterByMealType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <h2>Filter by difficulty level:</h2>
              <div className="difficulty-nav">
                
                {difficultyLevelLabel.map((level) => (
                  <button
                    className="filter-buttons"
                    key={level}
                    onClick={() => filterByDifficultyLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="nav-recipes-buttons">
            <Link to="/myRecipes">
              <button className="nav-to-recipe" type="submit">
                To My Recipes &#8594;
              </button>
            </Link>

            <Link to="/favoriteRecipes">
              <button className="nav-to-recipe" type="submit">
                To Favorite Recipes &#8594;
              </button>
            </Link>
          </div>
          <div className="recipes-card-container">
            {/** tenerary operator basically the first part is condisitonal if its strue then we render i teh filtered recipes else we just render in all recipes */}
            {(filteredRecipes.length > 0 ? filteredRecipes : recipes).map(
              (recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  baseUrl="/individualRecipe"
                />
              )
            )}
          </div>
        </>
      ) : (
        <div>
          <p>You are not authorized to use this feature. Please <Link to="/">log in</Link> first</p>
        </div>
      )}
    </div>
  );
};

export default BrowseRecipes;
