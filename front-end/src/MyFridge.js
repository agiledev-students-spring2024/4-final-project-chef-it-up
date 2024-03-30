import React, { useState, useEffect }from "react";
import './MyFridge.css';
import IngredientCard from './IngredientCard';
// import { useIngredientContext } from "./IngredientContext";
import axios from 'axios';
import { Link } from 'react-router-dom'

const MyFridge = () =>{
    // const {getCurrIngredient} = useIngredientContext();
    const [ingredients, setIngredients] = useState([])

    useEffect(() =>{
        console.log("fetching data for ingredients")
        axios.get(('http://localhost:3001/api/myFridge')) 
            .then(response => {
                console.log("API response:", response.data);
                setIngredients(response.data)
            })
            .catch(err =>{
                console.log(`Something went wrong, couldn't retrieve ingredients.`)
                console.error(err)

                const backupData = [
                 {   
                    id: 1,
                    name: "Chicken",
                    img: `https://picsum.photos/200?id=1`,
                    expiry_date: "08/26/2024",
                    quantity: 1,
                    weight_or_volume: 2.5
                  },
                  {
                    id: 2,
                    name: "Butter",
                    img: `https://picsum.photos/200?id=2`,
                    expiry_date: "05/18/2027",
                    quantity: 1,
                    weight_or_volume: 1.1
                  },
                  {
                    id: 3,
                    name: "Tomatoes",
                    img: `https://picsum.photos/200?id=3`,
                    expiry_date: "04/10/2024",
                    quantity: 4,
                    weight_or_volume: 3.6
                  },
                
                ];

                setIngredients(backupData)
            })
    }, []);

    // const handleIngredientClick = (ingredient) => {
    //     getCurrIngredient(ingredient);
    // };

    return (
        <div className="ingredients-contianer">
            <h1>My Fridge</h1>

            <div>
                <Link to="/addIngredient">
                    <button className="nav-to-add-ingredient" type="submit"> Add Ingredient</button>
                </Link>
            </div>

            <div className="ingredients-card-container">
                {ingredients.map(ingredient => (<IngredientCard key={ingredient.id} ingredient={ingredient} baseUrl="/IngredientDetails" />))}
            </div>
        </div>
    )
};

export default MyFridge;