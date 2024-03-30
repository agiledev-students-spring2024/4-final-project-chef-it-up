import React, { useState, useEffect }from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import Select from 'react-select'
// import { useRecipeContext } from './RecipeContext';
import axios from 'axios';
import { Link } from "react-router-dom";

const BrowseRecipes = () =>{

    const mealTypeLabel = ['breakfast', 'lunch', 'dinner', 'dessert'];
    const difficultyLevelLabel = ['Easy', 'Medium', 'Hard'];


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

    const num = 1;
    

    // const { getCurrRecipe } = useRecipeContext(); // gets the getrecip which is called the setSelectedRecipe
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [cuisine, setCuisine] = useState("")
    

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

    const filterByCuisine = async (cuisine) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/filterRecipes/cuisine/${cuisine}/${num}`);
            setFilteredRecipes(response.data);

        }
        catch (error){
            console.error('Error filtering recipes by cuisine:', error);

        }
            
    }

    const filterByMealType = async (type) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/filterRecipes/mealtypes/${type}/${num}`);
            setFilteredRecipes(response.data);
        } catch (error) {
            console.error('Error filtering recipes by meal type:', error);
        }
    };

    const filterByDifficultyLevel = async (level) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/filterRecipes/difficulty/${level}/${num}`)
            setFilteredRecipes(response.data)
        }
        catch ( error){
            console.error("Error filtering recipes by difficulty level:", error);
        }
    }

   
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
                
                    <div className="search-cuisine" >  
                        <Select className="dropdown-recipe" options={CuisineOptions} defaultValue={CuisineOptions[0]} onChange={e => setCuisine(e.value)}/>
                        <button className="search-button" onClick={() => filterByCuisine(cuisine)}>Search</button>
                    </div>
                </div>
                

                <div>

                <div>
                    <h2>filter by meal type:</h2>
                    {mealTypeLabel.map(type => (
                        <button className="filter-buttons"  key={type} onClick={() => filterByMealType(type)} >{type}</button>
                    ))}
                </div>
                <div className="difficulty-nav">
                    <h2>filter by difficulty level:</h2>
                    {difficultyLevelLabel.map(level => (
                        <button className="filter-buttons" key={level}  onClick={() => filterByDifficultyLevel(level)} >{level}</button>
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
                {/** tenerary operator basically the first part is condisitonal if its strue then we render i teh filtered recipes else we just render in all recipes */}
                {(filteredRecipes.length > 0 ? filteredRecipes : recipes).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} baseUrl="/individualRecipe" />
                
                ))}

            </div>
            
        </div>
        
    )
};

export default BrowseRecipes;