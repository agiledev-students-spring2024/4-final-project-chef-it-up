import React, { useState, useEffect }from "react";
import './MyFridge.css';
import IngredientCard from './IngredientCard';
import axios from 'axios';
import { Link } from 'react-router-dom'

const MyFridge = () =>{

    const [ingredients, setIngredients] = useState([])
    console.log(Object.getPrototypeOf(ingredients) === Array.prototype);

    useEffect(() =>{
        console.log("fetching random data for 20 ingredients")
        axios.get(('')) // https://my.api.mockaroo.com/my-ingredients.json?key=e23e5640
            .then(response => {
                
                setIngredients(response.data)
            })
            .catch(err =>{
                console.log(`Sorry. No more requests allowed today!`)
                console.error(err)

                const backupData = [
                 {   
                    id: 1,
                    name: "Chicken",
                    expiry_date: "08/26/2024",
                    quantity: 1,
                    weight_or_volume: 2.5
                  },
                  {
                    id: 2,
                    name: "Butter",
                    expiry_date: "05/18/2027",
                    quantity: 1,
                    weight_or_volume: 1.1
                  },
                  {
                    id: 3,
                    name: "Tomatoes",
                    expiry_date: "04/10/2024",
                    quantity: 4,
                    weight_or_volume: 3.6
                  },
                
                ];

                setIngredients(backupData)
            })
    }, []);

    return (
        <div className="ingredients-contianer">
            <h1>My Fridge</h1>

            <div>
                <Link to="/addIngredient">
                    <button className="nav-to-add-ingredient" type="submit"> Add Ingredient</button>
                </Link>
            </div>

            <div className="ingredients-card-container">
                {ingredients.map(ingredient => <IngredientCard key={ingredient.id} ingredient={ingredient} />)}
            </div>
        </div>
    )
};

export default MyFridge;