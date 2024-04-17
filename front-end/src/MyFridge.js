import React, { useState, useEffect } from "react";
import "./MyFridge.css";
import IngredientCard from "./IngredientCard";
// import { useIngredientContext } from "./IngredientContext";
import axios from "axios";
import { Link } from "react-router-dom";

const MyFridge = () => {
  const jwtToken = localStorage.getItem("jwt");

  const [ingredients, setIngredients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("fetching data for ingredients");
    console.log(userId)
    axios
      .get(`http://localhost:3001/api/myFridge/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Send the JWT token in the authorization header
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setIngredients(response.data);
      })
      .catch((err) => {
        console.log(
          `The server rejected the request for this protected resource... we probably do not have a valid JWT token.`
        );
        setError(
          "you are not authorized to view this page please log in first"
        );
        setIsLoggedIn(false);
        // const backupData = [
        //   {
        //     id: 1,
        //     name: "Chicken",
        //     img: `https://picsum.photos/200?id=1`,
        //     expiry_date: "08/26/2024",
        //     quantity: 1,
        //     weight_or_volume: 2.5,
        //   },
        //   {
        //     id: 2,
        //     name: "Butter",
        //     img: `https://picsum.photos/200?id=2`,
        //     expiry_date: "05/18/2027",
        //     quantity: 1,
        //     weight_or_volume: 1.1,
        //   },
        //   {
        //     id: 3,
        //     name: "Tomatoes",
        //     img: `https://picsum.photos/200?id=3`,
        //     expiry_date: "04/10/2024",
        //     quantity: 4,
        //     weight_or_volume: 3.6,
        //   },
        // ];

        // setIngredients(backupData);
      });
  }, []);

  // const handleIngredientClick = (ingredient) => {
  //     getCurrIngredient(ingredient);
  // };

  return (
    <div className="ingredients-contianer">
      {isLoggedIn ? (
        <>
          <h1>My Fridge</h1>

          <div>
            <Link to="/addIngredient">
              <button className="nav-to-add-ingredient" type="submit">
                {" "}
                Add Ingredient
              </button>
            </Link>
          </div>

          <div className="ingredients-card-container">
            {ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                baseUrl="/IngredientDetails"
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <p className="notwork">You are not authorized to use this feature. Please <Link to="/">log in</Link> first</p>
        </div>
      )}
    </div>
  );
};

export default MyFridge;
