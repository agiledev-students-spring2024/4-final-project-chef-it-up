import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './individualRecipeDetail.css'
import { Link, useNavigate } from 'react-router-dom';



const IndividualRecipeDetail = () => {

    const { recipeId } = useParams();
    const [getRecipe, setRecipe] = useState();
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

  
    // const { getRecipe } = useRecipeContext(); // getting the cards related recipe details

    useEffect(() => {
        console.log("useEffect is being called ")
        axios.get(`http://localhost:3001/api/individualRecipeInfo/${recipeId}`)
            .then(response => {
                setRecipe(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching recipe:", error);

            });
    }, [recipeId]);

    if (!getRecipe) {
        return <div>Loading...</div>;
    }


    //const imgSrc = `https://picsum.photos/200?id=${recipeId}`;

    const handleSaveButtonClick = () => {

        const favoriteRecipeData = {
            recipe_name: getRecipe.recipe_name,
            img: getRecipe.img,
            ingredients: getRecipe.ingredients,
            instructions: getRecipe.instructions,
            prep_time: getRecipe.prep_time,
            cook_time: getRecipe.cook_time,
            total_time: getRecipe.total_time,
            cuisine: getRecipe.cuisine,
            difficulty_level: getRecipe.difficulty_level,
            mealType: getRecipe.mealType,
            
        }

        axios.post(`http://104.236.7.34:3001/api/addToFavorite/${recipeId}/${userId}`, favoriteRecipeData)
        .then(response => {
            console.log(" recipe has been added to favorites: ", response.data)
            navigate('/favoriteRecipes');


        })
        .catch( err =>{
            console.log(" error trying to add recipes to favorite: ", err)

        })
        // Placeholder for saving functionality
        alert(`You clicked the button to add the recipe to your favorite list: ${getRecipe.recipe_name} recipe.`);
    };

    return (
        <div className="individual-recipe">
            
            <Link className='link-back-browse' to='/browseRecipes' >
                <h3 className='navigate-back-browse'> &#x2190; Browse Recipes</h3>
            </Link>
            

            <div className='img-and-cuisine-container'>
                <div>
                    <h1>{getRecipe.recipe_name}</h1>
                </div>
               
                <img className='recipe-img-container' src={ `http://104.236.7.34:3001/${getRecipe.img}`} alt='picture of dish'/>

                <div className='difficulty-and-cuisine-container'>
                    <div className="diff-and-cuisine-box">
                        <h3>Cuisine: {getRecipe.cuisine}</h3>
                    </div>
                    <div className="diff-and-cuisine-box">
                        <h3>Difficulty: {getRecipe.difficulty_level}</h3>
                    </div>
                    <div className="diff-and-cuisine-box">
                        <h3>Meal type: {getRecipe.mealType}</h3>
                    </div>
                </div>

            </div>
            
            <div className="time-container">
                <div className="time-box">
                    <h4>Prep Time: {getRecipe.prep_time} minutes</h4>
                </div>
                <div className="time-box">
                    <h4>Cook Time: {getRecipe.cook_time} minutes</h4>
                </div>
                <div className="time-box">
                    <h4>Total Time: {getRecipe.total_time} minutes</h4>
                </div>
            </div>

            <div className='ingredient-container'>
                <h2 className='ingredient-title'>Ingredients:</h2>
                <ul>
                    {(getRecipe.ingredients.split("\n")).map((ingredient,index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                </ul>
            </div>
            
            <div className='direction-container' >
                <h2 className='direction-title' >Directions:</h2>
                <ol>
                    {(getRecipe.instructions.split("\n")).map((instruction,index) => (
                    <li key={index}>{instruction}</li>
                ))}
                </ol>
            </div>
           
            
                <button className="favrorite-recipe-button" onClick={handleSaveButtonClick}>
                    Add to favorite Recipes
                </button> 
            
    
        </div>

    );

}

export default IndividualRecipeDetail;