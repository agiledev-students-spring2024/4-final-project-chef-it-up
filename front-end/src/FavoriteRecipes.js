import React, { useState, useEffect } from "react";
import './BrowseRecipes.css';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import './FavoriteRecipes.css'
import { useRecipeContext } from './RecipeContext';

const FavoriteRecipes = () =>{
    const [recipes, setRecipes] = useState([])
    const [userData, setUserData] = useState([])
    const { getCurrRecipe } = useRecipeContext();
    
    useEffect(() =>{
        console.log("fetching random data for 10 recipes")
        axios.get(('https://my.api.mockaroo.com/recipes.json?key=5f2d0960')) //running low on free uses https://my.api.mockaroo.com/recipes.json?key=5f2d0960
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
                    ingredients: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                    instructions: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    prep_time: 64,
                    cook_time: 129,
                    total_time: 230,
                    cuisine: "Indian",
                    difficulty_level: "Hard"
                  },
                  {
                    id: 2,
                    recipe_name: "Mrs",
                    ingredients: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                    instructions: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
                    prep_time: 102,
                    cook_time: 172,
                    total_time: 89,
                    cuisine: "Mexican",
                    difficulty_level: "Hard"
                  },
                  {
                    id: 2,
                    recipe_name: "Mrs",
                    ingredients: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                    instructions: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
                    prep_time: 102,
                    cook_time: 172,
                    total_time: 89,
                    cuisine: "Mexican",
                    difficulty_level: "Hard"
                  },
                  
                  {
                    id: 2,
                    recipe_name: "Mrs",
                    ingredients: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
                    instructions: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
                    prep_time: 102,
                    cook_time: 172,
                    total_time: 89,
                    cuisine: "Mexican",
                    difficulty_level: "Hard"
                  }
                  
                
                ];

                setRecipes(backupData)

            })

    }, [])

    const handleRecipeClick = (recipe) => {
      getCurrRecipe(recipe);
    };



    return (
        <div className="recipes-contianer">
        <h1>Favorite Recipes</h1>
        <div className="recipes-card-container">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleRecipeClick(recipe)}  baseUrl="/favoriteRecipes"/>
            
            ))}

        </div>
    </div>
    )
};

export default FavoriteRecipes;