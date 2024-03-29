import React, { useState, useEffect }from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import Select from 'react-select'
// import { useRecipeContext } from './RecipeContext';
import axios from 'axios';
import { Link } from "react-router-dom";

const BrowseRecipes = () =>{

    const mealTypeLabel = ['breakfast', 'lunch', 'dinner', 'dessert'];
    const difficultyLevelLabel = ['easy', 'medium', 'hard'];


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

                <h2>filter by cuisine</h2>
                <div className="search-container">
                
                    <form className="search-cuisine">
                    
                         <Select className="dropdown-recipe" options={CuisineOptions} defaultValue={CuisineOptions[0]} />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
                

                <div>
                   

                <div>
                    <h2>filter by meal type:</h2>
                    {mealTypeLabel.map(type => (
                        <button className="filter-buttons"  key={type} >{type}</button>
                    ))}
                </div>
                <div className="difficulty-nav">
                    <h2>filter by difficulty level:</h2>
                    {difficultyLevelLabel.map(level => (
                        <button className="filter-buttons" key={level} >{level}</button>
                    ))}
                </div>

                </div>
                
                
            </div>

           
            <div className="nav-recipes-buttons">
                    <Link to="/myRecipes">
                        <button className="nav-to-recipe" type="submit">To My Recipes &#8594;</button>
                    </Link>
                

                    <Link to="/favoriteRecipes">
                         <button className="nav-to-recipe" type="submit">To Favorite Recipes &#8594;</button>
            
                    </Link>

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