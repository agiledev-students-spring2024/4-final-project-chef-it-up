import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IndividualRecipeDetail = props =>{

    const [individualRecipe, setindividualRecipe] = useState([]);
    const recipeId = useParams();

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                console.log("fetching random data for 10 recipes")
                const response = await axios.get("https://my.api.mockaroo.com/recipes.json/${recipeId}?key=5f2d0960")  
                setindividualRecipe(response.data)
            }
            catch (err){
               console.log(`Sorry. No more requests allowed today!`)
               console.error(err)

               const backupData = [
                {
                    id: 3,
                    recipe_name: "Honorable",
                    ingredients: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
                    instructions: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                    prep_time: 10,
                    cook_time: 172,
                    total_time: 152,
                    cuisine: "Chinese",
                    difficulty_level: "Medium"
                  },
                ]

                setindividualRecipe(backupData[0])

            }
            
        }

        fetchData()

    }, [recipeId]);

    const imgSrc = `https://picsum.photos/200?id=${recipeId}`;

    const handleSaveButtonClick = () => {
        // Placeholder for saving functionality
        alert(`You clicked the button to add the recipe to your favorite list: ${individualRecipe.recipe_name} recipe.`);
    };

    return (
        <div className="individual-recipe">
            <h2>{individualRecipe.recipe_name}</h2>

            <div>
                <img src={imgSrc} alt='pciture of dish'/>
            </div>

            <p>Cuisine: {individualRecipe.cuisine}</p>

            <div>
                <h4>Prep Time: {individualRecipe.prep_time} minutes</h4>
                <h4>Cook Time: {individualRecipe.cook_time} minutes</h4>
            </div>

            <p>Total Time: {individualRecipe.total_time} minutes</p>

            <div>
                <h2>Ingredients</h2>
                <p>{individualRecipe.ingredients}</p>
            </div>
            
            <div>
                <h2>Directions</h2>
                <p>{individualRecipe.instructions}</p>
            </div>
            
            <h3>Difficulty: {individualRecipe.difficulty}</h3>

            <button className="save-button" onClick={handleSaveButtonClick}>
                Add to favorite Recipes
            </button>
            
        </div>

    )

}

export default IndividualRecipeDetail;