import React, { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './RecipeCard.css';
import './MyRecipes.css';
import RecipeCard from './RecipeCard';

// import { useRecipeContext } from './RecipeContext';


const MyRecipes= () =>{
    // const { getCurrRecipe } = useRecipeContext(); // gets the getrecip which is called the setSelectedRecipe
    const [recipes, setRecipes] = useState([])

    useEffect(() =>{
        console.log("fetching random data for 10 recipes")
        axios.get("http://localhost:3001/api/myRecipes")
            .then(response => {
                console.log("my recipes:", response.data);
                setRecipes(response.data)
            })
            .catch(err =>{
                console.log("error getting my recipes")
                console.error(err)

            })
        

    }, [])

    /*const handleRecipeClick = (recipe) => {
        getCurrRecipe(recipe);
    };
    */


    return ( 
        <div className="recipes-contianer">
            <h1>My Recipes</h1>

            <div className="btn-my-receipe-section" >
                <div>
                    <Link to="/addRecipe">
                        <button className="nav-to-add-recipe" type="submit"> Add a Recipe</button>
                    </Link>
                </div>

                <div>
                    <Link to="/generateRecipe">
                         <button className="nav-to-generate-recipe" type="submit"> Generate a Recipe </button>
            
                    </Link>
                </div>
            </div>

            <div className="recipes-card-container">
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe}  baseUrl="/myRecipes"/>
                
                ))}

            </div>      
        </div>
        
    )
};
    

export default MyRecipes;