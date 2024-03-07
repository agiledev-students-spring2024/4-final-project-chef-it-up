import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios"
import "./GenerateRecipe.css"

const GenerateRecipe = () =>{
    const [genRecipe, setGenRecipe] = useState(["Get a piece of bread, grill it on a pan, put some butter on it, you've got butter toast. The coloring is based on preference. I suggest cooking until black."])
    const [criteria, setCriteria] = useState([])
    const [generated,setGenerated] = useState("")
    const handleSubmit = e => {
        // Placeholding until chatgpt functionality
        e.preventDefault()
        axios.get('') //Whenever we decide to generate recipes, place url in the quotations
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

    const handleSaveButtonClick = () => {
        // Placeholder for saving functionality
        alert(`You clicked the button to add the generated recipe to your favorite list.`);
    };

    useEffect(() => {
        console.log("using chatgpt to generate a random recipe")

            
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
                    <p>{genRecipe}</p>
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