import React, { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Select from 'react-select'
import './RecipeCard.css';
import './MyRecipes.css';
import RecipeCard from './RecipeCard';


// import { useRecipeContext } from './RecipeContext';


const MyRecipes= () =>{
    const jwtToken = localStorage.getItem("jwt")
    const userId = localStorage.getItem("userId");


    // const { getCurrRecipe } = useRecipeContext(); // gets the getrecip which is called the setSelectedRecipe
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [cuisine, setCuisine] = useState("")
    const mealTypeLabel = ['breakfast', 'lunch', 'dinner', 'dessert'];
    const difficultyLevelLabel = ['Easy', 'Medium', 'Hard'];
    const num = 3

    
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

    useEffect(() =>{
        
        axios.get("http://104.236.7.34:3001/api/myRecipes", {
            headers: {
                Authorization: `Bearer ${jwtToken}` // Send the JWT token in the authorization header
            }
            })
            .then(response => {
                console.log("my recipes:", response.data);
                setRecipes(response.data)
            })
            .catch(err =>{
                console.log("error getting my recipes")
                console.error(err)

            })
        

    }, [])

    const filterByCuisine = async (cuisine) => {
        try {
            const response = await axios.get(`http://104.236.7.34:3001/api/filterRecipes/cuisine/${cuisine}/${num}/${userId}`);
            setFilteredRecipes(response.data);

        }
        catch (error){
            console.error('Error filtering recipes by cuisine:', error);

        }
            
    }


    const filterByMealType = async (type) => {
        try {
            const response = await axios.get(`http://104.236.7.34:3001/api/filterRecipes/mealtypes/${type}/${num}/${userId}`);
            setFilteredRecipes(response.data);
        } catch (error) {
            console.error('Error filtering recipes by meal type:', error);
        }
    };

    const filterByDifficultyLevel = async (level) => {
        try {
            const response = await axios.get(`http://104.236.7.34:3001/api/filterRecipes/difficulty/${level}/${num}/${userId}`)
            setFilteredRecipes(response.data)
        }
        catch ( error){
            console.error("Error filtering recipes by difficulty level:", error);
        }
    }

    /*const handleRecipeClick = (recipe) => {
        getCurrRecipe(recipe);
    };
    */


    return ( 
        <div className="recipes-contianer">
            <Link className='link-back-browse' to='/browseRecipes' >
                <h3 className='navigate-back-browse'> &#x2190; Browse Recipes</h3>
            </Link>
            <h1>My Recipes</h1>
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
                        <button className="filter-buttons" key={level} onClick={() => filterByDifficultyLevel(level)} >{level}</button>
                    ))}
                </div>

                </div>
                
                
            </div>

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
                {(filteredRecipes.length > 0 ? filteredRecipes : recipes).map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe}  baseUrl="/myRecipes"/>
                
                ))}

            </div>      
        </div>
        
    )
};
    

export default MyRecipes;