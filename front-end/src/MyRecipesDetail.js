import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MyRecipesDetail.css'
import { Link } from 'react-router-dom';


const MyRecipesDetail = props =>{

    const [individualRecipe, setindividualRecipe] = useState([]);
    const { recipeId } = useParams();
    console.log(recipeId)

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                console.log("fetching random data for 10 recipes")
                const response = await axios.get(``)  //running low on free uses https://my.api.mockaroo.com/recipes.json?key=5f2d0960
                const recipeWithId1 = response.data.find(recipe => recipe.id === parseInt(recipeId));

                if (recipeWithId1) {
                    setindividualRecipe(recipeWithId1);
                } else {
                    console.log(`Recipe with ID ${recipeId} not found`);
                    // You may handle the case where the recipe with the specified ID is not found
                }
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

    const handleUnfavoriteButtonClick= () => {
        // Placeholder for saving functionality
        alert(`You clicked the button to add the recipe to your favorite list: ${individualRecipe.recipe_name} recipe.`);
    };

    return (
        <div className="individual-recipe">
        
            <Link className='link-back-favorite' to='/myRecipes' >
                <h3 className='naviagate-back-my'> &#x2190; Browse My Recipes</h3>
            </Link>
        
            <div className='img-and-cuisine-container'>
                <div>
                <h1>{individualRecipe.recipe_name}</h1>

                </div>
               
                <img src={imgSrc} alt='pciture of dish'/>
                <div className='difficulty-and-cuisine-container'>
                    <div className="diff-and-cuisine-box">
                        <h3>Cuisine: {individualRecipe.cuisine}</h3>
                    </div>
                    <div className="diff-and-cuisine-box">
                        <h3>Difficulty: {individualRecipe.difficulty_level}</h3>
                    </div>
                    
                </div>
            </div>

            <div className="time-container">
                <div className="time-box">
                    <h4>Prep Time: {individualRecipe.prep_time} minutes</h4>
                </div>
                <div className="time-box">
                    <h4>Cook Time: {individualRecipe.cook_time} minutes</h4>
                </div>
                <div className="time-box">
                    <h4>Total Time: {individualRecipe.total_time} minutes</h4>
                </div>
            </div>

            

            <div className='ingredient-container'>
                <h2 className='ingredient-title'>Ingredients:</h2>
                <ul>
                    <li>{individualRecipe.ingredients}</li>
                    <li>{individualRecipe.ingredients}</li>
                    <li>{individualRecipe.ingredients}</li>
                    
                 </ul>
                
            </div>
            
            <div className='direction-container' >
                <h2 className='direction-title' >Directions:</h2>
                <ol>
                    <li>{individualRecipe.instructions}</li>
                    <li>{individualRecipe.instructions}</li>
                    <li>{individualRecipe.instructions}</li>
                </ol>
 
            </div>
            
            

            <div className="my-recipe-btn-section" >
                <div>
                    <Link to="/e">
                        <button className="nav-to-edit-button" type="submit"> Edit Recipe</button>
                    </Link>
                </div>
                <div>
                    <Link to="/myProfile">
                        <button className="delete-button" type="submit"> Delete Recipe </button>
            
                    </Link> 
                </div>

            </div>
            
        </div>

    )

}

export default MyRecipesDetail;