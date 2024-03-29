import React, { useState, useEffect }from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import Select from 'react-select'
// import { useRecipeContext } from './RecipeContext';
import axios from 'axios';

const BrowseRecipes = () =>{

    const mealType = [
        { value: 'breakfast', label: 'breakfast' },
        { value: 'lunch', label: 'lunch' },
        { value: 'dinner', label: 'dinner' },
    ]
    const difficultyLevel = [
        { value: 'easy', label: 'easy' },
        { value: 'medium', label: 'medium' },
        { value: 'hard', label: 'hard' },
    ]

    // const { getCurrRecipe } = useRecipeContext(); // gets the getrecip which is called the setSelectedRecipe
    const [recipes, setRecipes] = useState([])
    console.log()

    useEffect(() =>{
        axios.get(('http://localhost:3001/api/browseRecipes')) //running low on free uses  https://my.api.mockaroo.com/recipes.json?key=5f2d0960
            .then(response => {
                console.log("API response:", response.data);
                setRecipes(response.data)
            })
            .catch(err =>{
                console.log(`Sorry. No more requests allowed today!`)
                console.error(err)

                const backupData = [
                 {   
                    id: 1,
                    recipe_name: "Mrs",
                    img: `https://picsum.photos/200?id=1`,
                    ingredients: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                    instructions: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    prep_time: 64,
                    cook_time: 129,
                    total_time: 230,
                    cuisine: "Indian",
                    difficulty_level: "Hard"
                  },
                  
                
                ];

                setRecipes(backupData)

            })

    }, [])

   
   /* commented out for now as may refactor 
    const handleRecipeClick = (recipe) => {
      getCurrRecipe(recipe);
    };
    */

    // note: got rid of onClick={() => handleRecipeClick(recipe)} in <RecipeCard key={recipe.id} recipe={recipe} baseUrl="/individualRecipe" /> (line 59)
                
    return (
        
        <div className="recipes-contianer">
            <h1>Browse Recipes</h1>
            <div className="browse-recipe-filter">
                <h3>filter by cuisine</h3>
                <div className="search-container">
                
                    <form className="search-cuisine">
                        <input
                            id="search-cuisine-name"
                            type="text"
                            placeholder="search by cuisine"
                            required
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
                
                <h3>filter by difficulty</h3>
                <div className="dropdown-filter">
                    
                    <Select options = {difficultyLevel} defaultValue={difficultyLevel[0]} className="filter-difficulty"/>
                    <button className="search-button">filter</button>
                </div>
                <h3>filter by food type</h3>
                <div className="dropdown-filter">
                    
                    <Select options ={mealType} defaultValue={mealType[0]} className="filter-mealType" />
                    <button className="search-button">filter</button>
                </div>
                
            </div>
            <div className="recipes-card-container">
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} baseUrl="/individualRecipe" />
                
                ))}

            </div>
            
        </div>
        
    )
};

export default BrowseRecipes;