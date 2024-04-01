import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddIngredient.css";
import Select from "react-select";

const AddIngredient = () => {
  const [ingredientName, setIngredientName] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry_date, setExpiryDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    fetch("http://localhost:3001/api/addIngredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientName,
        image,
        quantity,
        expiry_date,
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/fridge");
          return response.json();
        } else if (response.status === 401) {
          throw new Error("Invalid ingredient");
        }
        console.log(`Received server response: ${response.data}`);
      })
      .catch((err) => {
        console.log(`Received server error: ${err}`);
        setError("Failed to add ingredient");
      });
  };

  // const handleSubmit = e => {
  //     e.preventDefault()

  //     axios
  //       .post("http://localhost:3001/api/addIngredient",{
  //         ingredient_name:ingredient_name,
  //         quantity:quantity,
  //         expiry_date:expiry_date,
  //       })
  //       .then(response => {
  //         console.log(`Received server response: ${response.data}`)
  //       })
  //       .catch(err => {
  //         console.log(`Received server error: ${err}`)
  //         setError(
  //           "This ain't working just yet, give us some time :)"
  //         )
  //       })
  //   }

  return (
    <form className="add-ingredient-form" onSubmit={handleSubmit}>
      <main className="App">
        <h1>Add Ingredient</h1>
        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientName"
            >
              Enter your ingredient name:
            </label>
          </div>

          <div>
            <input
              id="ingredientName"
              type="text"
              placeholder="Ingredient Name"
              onChange={(e) => setIngredientName(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientImage"
            >
              Upload image of ingredient:
            </label>
          </div>

          <div>
            <input
              id="ingredientImage"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientExpiryDate"
            >
              Enter expiry date
            </label>
          </div>

          <div>
            <input
              id="ingredientExpiryDate"
              type="date"
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="formField">
          <div>
            <label
              className="add-ingredient-form-field"
              htmlFor="ingredientQuantity"
            >
              Enter quantity
            </label>
          </div>

          <div>
            <input
              id="ingredientQuantity"
              type="number"
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <div>
            <p className="notwork">{error}</p>
            <Link to="/">Bypass due to error</Link>
          </div>
        )}

        <div className="btn-section">
          <div>
            <button className="submit-ingredient-button" type="submit">
              {" "}
              Add Ingredient
            </button>
          </div>
          <div>
            <button className="cancel-submit-ingredient">
              <Link to="/fridge" className="cancel-link">
                Cancel your changes
              </Link>
            </button>
          </div>
        </div>
      </main>
    </form>
  );
};

export default AddIngredient;
