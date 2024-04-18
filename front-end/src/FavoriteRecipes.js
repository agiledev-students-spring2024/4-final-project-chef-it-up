import React, { useState, useEffect } from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import './FavoriteRecipes.css'
import Select from 'react-select'
import { Link } from "react-router-dom";
// import { useRecipeContext } from './RecipeContext';

const FavoriteRecipes = () =>{
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [cuisine, setCuisine] = useState("")

    const userId = localStorage.getItem("userId");

    const mealTypeLabel = ['breakfast', 'lunch', 'dinner', 'dessert'];
    const difficultyLevelLabel = ['Easy', 'Medium', 'Hard'];
    const num = 2

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
        console.log("fetching random data for 2 recipes")
        axios.get((`http://localhost:3001/api/favoriteRecipes/${userId}`)) //running low on free uses https://my.api.mockaroo.com/recipes.json?key=5f2d0960
            .then(response => {
                console.log("API response:", response.data);
                setRecipes(response.data)
            })
            .catch(err =>{
                console.log(`Error getting data`);
                console.error(err);

            })

    }, [])


    const filterByCuisine = async (cuisine) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/filterRecipes/cuisine/${cuisine}/${num}/${userId}`);
            setFilteredRecipes(response.data);

        }
        catch (error){
            console.error('Error filtering recipes by cuisine:', error);

        }
            
    }


    const filterByMealType = async (type) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/filterRecipes/mealtypes/${type}/${num}/${userId}`);
            setFilteredRecipes(response.data);
        } catch (error) {
            console.error('Error filtering recipes by meal type:', error);
        }
    };

    const filterByDifficultyLevel = async (level) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/filterRecipes/difficulty/${level}/${num}/${userId}`)
            setFilteredRecipes(response.data)
        }
        catch ( error){
            console.error("Error filtering recipes by difficulty level:", error);
        }
    }

    return (
        <div className="recipes-contianer">
            <Link className='link-back-browse' to='/browseRecipes' >
                <h3 className='navigate-back-browse'> &#x2190; Browse Recipes</h3>
            </Link>
            <h1>Favorite Recipes</h1>
            <div className="browse-recipe-filter">

                <h2>filter by cuisine</h2>
                <div className="search-container">
                
                    <div className="search-cuisine" >
                    
                         <Select className="dropdown-recipe" options={CuisineOptions} defaultValue={CuisineOptions[0]} onChange={e => setCuisine(e.value)}/>
                        <button className="search-button" onClick={() => filterByCuisine(cuisine)}>Search</button>
                    </div>
                </div>
                

                <div>
                   
                <h2>filter by meal type:</h2>
                <div>
                    {mealTypeLabel.map(type => (
                        <button className="filter-buttons"  key={type} onClick={() => filterByMealType(type)} >{type}</button>
                    ))}
                </div>
                <h2>filter by difficulty level:</h2>
                <div className="difficulty-nav">
                    {difficultyLevelLabel.map(level => (
                        <button className="filter-buttons" key={level}  onClick={() => filterByDifficultyLevel(level)} >{level}</button>
                    ))}
                </div>

                </div>
                
                
            </div>
   
        <div className="recipes-card-container">
            {(filteredRecipes.length > 0 ? filteredRecipes : recipes).map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} baseUrl="/favoriteRecipes"/>
            
            ))}

        </div>
    </div>
    )
};

export default FavoriteRecipes;