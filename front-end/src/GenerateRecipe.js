import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios"
import "./GenerateRecipe.css"

const GenerateRecipe = () =>{
    const [genRecipe, setGenRecipe] = useState([])
    const [criteria, setCriteria] = useState([])
    const [generated,setGenerated] = useState("")
    const handleSubmit = e => {
        // Placeholding until chatgpt functionality
        e.preventDefault()
        axios.get(`http://localhost:3001/api/generateRecipe`) //Whenever we decide to generate recipes, place url in the quotations
        .then(response => {
            console.log("API response: ", response.data)
            setGenRecipe(response.data)
            setGenerated("True")
        })
        .catch(err => {
            console.log("You've run out of available generated recipes for today. Please try again tomorrow")
            console.error(err)
            setGenerated("True")
            alert("You've run out of available generated recipes for today. Here is a sample instead")
        })
    }
    // Will need to discuss about this with team
    const recipeId = 100
    const handleSaveButtonClick = () => {
        // Placeholder for saving functionality
        axios.post(`http://localhost:3001/api/addToFavorite/${recipeId}`)
        .then(response => {
            console.log(" recipe has been added to favorites: ", response.data)

        })
        .catch( err =>{
            console.log(" error trying to add recipes to favorite: ", err)

        })
        alert(`You clicked the button to add the generated recipe to your favorite list.`);
    };

    useEffect(() => {
        console.log("useEffect is being called ")

      }, [])

    return (
        <>
            <form className="profile-form" onSubmit={handleSubmit}>
                <h1>Generate Recipes</h1>
                <div class='formField'>
                    <input
                    id="criteria"
                    type="text"
                    placeholder="Base Ingredients"
                    onChange={e => setCriteria(e.target.value)}
                    />
                </div>
                <p>Generate a Recipe</p>
                <button className="generate-recipe-button" type="submit">Generate</button>
            </form>
            {generated && (
                <div className="generated-recipe-container">
                    <h2>ChatGPT Generated Recipe</h2>
                    <p>{genRecipe.instructions}</p>
                    <button className="save-button" onClick={handleSaveButtonClick}>
                        Add to favorite Recipes
                    </button>
                </div>
            )}
            <form className="return-form">
                <Link className="return-form-link" to="/favoriteRecipes">Go to Favorite Recipes</Link>
            </form>
        </>
    )
};

export default GenerateRecipe;